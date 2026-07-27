import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  aktorKriterier: NonNullable<Utvalgskriterier>["aktor"]
}

export function AktorKriterier({ aktorKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!harAngittVerdi(aktorKriterier)) return null

  return (
    <div>
      <span className="mb-2 flex items-center gap-4">
        <Heading level={3}>{t(`${uk}.aktor.tittel`)}</Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      {erAngitt(aktorKriterier?.identifikasjonsNr) && (
        <div>
          <Paragraph className="text-kv-subtle">
            {t(`${uk}.aktor.identifikasjonsNr`)}
          </Paragraph>
          <Paragraph className="mt-1 font-medium">
            {aktorKriterier.identifikasjonsNr}
          </Paragraph>
        </div>
      )}
      {erAngitt(aktorKriterier?.etternavn) && (
        <div>
          <Paragraph className="text-kv-subtle">
            {t(`${uk}.aktor.etternavn`)}
          </Paragraph>
          <Paragraph className="mt-1 font-medium">
            {aktorKriterier.etternavn}
          </Paragraph>
        </div>
      )}
      {erAngitt(aktorKriterier?.fornavn) && (
        <div>
          <Paragraph className="text-kv-subtle">
            {t(`${uk}.aktor.fornavn`)}
          </Paragraph>
          <Paragraph className="mt-1 font-medium">
            {aktorKriterier.fornavn}
          </Paragraph>
        </div>
      )}
    </div>
  )
}
