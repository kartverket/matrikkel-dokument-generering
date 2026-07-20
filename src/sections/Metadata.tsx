import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { RapportMeta } from "../lib/schema/core"
import { formatDate } from "../lib/utils/formatDate"

const rapportTitleByType = {
  BYG0011: "rapport.BYG0011.rapportTittel",
} as const satisfies Record<RapportMeta["rapportType"], string>

interface MetadataProps {
  metadata: RapportMeta
}

export function Metadata({ metadata }: MetadataProps) {
  const { i18n, t } = useTranslation()
  const tMeta = "rapport.metaData"
  const tittel = t(rapportTitleByType[metadata.rapportType])

  return (
    <header className="bg-kv-blue-subtle p-4">
      <Heading level={1}>{tittel}</Heading>
      <div className="flex max-w-6xl justify-between pt-2">
        <div>
          <Paragraph>
            {t(`${tMeta}.rapportType`)}: {metadata.rapportType}
          </Paragraph>
          <Paragraph>
            {t(`${tMeta}.kommune`)}: {metadata.kommune.nr}{" "}
            {metadata.kommune.navn}
          </Paragraph>
        </div>
        <div>
          <Paragraph>
            {t(`${tMeta}.generertTidspunkt`)}:{" "}
            {formatDate(i18n, metadata.generertTidspunkt, "", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </Paragraph>
          <Paragraph>
            {t(`${tMeta}.koordinatsystem`)}: {metadata.koordinatsystem}
          </Paragraph>
        </div>
      </div>
    </header>
  )
}
