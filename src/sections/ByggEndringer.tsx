import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import EndringsTabell from "../components/EndringsTabell.tsx"
import { Section } from "../components/Section.tsx"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

const BE = "rapport.BYG0011.byggEndringer" as const

type Props = {
  index: number
  bygning: Bygning
}

export default function ByggEndringer({ index, bygning }: Props) {
  const { t } = useTranslation()

  const endringer = bygning.endringer
    .filter((e) => e !== undefined)
    .toSorted((a, b) => a.lopeNr - b.lopeNr)

  return (
    <Section index={index} title={t(`${BE}.tittel`)}>
      <Heading level={3} className="bg-kv-green-subtle p-2">
        {t(`${BE}.bygningsnr`, { bygningsnr: bygning.bygningsnr })}
      </Heading>

      {endringer.length === 0 ? (
        <Paragraph className="text-kv-subtle">
          {t(`${BE}.ingenEndringer`)}
        </Paragraph>
      ) : (
        <div className="flex flex-col gap-8">
          <EndringsTabell endringer={endringer} />
        </div>
      )}
    </Section>
  )
}
