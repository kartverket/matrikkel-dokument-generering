import type { ArealFordeling } from "../schema/reports/bygg/shared/arealFordeling.schema.ts"

export function arealLinje(a: ArealFordeling): string {
  return `${a.bolig} / ${a.annet} / ${a.totalt} m²`
}
