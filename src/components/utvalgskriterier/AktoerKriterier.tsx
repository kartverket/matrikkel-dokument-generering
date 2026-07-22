import { Card, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"

interface Props {
  aktoerKriterier: NonNullable<Utvalgskriterier>["aktoer"]
}

export function AktoerKriterier({ aktoerKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const ikkeAngitt = t(`${uk}.ikkeAngitt`)

  return (
    <Card variant="tinted" className="border border-kv-border">
      <Card.Block className="p-6">
        <Heading level={3} data-size="sm" className="mb-5 font-medium">
          {t(`${uk}.aktoer.tittel`)}
        </Heading>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          <div className="col-span-full">
            <dt className="text-kv-subtle">
              {t(`${uk}.aktoer.identifikasjonsNr`)}
            </dt>
            <dd className="mt-1 font-medium">
              {aktoerKriterier?.identifikasjonsNr ?? ikkeAngitt}
            </dd>
          </div>
          <div>
            <dt className="text-kv-subtle">{t(`${uk}.aktoer.etternavn`)}</dt>
            <dd className="mt-1 font-medium">
              {aktoerKriterier?.etternavn ?? ikkeAngitt}
            </dd>
          </div>
          <div>
            <dt className="text-kv-subtle">{t(`${uk}.aktoer.fornavn`)}</dt>
            <dd className="mt-1 font-medium">
              {aktoerKriterier?.fornavn ?? ikkeAngitt}
            </dd>
          </div>
        </dl>
      </Card.Block>
    </Card>
  )
}
