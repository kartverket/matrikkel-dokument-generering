import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { Utvalg } from "./Utvalg.tsx"

interface Props {
  subrapporterKriterier: NonNullable<Utvalgskriterier>["subrapporter"]
}

export function SubrapporterKriterier({ subrapporterKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <Utvalg
      title={t(`${uk}.subrapporter.tittel`)}
      kriterier={[
        {
          label: t(`${uk}.subrapporter.inkluderEtasjer`),
          value: subrapporterKriterier?.inkluderEtasjer,
        },
        {
          label: t(`${uk}.subrapporter.inkluderKontaktpersoner`),
          value: subrapporterKriterier?.inkluderKontaktpersoner,
        },
        {
          label: t(`${uk}.subrapporter.inkluderBruksenheter`),
          value: subrapporterKriterier?.inkluderBruksenheter,
        },
        {
          label: t(`${uk}.subrapporter.inkluderHjemmelshavere`),
          value: subrapporterKriterier?.inkluderHjemmelshavere,
        },
        {
          label: t(`${uk}.subrapporter.inkluderTiltakshavere`),
          value: subrapporterKriterier?.inkluderTiltakshavere,
        },
        {
          label: t(`${uk}.subrapporter.inkluderKulturminner`),
          value: subrapporterKriterier?.inkluderKulturminner,
        },
      ]}
    />
  )
}
