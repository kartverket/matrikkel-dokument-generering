import type { Bygningsendring } from "../schema/byggRapportSchema"

export function isFerdigstilt(endring: Bygningsendring): boolean {
  return (
    endring.datoer.ferdigattest !== null || endring.datoer.tattIBruk !== null
  )
}
