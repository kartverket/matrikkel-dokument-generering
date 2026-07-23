import type { BygningsEndring } from "../../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { BygningsStatusKode } from "../../../lib/schema/reports/bygg/koder/byggningsStatusKode.schema.ts"
import type { EndringsKode } from "../../../lib/schema/reports/bygg/koder/endringsKode.schema.ts"
import type { EtasjeplanKode } from "../../../lib/schema/reports/bygg/koder/etasjeplanKode.schema.ts"

type Endring = NonNullable<BygningsEndring>

type Arealhandling = "lagtTil" | "fjernet" | "godkjent"

type HistorikkArealendring = {
  type: "bolig" | "annet" | "totalt"
  areal: number // Arealendringen oppgitt i kvadratmeter, kan være enten positiv eller negativ
  handling: Arealhandling
}

type BerortEtasje = {
  etasje: number
  etasjeplanKode: EtasjeplanKode
}

// Et sammendrag av de viktigste endringene som har skjedd et bygg, og hvilke etasjer og bruksenheter som er berørt av endringen.
export type ByggHistorikk = {
  lopeNr: number
  byggEndringsKode?: EndringsKode
  byggStatusKode?: BygningsStatusKode
  dato?: string
  totalBruksArealEndring?: number
  totalBruttoArealEndring?: number
  arealEndringer: HistorikkArealendring[]
  beroerteEtasjer: BerortEtasje[]
  beroerteBruksenheter: string[]
  erFoersteVedtak: boolean
}

function finnNyesteRegistrerteDato(endring: Endring): string | undefined {
  return Object.values(endring.byggDatoEndring ?? {})
    .filter((dato): dato is string => dato !== undefined)
    .toSorted()
    .at(-1)
}

function finnDifferanse(
  naa: number | undefined,
  foer: number | undefined,
): number | undefined {
  if (naa === undefined || foer === undefined) return undefined

  const differanse = naa - foer
  const avrundetDifferanse =
    Math.round((Math.abs(differanse) + Number.EPSILON) * 100) / 100

  return Math.sign(differanse) * avrundetDifferanse
}

function finnArealhandling(
  statusKode: BygningsStatusKode | undefined,
  differanse: number,
): Arealhandling {
  if (statusKode === "RA") return "godkjent"

  return differanse >= 0 ? "lagtTil" : "fjernet"
}

function lagArealEndringer(
  endring: Endring,
  forrigeEndring: Endring | undefined,
): HistorikkArealendring[] {
  if (forrigeEndring === undefined) return []

  const arealEndringer: HistorikkArealendring[] = []
  const naa = endring.byggArealEndring?.bruksarealBolig
  const foer = forrigeEndring.byggArealEndring?.bruksarealBolig

  for (const [type, felt] of [
    ["bolig", "boligAreal"],
    ["annet", "annetAreal"],
  ] as const) {
    const differanse = finnDifferanse(naa?.[felt], foer?.[felt])
    if (differanse === undefined || differanse === 0) continue

    arealEndringer.push({
      type,
      areal: Math.abs(differanse),
      handling: finnArealhandling(
        endring.byggMetaEndring?.bygningsStatusKode,
        differanse,
      ),
    })
  }

  // Totalen brukes kun som reserve når bolig/annet ikke kan gi en forklaring.
  // Ellers ville samme arealendring blitt vist både som type og som total.
  if (arealEndringer.length === 0) {
    const differanse = finnDifferanse(naa?.totaltAreal, foer?.totaltAreal)
    if (differanse !== undefined && differanse !== 0) {
      arealEndringer.push({
        type: "totalt",
        areal: Math.abs(differanse),
        handling: finnArealhandling(
          endring.byggMetaEndring?.bygningsStatusKode,
          differanse,
        ),
      })
    }
  }

  return arealEndringer
}

