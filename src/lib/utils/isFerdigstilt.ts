import type { BygningsEndring } from "../schema/reports/bygg/byg0011/bygningsEndring.schema"

export function isFerdigstilt(endring: BygningsEndring): boolean {
  return endring.datoer.ferdigattest != null || endring.datoer.tattIBruk != null
}

export function finnGjeldendeBygningsendring(
  endringer: BygningsEndring[],
): BygningsEndring {
  const nyesteFoerst = endringer.toSorted((a, b) => b.lopenr - a.lopenr)
  return nyesteFoerst.find(isFerdigstilt) ?? nyesteFoerst[0]
}
