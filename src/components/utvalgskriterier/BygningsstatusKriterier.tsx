import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { formatDate } from "../../lib/utils/formatDate"
import { Utvalg } from "./Utvalg.tsx"
import { erAngitt } from "./utils/erAngitt.ts"

interface Props {
  bygningsstatusKriterier: NonNullable<Utvalgskriterier>["bygningsstatus"]
}

const numeriskDatoformat = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
} satisfies Intl.DateTimeFormatOptions

export function BygningsstatusKriterier({ bygningsstatusKriterier }: Props) {
  const { i18n, t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <Utvalg
      title={t(`${uk}.bygningsstatus.tittel`)}
      kriterier={[
        {
          label: t(`${uk}.bygningsstatus.naavaerende`),
          value: erAngitt(bygningsstatusKriterier?.naavaerende)
            ? bygningsstatusKriterier.naavaerende
                .map((kode) => t(`koder.bygningsstatusKort.${kode}`))
                .join(", ")
            : undefined,
        },
        {
          label: t(`${uk}.bygningsstatus.tidligere`),
          value: erAngitt(bygningsstatusKriterier?.tidligere)
            ? bygningsstatusKriterier.tidligere
                .map((kode) => t(`koder.bygningsstatusKort.${kode}`))
                .join(", ")
            : undefined,
        },
        {
          label: t(`${uk}.bygningsstatus.periodeFra`),
          value: erAngitt(bygningsstatusKriterier?.periodeFra)
            ? formatDate(
                i18n,
                bygningsstatusKriterier.periodeFra,
                undefined,
                numeriskDatoformat,
              )
            : undefined,
        },
        {
          label: t(`${uk}.bygningsstatus.periodeTil`),
          value: erAngitt(bygningsstatusKriterier?.periodeTil)
            ? formatDate(
                i18n,
                bygningsstatusKriterier.periodeTil,
                undefined,
                numeriskDatoformat,
              )
            : undefined,
        },
      ]}
    />
  )
}
