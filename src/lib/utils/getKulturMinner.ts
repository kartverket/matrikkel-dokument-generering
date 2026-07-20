import type { BygningsEndring } from "../schema/reports/bygg/byg0011/bygningsEndring.schema"

const SEFRAK_KATEGORI = "SEFRAK-registrert bygning"

export function getKulturMinner(endring: BygningsEndring): string {
  const hasKulturMinnerSefrak = endring.kulturminner.some(
    (k) => k.kategori === SEFRAK_KATEGORI,
  )
  const hasKulturMinnerEnkelt = endring.kulturminner.some(
    (k) => k.kategori !== SEFRAK_KATEGORI,
  )
  return `${hasKulturMinnerSefrak ? "Ja" : "Nei"} / ${hasKulturMinnerEnkelt ? "Ja" : "Nei"}`
}
