import type { BygningsEndring } from "../../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"

type GjeldendeBygg = BygningsEndring & {}

// Et gjeldende bygg vil si summen av basisregistreringen og ferdigstilte/tatte-i-bruk endringer
export function aggregerGjeldendeTilstand(
  endringer: BygningsEndring[],
): BygningsEndring {
  // TODO: denne funksjonen returner kun basisregistreringen
  const nyesteFoerst = endringer.toSorted(
    (a, b) => (b?.lopeNr ?? 0) - (a?.lopeNr ?? 0),
  )
  return (
    nyesteFoerst.find(
      (endring) =>
        endring?.byggDatoEndring?.ferdigattest &&
        endring?.byggDatoEndring?.tattIBruk,
    ) ?? nyesteFoerst[0]
  )
}
