// Formaterer en bygningstype som "<kode> <navn>", f.eks. "111 Enebolig"
import type { TFunction } from "i18next"
import { oversettKode } from "../i18n/koder/oversettKode.ts"

export function formaterBygningstype(
  t: TFunction,
  kode: string | undefined,
): string | null {
  if (kode === undefined) return null
  return `${kode} ${oversettKode({ t, kodeverk: "bygningstype", kode })}`.trim()
}
