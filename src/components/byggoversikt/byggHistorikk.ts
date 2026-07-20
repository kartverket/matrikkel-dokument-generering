import type { TFunction } from "i18next"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"

const GODKJENNINGSSTATUSER = new Set(["RA", "IG"])

type HistorikkTranslationKey = "rapport.BYG0011.byggoversikt.historikk"

function finnPrimaerDato({ datoer, bygningsStatus }: BygningsEndring) {
  switch (bygningsStatus) {
    case "FA":
      return datoer.ferdigattest
    case "MB":
      return datoer.midlertidigBrukstillatelse
    case "IG":
      return datoer.igangsettingstillatelse
    case "RA":
      return datoer.rammetillatelse
    case "TB":
      return datoer.tattIBruk
    case "BR":
      return datoer.utgaattRevet
    default:
      return null
  }
}

export function sorterBygningsendringerKronologisk(
  endringer: BygningsEndring[],
) {
  return endringer
    .map((endring) => ({ endring, dato: finnPrimaerDato(endring) }))
    .toSorted((a, b) => {
      if (a.dato && b.dato) return a.dato.localeCompare(b.dato)
      if (a.dato) return 1
      if (b.dato) return -1
      return (a.endring?.lopenr ?? 0) - (b.endring?.lopenr ?? 0)
    })
}

function finnArealverb(
  statusKode: string,
  differanse: number,
): "lagtTil" | "fjernet" | "godkjent" {
  if (GODKJENNINGSSTATUSER.has(statusKode)) return "godkjent"
  return differanse >= 0 ? "lagtTil" : "fjernet"
}

export function lagHistorikkbeskrivelseForBygningsendring(
  t: TFunction,
  translationKey: HistorikkTranslationKey,
  endring: BygningsEndring,
  forrigeEndring: BygningsEndring | undefined,
): string | null {
  if (forrigeEndring === undefined) return t(`${translationKey}.foersteVedtak`)

  const beskrivelser: string[] = []

  for (const arealtype of ["bolig", "annet", "totalt"] as const) {
    const areal = endring.et?.[arealtype]
    const forrigeAreal = forrigeEndring.bruksareal?.[arealtype]
    if (areal === null || forrigeAreal === null) continue

    const differanse = (areal ?? 0) - (forrigeAreal ?? 0)
    if (differanse === 0) continue

    beskrivelser.push(
      t(
        `${translationKey}.areal.${finnArealverb(endring.endringsKode, differanse)}`,
        {
          areal: Math.abs(differanse),
          type: t(`${translationKey}.typer.${arealtype}`),
        },
      ),
    )
  }

  return beskrivelser.length > 0 ? beskrivelser.join(" ") : null
}
