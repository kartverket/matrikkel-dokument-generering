import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { Utvalg } from "./Utvalg.tsx"
import { erAngitt } from "./utils/erAngitt.ts"

interface Props {
  bygningKriterier: NonNullable<Utvalgskriterier>["bygning"]
}

export function BygningKriterier({ bygningKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <Utvalg
      title={t(`${uk}.bygning.tittel`)}
      kriterier={[
        {
          label: t(`${uk}.bygning.bygningsNr`),
          value: bygningKriterier?.bygningsNr,
        },
        {
          label: t(`${uk}.bygning.bygningstyper`),
          value: erAngitt(bygningKriterier?.bygningstyper)
            ? bygningKriterier.bygningstyper
                .map((kode) => t(`koder.bygningstype.${kode}`))
                .join(", ")
            : undefined,
        },
        {
          label: t(`${uk}.bygning.lopeNr`),
          value: bygningKriterier?.lopeNr,
        },
      ]}
    />
  )
}
