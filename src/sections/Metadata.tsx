import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { RapportMeta } from "../lib/schema/core/meta.schema"
import type { Rapport } from "../lib/schema/core/rapport.schema.ts"
import { formatDate } from "../lib/utils/formatDate"

interface MetadataProps {
  rapportKode: Rapport["rapportKode"]
  metadata: RapportMeta
}

export function Metadata({ rapportKode, metadata }: MetadataProps) {
  const { i18n, t } = useTranslation()
  const tm = "rapport.metaData"
  const tittel = t(`rapport.${rapportKode}.rapportTittel`)
  return (
    <header className="bg-kv-blue-subtle p-4">
      <Heading level={1}>{tittel}</Heading>
      <div className="flex max-w-6xl justify-between pt-2">
        <div>
          <Paragraph>
            {t(`${tm}.rapportKode`)}: {rapportKode}
          </Paragraph>
          <Paragraph>
            {t(`${tm}.kommune`)}: {metadata.kommune.kommuneNr}{" "}
            {metadata.kommune.kommuneNavn}
          </Paragraph>
        </div>
        <div>
          <Paragraph>
            {t(`${tm}.generertTidspunkt`)}:{" "}
            {formatDate(i18n, metadata.generertTidspunkt, "", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </Paragraph>
          <Paragraph>
            {t(`${tm}.koordinatsystem`)}:{" "}
            {oversettKode({
              t,
              kodeverk: "koordinat",
              kode: metadata.koordinatSystemKode,
            })}
          </Paragraph>
        </div>
      </div>
    </header>
  )
}
