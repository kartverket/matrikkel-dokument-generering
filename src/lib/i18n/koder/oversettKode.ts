import type { ParseKeys, TFunction } from "i18next"

interface Props {
  t: TFunction
  kodeverk: string
  kode: string | number
}

// Returnerer den lokaliserte verdien gitt en kode-nøkkel
export function oversettKode({ t, kodeverk, kode }: Props): string {
  const verdi = String(kode)
  return t(`koder.${kodeverk}.${verdi}` as ParseKeys, {
    defaultValue: verdi,
  })
}
