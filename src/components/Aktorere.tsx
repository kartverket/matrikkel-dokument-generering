import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Aktor } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { AktorCard } from "./AktorCard.tsx"

interface Props {
  aktorer: Aktor[] | undefined
}

export function Aktorere({ aktorer }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.hjemmelshavere"

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>

      {!aktorer || aktorer.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {aktorer.map((aktor) => (
            <AktorCard key={JSON.stringify(aktor)} aktor={aktor} />
          ))}
        </div>
      )}
    </div>
  )
}
