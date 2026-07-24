import { Card, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  matrikkelenhetKriterier: NonNullable<Utvalgskriterier>["matrikkelenhet"]
}

export function MatrikkelenhetKriterier({ matrikkelenhetKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!harAngittVerdi(matrikkelenhetKriterier)) return null

  return (
    <Card variant="tinted" className="border border-kv-border">
      <Card.Block className="p-6">
        <Heading level={3} data-size="sm" className="mb-5 font-medium">
          {t(`${uk}.matrikkelenhet.tittel`)}
        </Heading>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          {erAngitt(matrikkelenhetKriterier?.gnr) && (
            <div>
              <dt className="text-kv-subtle">
                {t(`${uk}.matrikkelenhet.gnr`)}
              </dt>
              <dd className="mt-1 font-medium">
                {matrikkelenhetKriterier.gnr}
              </dd>
            </div>
          )}
          {erAngitt(matrikkelenhetKriterier?.bnr) && (
            <div>
              <dt className="text-kv-subtle">
                {t(`${uk}.matrikkelenhet.bnr`)}
              </dt>
              <dd className="mt-1 font-medium">
                {matrikkelenhetKriterier.bnr}
              </dd>
            </div>
          )}
          {erAngitt(matrikkelenhetKriterier?.fnr) && (
            <div>
              <dt className="text-kv-subtle">
                {t(`${uk}.matrikkelenhet.fnr`)}
              </dt>
              <dd className="mt-1 font-medium">
                {matrikkelenhetKriterier.fnr}
              </dd>
            </div>
          )}
          {erAngitt(matrikkelenhetKriterier?.snr) && (
            <div>
              <dt className="text-kv-subtle">
                {t(`${uk}.matrikkelenhet.snr`)}
              </dt>
              <dd className="mt-1 font-medium">
                {matrikkelenhetKriterier.snr}
              </dd>
            </div>
          )}
        </dl>
      </Card.Block>
    </Card>
  )
}
