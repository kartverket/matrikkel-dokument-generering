import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { Utvalg } from "./Utvalg.tsx"

interface Props {
  aktorKriterier: NonNullable<Utvalgskriterier>["aktor"]
}

export function AktorKriterier({ aktorKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <Utvalg
      title={t(`${uk}.aktor.tittel`)}
      kriterier={[
        {
          label: t(`${uk}.aktor.identifikasjonsNr`),
          value: aktorKriterier?.identifikasjonsNr,
        },
        {
          label: t(`${uk}.aktor.fornavn`),
          value: aktorKriterier?.fornavn,
        },
        {
          label: t(`${uk}.aktor.etternavn`),
          value: aktorKriterier?.etternavn,
        },
      ]}
    />
  )
}
