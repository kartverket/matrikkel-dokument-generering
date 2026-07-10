import { SEFRAK_KATEGORI } from "../constants"
import type { Bygningsendring } from "../schema/byggRapportSchema"

export function getKulturMinner(endring: Bygningsendring): string {
  const harSefrak = endring.kulturminner.some(
    (k) => k.kategori === SEFRAK_KATEGORI,
  )
  const harEnkelt = endring.kulturminner.some(
    (k) => k.kategori !== SEFRAK_KATEGORI,
  )
  return `${harSefrak ? "Ja" : "Nei"} / ${harEnkelt ? "Ja" : "Nei"}`
}
