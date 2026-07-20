import { Card, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/utvalgskriterier.schema"

interface Props {
  matrikkelenhetKriterier: Utvalgskriterier["matrikkelenhet"]
}

export function MatrikkelenhetKriterier({ matrikkelenhetKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const ikkeAngitt = t(`${uk}.ikkeAngitt`)

  return (
    <Card variant="tinted" className="border border-kv-border">
      <Card.Block className="p-6">
        <Heading level={3} data-size="sm" className="mb-5 font-medium">
          {t(`${uk}.grupper.matrikkelenhet`)}
        </Heading>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <dt className="text-kv-subtle">{t(`${uk}.felt.gnr`)}</dt>
            <dd className="mt-1 font-medium">{matrikkelenhetKriterier?.gnr}</dd>
          </div>
          <div>
            <dt className="text-kv-subtle">{t(`${uk}.felt.bnr`)}</dt>
            <dd className="mt-1 font-medium">{matrikkelenhetKriterier?.bnr}</dd>
          </div>
          <div>
            <dt className="text-kv-subtle">{t(`${uk}.felt.fnr`)}</dt>
            <dd className="mt-1 font-medium">
              {matrikkelenhetKriterier?.fnr ?? ikkeAngitt}
            </dd>
          </div>
          <div>
            <dt className="text-kv-subtle">{t(`${uk}.felt.snr`)}</dt>
            <dd className="mt-1 font-medium">
              {matrikkelenhetKriterier?.snr ?? ikkeAngitt}
            </dd>
          </div>
        </dl>
      </Card.Block>
    </Card>
  )
}
