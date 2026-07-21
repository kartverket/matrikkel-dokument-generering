import type { TFunction } from "i18next"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"

type Endring = NonNullable<BygningsEndring>

type HistorikkTranslationKey = "rapport.BYG0011.byggoversikt.historikk"

// Milepælene i et byggesaksforløp, sist oppnådde først
const MILEPAELER = [
  "utgaattRevet",
  "tattIBruk",
  "ferdigattest",
  "midlertidigBrukstillatelse",
  "igangsettingstillatelse",
  "rammetillatelse",
] as const

export type Milepael = (typeof MILEPAELER)[number]

export function finnSisteMilepael(endring: Endring): Milepael | undefined {
  const datoer = endring.byggDatoEndring
  if (datoer === undefined) return undefined
  return MILEPAELER.find((milepael) => datoer[milepael] !== undefined)
}

function finnPrimaerDato(endring: Endring): string | undefined {
  const milepael = finnSisteMilepael(endring)
  if (milepael === undefined) return undefined
  return endring.byggDatoEndring?.[milepael]
}

export function sorterBygningsendringerKronologisk(endringer: Endring[]) {
  return endringer
    .map((endring) => ({ endring, dato: finnPrimaerDato(endring) }))
    .toSorted((a, b) => {
      if (a.dato && b.dato) return a.dato.localeCompare(b.dato)
      if (a.dato) return 1
      if (b.dato) return -1
      return a.endring.lopeNr - b.endring.lopeNr
    })
}

// En endring som kun har fått tillatelser er godkjent, men ikke gjennomført
function erKunGodkjent(endring: Endring): boolean {
  const milepael = finnSisteMilepael(endring)
  return (
    milepael === "rammetillatelse" || milepael === "igangsettingstillatelse"
  )
}

function finnArealverb(
  endring: Endring,
  differanse: number,
): "lagtTil" | "fjernet" | "godkjent" {
  if (erKunGodkjent(endring)) return "godkjent"
  return differanse >= 0 ? "lagtTil" : "fjernet"
}

const AREALTYPER = [
  ["bolig", "boligAreal"],
  ["annet", "annetAreal"],
  ["totalt", "totaltAreal"],
] as const

export function lagHistorikkbeskrivelseForBygningsendring(
  t: TFunction,
  translationKey: HistorikkTranslationKey,
  endring: Endring,
  forrigeEndring: Endring | undefined,
): string | null {
  if (forrigeEndring === undefined) return t(`${translationKey}.foersteVedtak`)

  const beskrivelser: string[] = []

  for (const [arealtype, arealfelt] of AREALTYPER) {
    const areal = endring.byggArealEndring?.bruksarealBolig[arealfelt]
    const forrigeAreal =
      forrigeEndring.byggArealEndring?.bruksarealBolig[arealfelt]
    if (areal === undefined || forrigeAreal === undefined) continue

    const differanse = areal - forrigeAreal
    if (differanse === 0) continue

    beskrivelser.push(
      t(`${translationKey}.areal.${finnArealverb(endring, differanse)}`, {
        areal: Math.abs(differanse),
        type: t(`${translationKey}.typer.${arealtype}`),
      }),
    )
  }

  return beskrivelser.length > 0 ? beskrivelser.join(" ") : null
}
