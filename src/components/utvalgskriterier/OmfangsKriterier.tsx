import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { Utvalg } from "./Utvalg.tsx"
import { erAngitt } from "./utils/erAngitt.ts"

interface Props {
  omfangsKriterier: NonNullable<Utvalgskriterier>["omfang"]
  bygningKriterier: NonNullable<Utvalgskriterier>["bygning"]
}

export function OmfangsKriterier({
  omfangsKriterier,
  bygningKriterier,
}: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <Utvalg
      title={t(`${uk}.omfang.tittel`)}
      inlineVerdier
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
          label: t(`${uk}.bygning.bygningsNr`),
          value: bygningKriterier?.bygningsNr,
        },
        {
          label: t(`${uk}.bygning.lopeNr`),
          value: bygningKriterier?.lopeNr,
        },
        {
          label: t(`${uk}.omfang.inkluderFrededeBygninger`),
          value: omfangsKriterier?.inkluderFrededeBygninger,
        },
        {
          label: t(`${uk}.bygning.bygningstyper`),
          fullBredde: true,
          value: erAngitt(bygningKriterier?.bygningstyper)
            ? bygningKriterier.bygningstyper
                .map((kode) => t(`koder.bygningstype.${kode}`))
                .join(", ")
            : undefined,
        },
      ]}
    />
  )
}
