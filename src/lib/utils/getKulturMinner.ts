import type { Bygningsendring } from "../schema/reports/BYG0011"

const SEFRAK_KATEGORI = "SEFRAK-registrert bygning"

export function getKulturMinner(endring: Bygningsendring): string {
  const hasKulturMinnerSefrak = endring.kulturminner.some(
    (k) => k.kategori === SEFRAK_KATEGORI,
  )
  const hasKulturMinnerEnkelt = endring.kulturminner.some(
    (k) => k.kategori !== SEFRAK_KATEGORI,
  )
  return `${hasKulturMinnerSefrak ? "Ja" : "Nei"} / ${hasKulturMinnerEnkelt ? "Ja" : "Nei"}`
}
