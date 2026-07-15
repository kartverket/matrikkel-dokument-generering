import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggRapport } from "../lib/schema/byggRapportSchema"
import { formatDateTime } from "../lib/utils/format"

interface Props {
  data: Pick<
    ByggRapport,
    | "tittel"
    | "rapportType"
    | "kommune"
    | "generertTidspunkt"
    | "locale"
    | "koordinatsystem"
  >
}

export function Metadata({ data }: Props) {
  const { t } = useTranslation()

  return (
    <header className="bg-kv-blue-subtle p-4">
      <Heading level={1}>{data.tittel}</Heading>
      <div className="flex max-w-6xl justify-between pt-2">
        <div>
          <Paragraph>Matrikkelrapport {data.rapportType}</Paragraph>
          <Paragraph>
            Kommune: {data.kommune.nr} {data.kommune.navn}
          </Paragraph>
        </div>
        <div>
          <Paragraph>
            {formatDateTime(data.generertTidspunkt, data.locale)}
          </Paragraph>
          <Paragraph>
            {t(`rapport.BYG0011.metadata.koordinatsystem`)}:{" "}
            {data.koordinatsystem}
          </Paragraph>
        </div>
      </div>
    </header>
  )
}
