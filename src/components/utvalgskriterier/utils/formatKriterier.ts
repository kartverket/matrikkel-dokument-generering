import type { TFunction } from "i18next"
import type { ByggUtvalgskriterier } from "../../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt } from "./erAngitt.ts"

type Maybe<T> = T | null | undefined

type Kriterier = NonNullable<ByggUtvalgskriterier>
type AdresseKriterier = NonNullable<Kriterier["adresse"]>
type MatrikkelenhetKriterier = NonNullable<Kriterier["matrikkelenhet"]>
type SokevinduKriterier = NonNullable<Kriterier["sokevindu"]>

type MatrikkelLabels = {
  gnr: string
  bnr: string
  fnr: string
  snr: string
}

export type KriterieVerdi =
  | boolean
  | string
  | number
  | string[]
  | null
  | undefined

export function leggTilHvisSann(
  list: string[],
  condition: boolean | null | undefined,
  value: string,
) {
  if (condition) list.push(value)
}

export function formatPeriode(
  fra: string | undefined,
  til: string | undefined,
): string | undefined {
  if (fra && til) return `${fra} - ${til}`
  if (fra) return fra
  return til
}

export function formatKoordinat(
  kriterie: number | null | undefined,
): string | undefined {
  return typeof kriterie === "number" ? kriterie.toString() : undefined
}

export function formatMatrikkelnummer(
  matrikkel: Maybe<MatrikkelenhetKriterier>,
  labels: MatrikkelLabels,
): string | undefined {
  if (!matrikkel) return undefined

  const deler: string[] = []
  if (typeof matrikkel.gnr === "number")
    deler.push(`${labels.gnr} ${matrikkel.gnr}`)
  if (typeof matrikkel.bnr === "number")
    deler.push(`${labels.bnr} ${matrikkel.bnr}`)
  if (typeof matrikkel.fnr === "number")
    deler.push(`${labels.fnr} ${matrikkel.fnr}`)
  if (typeof matrikkel.snr === "number")
    deler.push(`${labels.snr} ${matrikkel.snr}`)

  return deler.length > 0 ? deler.join(", ") : undefined
}

export function formatAdresse(
  adresse: Maybe<AdresseKriterier>,
): string | undefined {
  if (!adresse) return undefined

  const nummer =
    typeof adresse.adresseNr === "number"
      ? `${adresse.adresseNr}${adresse.adresseBokstav ?? ""}`
      : ""

  const navnOgNummer = [adresse.adresseNavn, nummer].filter(Boolean).join(" ")
  const deler = [
    navnOgNummer,
    adresse.bruksenhetsNr,
    adresse.adresseTilleggsNavn,
  ].filter(Boolean)

  return deler.length > 0 ? deler.join(", ") : undefined
}

export function formatSokevindu(
  sokevindu: Maybe<SokevinduKriterier>,
): string | undefined {
  const nord = formatKoordinat(sokevindu?.nord)
  const ost = formatKoordinat(sokevindu?.ost)
  const vest = formatKoordinat(sokevindu?.vest)
  const syd = formatKoordinat(sokevindu?.syd)

  if (!nord && !ost && !vest && !syd) return undefined

  return `[${vest ?? "-"}, ${syd ?? "-"}] - [${ost ?? "-"}, ${nord ?? "-"}]`
}

export function formatKriterieVerdi(
  value: KriterieVerdi,
  t: TFunction,
): string | number | undefined {
  if (!erAngitt(value)) return undefined

  if (typeof value === "boolean") {
    return value ? t("ja") : t("nei")
  }

  if (Array.isArray(value)) {
    return value.join(", ")
  }

  return value
}
