import type { Bygningsendring } from "../schema/byggRapportSchema"

export function utgattKode(endring: Bygningsendring): string {
  return endring.bygningsstatus.bestaaende
    ? "-"
    : endring.bygningsstatus.kortkode
}
