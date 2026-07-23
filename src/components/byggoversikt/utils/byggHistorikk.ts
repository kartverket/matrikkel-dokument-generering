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
  berorteEtasjer: BerortEtasje[]
  berorteBruksenheter: string[]
  erForsteVedtak: boolean
}

function finnNyesteRegistrerteDato(endring: Endring): string | undefined {
  return Object.values(endring.byggDatoEndring ?? {})
    .filter((dato): dato is string => dato !== undefined)
    .toSorted()
    .at(-1)
}

function finnDifferanse(
  naVerdi: number | undefined,
  forrigeVerdi: number | undefined,
): number | undefined {
  if (naVerdi === undefined || forrigeVerdi === undefined) return undefined

  const differanse = naVerdi - forrigeVerdi
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
  const na = endring.byggArealEndring?.bruksarealBolig
  const forrige = forrigeEndring.byggArealEndring?.bruksarealBolig

  for (const [type, felt] of [
    ["bolig", "boligAreal"],
    ["annet", "annetAreal"],
  ] as const) {
    const differanse = finnDifferanse(na?.[felt], forrige?.[felt])
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
    const differanse = finnDifferanse(na?.totaltAreal, forrige?.totaltAreal)
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
  na: NonNullable<Endring["etasjePlan"]>[number],
  forrige: NonNullable<Endring["etasjePlan"]>[number],
): boolean {
  if (na === undefined || forrige === undefined) return na === forrige

  return (
    na.etasjeplanKode === forrige.etasjeplanKode &&
    na.antallBoenheter === forrige.antallBoenheter &&
    na.bruksareal.boligAreal === forrige.bruksareal.boligAreal &&
    na.bruksareal.annetAreal === forrige.bruksareal.annetAreal &&
    na.bruksareal.totaltAreal === forrige.bruksareal.totaltAreal &&
    na.bruttoareal.boligAreal === forrige.bruttoareal.boligAreal &&
    na.bruttoareal.annetAreal === forrige.bruttoareal.annetAreal &&
    na.bruttoareal.totaltAreal === forrige.bruttoareal.totaltAreal
  )
}

function finnBerorteEtasjer(
  endring: Endring,
  forrigeEndring: Endring | undefined,
): BerortEtasje[] {
  if (forrigeEndring === undefined) return []

  const naPerEtasje = new Map(
    (endring.etasjePlan ?? []).flatMap((etasje) =>
      etasje === undefined ? [] : [[etasje.etasje, etasje] as const],
    ),
  )
  const forrigePerEtasje = new Map(
    (forrigeEndring.etasjePlan ?? []).flatMap((etasje) =>
      etasje === undefined ? [] : [[etasje.etasje, etasje] as const],
    ),
  )

  return [...new Set([...naPerEtasje.keys(), ...forrigePerEtasje.keys()])]
    .flatMap((etasje) => {
      const na = naPerEtasje.get(etasje)
      const forrige = forrigePerEtasje.get(etasje)
      if (erSammeEtasje(na, forrige)) return []

      const berort = na ?? forrige
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

function finnBerorteBruksenheter(endring: Endring): string[] {
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
    rad.berorteEtasjer.length > 0 ||
    rad.berorteBruksenheter.length > 0
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
      berorteEtasjer: finnBerorteEtasjer(endring, forrigeEndring),
      berorteBruksenheter: finnBerorteBruksenheter(endring),
      erForsteVedtak: forrigeEndring === undefined,
    }
  })

  return historikkRader
    .filter(harViktigInnhold)
    .toSorted((a, b) => b.lopeNr - a.lopeNr)
}
