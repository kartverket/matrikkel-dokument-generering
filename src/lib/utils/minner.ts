import { SEFRAK_KATEGORI } from "../constants"
import type { Bygningsendring } from "../schema/byggRapportSchema"
import { jaNei } from "./jaNei"

export function minner(endring: Bygningsendring): string {
  const harSefrak = endring.kulturminner.some(
    (k) => k.kategori === SEFRAK_KATEGORI,
  )
  const harEnkelt = endring.kulturminner.some(
    (k) => k.kategori !== SEFRAK_KATEGORI,
  )
  return `${jaNei(harSefrak)} / ${jaNei(harEnkelt)}`
}
