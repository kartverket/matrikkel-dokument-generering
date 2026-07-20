import type { BygningsEndring } from "../schema/reports/bygg/byg0011/byggEndring.schema.ts"

export function isFerdigstilt(endring: BygningsEndring): boolean {
  return endring.datoer.ferdigattest != null || endring.datoer.tattIBruk != null
}

export function finnGjeldendeBygningsendring(
  endringer: BygningsEndring[],
): BygningsEndring {
  const nyesteFoerst = endringer.toSorted(
    (a, b) => (b.lopenr ?? 0) - (a.lopenr ?? 0),
  )
  return nyesteFoerst.find(isFerdigstilt) ?? nyesteFoerst[0]
}
