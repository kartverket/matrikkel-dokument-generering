import type { TFunction } from "i18next"
import type { Bygningsendring } from "../schema/byggRapportSchema"

const APPROVAL_STATUSES = new Set(["RA", "IG"])

function verbKey(
  statusCode: string,
  delta: number,
): "lagtTil" | "fjernet" | "godkjent" {
  if (APPROVAL_STATUSES.has(statusCode)) return "godkjent"
  return delta >= 0 ? "lagtTil" : "fjernet"
}

export function describeChange(
  t: TFunction,
  change: Bygningsendring,
  previous: Bygningsendring | undefined,
): string | null {
  if (change.beskrivelse) return change.beskrivelse

  const base = "rapport.BYG0011.byggoversikt.historikk"

  if (previous === undefined) return t(`${base}.foersteVedtak`)

  const statusCode = change.bygningsstatus.kortkode
  const parts: string[] = []

  for (const field of ["bolig", "annet"] as const) {
    const delta = change.bruksareal[field] - previous.bruksareal[field]
    if (delta === 0) continue
    parts.push(
      t(`${base}.areal.${verbKey(statusCode, delta)}`, {
        areal: Math.abs(delta),
        type: t(`${base}.typer.${field}`),
      }),
    )
  }

  return parts.length > 0 ? parts.join(" ") : null
}