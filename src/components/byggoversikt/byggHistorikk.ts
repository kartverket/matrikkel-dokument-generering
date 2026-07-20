import type { TFunction } from "i18next"
import type { Bygningsendring } from "../../lib/schema/reports/bygg/bygg0011/index"

const GODKJENNINGSSTATUSER = new Set(["RA", "IG"])

type HistorikkTranslationKey = "rapport.BYG0011.byggoversikt.historikk"

function finnPrimaerDato({ datoer, bygningsstatus }: Bygningsendring) {
  switch (bygningsstatus.kortkode) {
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
  endringer: Bygningsendring[],
) {
  return endringer
    .map((endring) => ({ endring, dato: finnPrimaerDato(endring) }))
    .toSorted((a, b) => {
      if (a.dato && b.dato) return a.dato.localeCompare(b.dato)
      if (a.dato) return 1
      if (b.dato) return -1
      return a.endring.lopenr - b.endring.lopenr
    })
}

function finnArealverb(
  statuskode: string,
  differanse: number,
): "lagtTil" | "fjernet" | "godkjent" {
  if (GODKJENNINGSSTATUSER.has(statuskode)) return "godkjent"
  return differanse >= 0 ? "lagtTil" : "fjernet"
}

export function lagHistorikkbeskrivelseForBygningsendring(
  t: TFunction,
  translationKey: HistorikkTranslationKey,
  endring: Bygningsendring,
  forrigeEndring: Bygningsendring | undefined,
): string | null {
  if (endring.beskrivelse) return endring.beskrivelse

  if (forrigeEndring === undefined) return t(`${translationKey}.foersteVedtak`)

  const statuskode = endring.bygningsstatus.kortkode
  const beskrivelser: string[] = []

  for (const arealtype of ["bolig", "annet"] as const) {
    const differanse =
      endring.bruksareal[arealtype] - forrigeEndring.bruksareal[arealtype]
    if (differanse === 0) continue

    beskrivelser.push(
      t(`${translationKey}.areal.${finnArealverb(statuskode, differanse)}`, {
        areal: Math.abs(differanse),
        type: t(`${translationKey}.typer.${arealtype}`),
      }),
    )
  }

  return beskrivelser.length > 0 ? beskrivelser.join(" ") : null
}
