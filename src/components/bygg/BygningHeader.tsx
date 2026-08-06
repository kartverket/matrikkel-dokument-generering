import { Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { Trans, useTranslation } from "react-i18next"
import type { Bygningstypekode } from "../../lib/schema/reports/bygg/koder/bygningsTypeKodeSchema.ts"

interface Props {
  byggNr?: string
  bygningIndeks: number
  antallBygninger: number
  bygningsTypeKode?: Bygningstypekode
  gjeldendeStatusKode?: string
}

export default function BygningHeader({
  byggNr,
  bygningIndeks,
  antallBygninger,
  bygningsTypeKode,
  gjeldendeStatusKode,
}: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"

  return (
    <div className="flex break-inside-avoid break-after-avoid items-baseline justify-between bg-kv-green-tinted px-4 py-2">
      <div className="flex items-baseline gap-4">
        <Heading level={3} className="font-rapport-h3">
          {t(`${key}.header.bygningsNr`)}{" "}
          {byggNr
            ? byggNr
                .replace(/\s/g, "")
                .replace(/^(\d{2})(?=\d)/, "$1 ")
                .replace(/(\d{3})(?=\d)/g, "$1 ")
            : null}
        </Heading>
        <Tag data-size="sm" data-color={"info"}>
          {bygningsTypeKode
            ? `${bygningsTypeKode} ${t(`koder.bygningstype.${bygningsTypeKode}`)}`
            : t(`${key}.ukjentByggningsType`)}
        </Tag>
        <Tag data-size="sm" data-color={"success"}>
          {gjeldendeStatusKode
            ? t(`koder.bygningsstatus.${gjeldendeStatusKode}`, {
                defaultValue: gjeldendeStatusKode,
              })
            : t(`${key}.ukjentBygningsStatus`)}
        </Tag>
      </div>
      <Paragraph>
        {antallBygninger > 1 && (
          <Trans
            i18nKey={`${key}.header.bygningAvAntall`}
            values={{ indeks: bygningIndeks, antall: antallBygninger }}
            components={{ bold: <strong className="font-bold" /> }}
          />
        )}
      </Paragraph>
    </div>
  )
}
