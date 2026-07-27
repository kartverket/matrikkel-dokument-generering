import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { Utvalg } from "./Utvalg.tsx"

interface Props {
  matrikkelenhetKriterier: NonNullable<Utvalgskriterier>["matrikkelenhet"]
}

export function MatrikkelenhetKriterier({ matrikkelenhetKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <Utvalg
      title={t(`${uk}.matrikkelenhet.tittel`)}
      kriterier={[
        {
          label: t(`${uk}.matrikkelenhet.gnr`),
          value: matrikkelenhetKriterier?.gnr,
        },
        {
          label: t(`${uk}.matrikkelenhet.bnr`),
          value: matrikkelenhetKriterier?.bnr,
        },
        {
          label: t(`${uk}.matrikkelenhet.fnr`),
          value: matrikkelenhetKriterier?.fnr,
        },
        {
          label: t(`${uk}.matrikkelenhet.snr`),
          value: matrikkelenhetKriterier?.snr,
        },
      ]}
    />
  )
}