function erSammeEtasje(
  naa: NonNullable<Endring["etasjePlan"]>[number],
  foer: NonNullable<Endring["etasjePlan"]>[number],
): boolean {
  if (naa === undefined || foer === undefined) return naa === foer

  return (
    naa.etasjeplanKode === foer.etasjeplanKode &&
    naa.antallBoenheter === foer.antallBoenheter &&
    naa.bruksareal.boligAreal === foer.bruksareal.boligAreal &&
    naa.bruksareal.annetAreal === foer.bruksareal.annetAreal &&
    naa.bruksareal.totaltAreal === foer.bruksareal.totaltAreal &&
    naa.bruttoareal.boligAreal === foer.bruttoareal.boligAreal &&
    naa.bruttoareal.annetAreal === foer.bruttoareal.annetAreal &&
    naa.bruttoareal.totaltAreal === foer.bruttoareal.totaltAreal
  )
}

function finnBeroerteEtasjer(
  endring: Endring,
  forrigeEndring: Endring | undefined,
): BerortEtasje[] {
  if (forrigeEndring === undefined) return []

  const naaPerEtasje = new Map(
    (endring.etasjePlan ?? []).flatMap((etasje) =>
      etasje === undefined ? [] : [[etasje.etasje, etasje] as const],
    ),
  )
  const foerPerEtasje = new Map(
    (forrigeEndring.etasjePlan ?? []).flatMap((etasje) =>
      etasje === undefined ? [] : [[etasje.etasje, etasje] as const],
    ),
  )

  return [...new Set([...naaPerEtasje.keys(), ...foerPerEtasje.keys()])]
    .flatMap((etasje) => {
      const naa = naaPerEtasje.get(etasje)
      const foer = foerPerEtasje.get(etasje)
      if (erSammeEtasje(naa, foer)) return []

      const berort = naa ?? foer
      return berort === undefined
        ? []
        : [
            {
              etasje: berort.etasje,
              etasjeplanKode: berort.etasjeplanKode,
            },
          ]
    })
    .toSorted((a, b) => a.etasje - b.etasje)
}

function finnBeroerteBruksenheter(endring: Endring): string[] {
  return [
    ...new Set(
      (endring.bruksenheter ?? []).flatMap((bruksenhet) =>
        bruksenhet?.bruksenhetsNr === undefined
          ? []
          : [bruksenhet.bruksenhetsNr],
      ),
    ),
  ].toSorted()
}

function harViktigInnhold(rad: ByggHistorikk): boolean {
  return (
    rad.dato !== undefined ||
    rad.byggEndringsKode !== undefined ||
    rad.byggStatusKode !== undefined ||
    rad.arealEndringer.length > 0 ||
    rad.beroerteEtasjer.length > 0 ||
    rad.beroerteBruksenheter.length > 0
  )
}

export function byggHistorikk(
  byggEndringer: BygningsEndring[],
): ByggHistorikk[] {
  const endringer = byggEndringer
    .filter((endring): endring is Endring => endring !== undefined)
    .toSorted((a, b) => a.lopeNr - b.lopeNr)

  const historikkRader = endringer.map((endring, index): ByggHistorikk => {
    const forrigeEndring = endringer[index - 1]
    const bruksareal = endring.byggArealEndring?.bruksarealBolig
    const forrigeBruksareal = forrigeEndring?.byggArealEndring?.bruksarealBolig
    const bruttoareal = endring.byggArealEndring?.bruttoarealBolig
    const forrigeBruttoareal =
      forrigeEndring?.byggArealEndring?.bruttoarealBolig

    return {
      lopeNr: endring.lopeNr,
      byggEndringsKode: endring.byggMetaEndring?.endringsKode,
      byggStatusKode: endring.byggMetaEndring?.bygningsStatusKode,
      dato: finnNyesteRegistrerteDato(endring),
      totalBruksArealEndring: finnDifferanse(
        bruksareal?.totaltAreal,
        forrigeBruksareal?.totaltAreal,
      ),
      totalBruttoArealEndring: finnDifferanse(
        bruttoareal?.totaltAreal,
        forrigeBruttoareal?.totaltAreal,
      ),
      arealEndringer: lagArealEndringer(endring, forrigeEndring),
      beroerteEtasjer: finnBeroerteEtasjer(endring, forrigeEndring),
      beroerteBruksenheter: finnBeroerteBruksenheter(endring),
      erFoersteVedtak: forrigeEndring === undefined,
    }
  })

  return historikkRader
    .filter(harViktigInnhold)
    .toSorted((a, b) => b.lopeNr - a.lopeNr)
}
