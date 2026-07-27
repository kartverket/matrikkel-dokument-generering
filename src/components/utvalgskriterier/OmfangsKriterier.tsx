import { Checkbox, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  omfangsKriterier: NonNullable<Utvalgskriterier>["omfang"]
}

export function OmfangsKriterier({ omfangsKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!harAngittVerdi(omfangsKriterier)) return null

  return (
    <section>
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.omfang.tittel`)}
      </Heading>
      <div className="flex flex-row w-full justify-between gap-2">
        {erAngitt(omfangsKriterier?.inkluderBestaaendeBygg) && (
          <Checkbox
            label={t(`${uk}.omfang.inkluderBestaaendeBygg`)}
            checked={omfangsKriterier.inkluderBestaaendeBygg}
          />
        )}
        {erAngitt(omfangsKriterier?.inkluderUtgaatteBygg) && (
          <Checkbox
            label={t(`${uk}.omfang.inkluderUtgaatteBygg`)}
            checked={omfangsKriterier.inkluderUtgaatteBygg}
          />
        )}
        {erAngitt(omfangsKriterier?.inkluderBygninger) && (
          <Checkbox
            label={t(`${uk}.omfang.inkluderBygninger`)}
            checked={omfangsKriterier.inkluderBygninger}
          />
        )}
        {erAngitt(omfangsKriterier?.inkluderBygningsendringer) && (
          <Checkbox
            label={t(`${uk}.omfang.inkluderBygningsendringer`)}
            checked={omfangsKriterier.inkluderBygningsendringer}
          />
        )}
        {erAngitt(omfangsKriterier?.inkluderFrededeBygninger) && (
          <Checkbox
            label={t(`${uk}.omfang.inkluderFrededeBygninger`)}
            checked={omfangsKriterier.inkluderFrededeBygninger}
          />
        )}
      </div>
    </section>
  )
}
