import type { ArealFordeling } from "../schema/reports/bygg/shared/arealFordeling.schema.ts"

export function formatArea(value: number | undefined): string | null {
  return value ? `${value} m²` : null
}

export function arealLinje(a: ArealFordeling): string {
  return `${a.boligAreal} / ${a.annetAreal} / ${a.totaltAreal} m²`
}
