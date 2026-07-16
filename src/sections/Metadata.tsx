import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggRapport } from "../lib/schema/byggRapportSchema"
import { formatDate } from "../lib/utils/formatDate"

interface Props {
  data: Pick<ByggRapport, "rapportType" | "kommune" | "koordinatsystem">
}

export function Metadata({ data }: Props) {
  const { i18n, t } = useTranslation()
  const rapportTitler: Record<ByggRapport["rapportType"], string> = {
    BYG0011: t("rapport.BYG0011.rapportTittel"),
  }

  return (
    <header className="bg-kv-blue-subtle p-4">
      <Heading level={1}>{rapportTitler[data.rapportType]}</Heading>
      <div className="flex max-w-6xl justify-between pt-2">
        <div>
          <Paragraph>Matrikkelrapport {data.rapportType}</Paragraph>
          <Paragraph>
            Kommune: {data.kommune.nr} {data.kommune.navn}
          </Paragraph>
        </div>
        <div>
          <Paragraph>
            {formatDate(i18n, new Date(), "", {
              dateStyle: "long",
              timeStyle: "short",
            })}
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
