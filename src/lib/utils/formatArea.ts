import type { ArealFordeling } from "../schema/reports/bygg/shared/arealFordeling.schema.ts"

export function formatArea(value: number | undefined): string | null {
  return value ? `${value} m²` : null
}

export function arealLinje(a: ArealFordeling | undefined): string | null {
  if (a === undefined) return null
  const verdier = [a.boligAreal, a.annetAreal, a.totaltAreal]
  if (verdier.every((verdi) => verdi === undefined)) return null
  return `${verdier.map((verdi) => verdi ?? "–").join(" / ")} m²`
}
