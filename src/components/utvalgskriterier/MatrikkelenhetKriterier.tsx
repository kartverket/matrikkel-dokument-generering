import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  matrikkelenhetKriterier: NonNullable<Utvalgskriterier>["matrikkelenhet"]
}

export function MatrikkelenhetKriterier({ matrikkelenhetKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!harAngittVerdi(matrikkelenhetKriterier)) return null

  return (
    <div>
      <span className="flex items-center gap-4 mb-2">
        <Heading level={3}>{t(`${uk}.matrikkelenhet.tittel`)}</Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      <ul className="flex gap-5">
        {erAngitt(matrikkelenhetKriterier?.gnr) && (
          <div>
            <Paragraph>{t(`${uk}.matrikkelenhet.gnr`)}</Paragraph>
            <Paragraph>{matrikkelenhetKriterier.gnr}</Paragraph>
          </div>
        )}
        {erAngitt(matrikkelenhetKriterier?.bnr) && (
          <div>
            <Paragraph>{t(`${uk}.matrikkelenhet.bnr`)}</Paragraph>
            <Paragraph>{matrikkelenhetKriterier.bnr}</Paragraph>
          </div>
        )}
        {erAngitt(matrikkelenhetKriterier?.fnr) && (
          <div>
            <Paragraph>{t(`${uk}.matrikkelenhet.fnr`)}</Paragraph>
            <Paragraph>{matrikkelenhetKriterier.fnr}</Paragraph>
          </div>
        )}
        {erAngitt(matrikkelenhetKriterier?.snr) && (
          <div>
            <Paragraph>{t(`${uk}.matrikkelenhet.snr`)}</Paragraph>
            <Paragraph>{matrikkelenhetKriterier.snr}</Paragraph>
          </div>
        )}
      </ul>
    </div>
  )
}
