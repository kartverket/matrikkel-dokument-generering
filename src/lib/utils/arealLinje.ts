import type { ArealFordeling } from "../schema/reports/bygg/byg0011/arealFordeling.schema"

export function arealLinje(a: ArealFordeling): string {
  return `${a.bolig} / ${a.annet} / ${a.totalt} m²`
}
