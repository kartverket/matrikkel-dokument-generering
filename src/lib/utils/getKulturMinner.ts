import { SEFRAK_KATEGORI } from "../constants"
import type { Bygningsendring } from "../schema/byggRapportSchema"

export function getKulturMinner(endring: Bygningsendring): string {
  const hasKulturMinnerSefrak = endring.kulturminner.some(
    (k) => k.kategori === SEFRAK_KATEGORI,
  )
  const hasKulturMinnerEnkelt = endring.kulturminner.some(
    (k) => k.kategori !== SEFRAK_KATEGORI,
  )
  return `${hasKulturMinnerSefrak ? "Ja" : "Nei"} / ${hasKulturMinnerEnkelt ? "Ja" : "Nei"}`
}
