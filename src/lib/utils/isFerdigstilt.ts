import type { Bygningsendring } from "../schema/reports/bygg/byg0011/bygningsendring.schema"

export function isFerdigstilt(endring: Bygningsendring): boolean {
  return endring.datoer.ferdigattest != null || endring.datoer.tattIBruk != null
}

export function finnGjeldendeBygningsendring(
  endringer: Bygningsendring[],
): Bygningsendring {
  const nyesteFoerst = endringer.toSorted((a, b) => b.lopenr - a.lopenr)
  return nyesteFoerst.find(isFerdigstilt) ?? nyesteFoerst[0]
}
