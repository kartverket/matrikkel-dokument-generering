import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { Utvalg } from "./Utvalg.tsx"
import { erAngitt } from "./utils/erAngitt.ts"

interface Props {
  sokevinduKriterier: NonNullable<Utvalgskriterier>["sokevindu"]
}

export function SokevinduKriterier({ sokevinduKriterier }: Props) {
  const { t, i18n } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const { nord, ost, syd, vest } = sokevinduKriterier || {}

  if ([nord, ost, syd, vest].every((verdi) => verdi === 0)) return null

  const numberFormatter = new Intl.NumberFormat(
    i18n.resolvedLanguage ?? i18n.language,
    {
      maximumFractionDigits: 2,
    },
  )
  const formaterKoordinat = (verdi: number | null | undefined) =>
    erAngitt(verdi) ? numberFormatter.format(verdi) : undefined

  return (
    <Utvalg
      title={t(`${uk}.sokevindu.tittel`)}
      kriterier={[
        {
          key: "nord",
          label: t(`${uk}.sokevindu.nord`),
          value: formaterKoordinat(nord),
        },
        {
          key: "ost",
          label: t(`${uk}.sokevindu.ost`),
          value: formaterKoordinat(ost),
        },
        {
          // TODO: Endre schema navngivning til å ikke være vest/syd, men 2 nord og 2 ost koordinater.
          key: "vest",
          label: t(`${uk}.sokevindu.nord`),
          value: formaterKoordinat(vest),
        },
        {
          key: "syd",
          label: t(`${uk}.sokevindu.ost`),
          value: formaterKoordinat(syd),
        },
      ]}
    />
  )
}
