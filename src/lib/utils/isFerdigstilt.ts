import type { BygningsEndring } from "../schema/reports/bygg/byg0011/byggEndring.schema.ts"

export function isFerdigstilt(endring: BygningsEndring): boolean {
  return Boolean(
    endring?.byggDatoEndring?.ferdigattest &&
      endring?.byggDatoEndring?.tattIBruk,
  )
}

// Et gjeldende bygg vil si summen av basisregistreringen og ferdigstilte/tatte-i-bruk endringer
export function finnGjeldendeBygningsendring(
  endringer: BygningsEndring[],
): BygningsEndring {
  // TODO: denne funksjonen returner kun basisregistreringen
  const nyesteFoerst = endringer.toSorted(
    (a, b) => (b?.lopeNr ?? 0) - (a?.lopeNr ?? 0),
  )
  return nyesteFoerst.find(isFerdigstilt) ?? nyesteFoerst[0]
}
