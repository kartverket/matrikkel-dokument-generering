import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { Utvalg } from "./Utvalg.tsx"

interface Props {
  omfangsKriterier: NonNullable<Utvalgskriterier>["omfang"]
}

export function OmfangsKriterier({ omfangsKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <Utvalg
      title={t(`${uk}.omfang.tittel`)}
      kriterier={[
        {
          label: t(`${uk}.omfang.inkluderBestaaendeBygg`),
          value: omfangsKriterier?.inkluderBestaaendeBygg,
        },
        {
          label: t(`${uk}.omfang.inkluderBygninger`),
          value: omfangsKriterier?.inkluderBygninger,
        },
        {
          label: t(`${uk}.omfang.inkluderUtgaatteBygg`),
          value: omfangsKriterier?.inkluderUtgaatteBygg,
        },
        {
          label: t(`${uk}.omfang.inkluderBygningsendringer`),
          value: omfangsKriterier?.inkluderBygningsendringer,
        },
        {
          label: t(`${uk}.omfang.inkluderFrededeBygninger`),
          value: omfangsKriterier?.inkluderFrededeBygninger,
        },
      ]}
    />
  )
}
