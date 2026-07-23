import { Card, Heading } from "@kv-designsystem/react"
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
    <Card variant="tinted" className="border border-kv-border">
      <Card.Block className="p-6">
        <Heading level={3} data-size="sm" className="mb-5 font-medium">
          {t(`${uk}.aktor.tittel`)}
        </Heading>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          {erAngitt(aktorKriterier?.identifikasjonsNr) && (
            <div className="col-span-full">
              <dt className="text-kv-subtle">
                {t(`${uk}.aktor.identifikasjonsNr`)}
              </dt>
              <dd className="mt-1 font-medium">
                {aktorKriterier.identifikasjonsNr}
              </dd>
            </div>
          )}
          {erAngitt(aktorKriterier?.etternavn) && (
            <div>
              <dt className="text-kv-subtle">{t(`${uk}.aktor.etternavn`)}</dt>
              <dd className="mt-1 font-medium">{aktorKriterier.etternavn}</dd>
            </div>
          )}
          {erAngitt(aktorKriterier?.fornavn) && (
            <div>
              <dt className="text-kv-subtle">{t(`${uk}.aktor.fornavn`)}</dt>
              <dd className="mt-1 font-medium">{aktorKriterier.fornavn}</dd>
            </div>
          )}
        </dl>
      </Card.Block>
    </Card>
  )
}
