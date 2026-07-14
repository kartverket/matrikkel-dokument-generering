import { Card, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Utvalgskriterier } from "../../lib/schema/byggRapportSchema"

interface Props {
  hjemmelshaverKriterier: Utvalgskriterier["hjemmelshaver"]
}

export function HjemmelshaverKriterier({ hjemmelshaverKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const ikkeAngitt = t(`${uk}.ikkeAngitt`)

  return (
    <Card variant="tinted" className="border border-kv-border">
      <Card.Block className="p-6">
        <Heading level={3} data-size="sm" className="mb-5 font-medium">
          {t(`${uk}.grupper.hjemmelshaver`)}
        </Heading>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          <div className="col-span-full">
            <dt className="text-kv-subtle">
              {t(`${uk}.felt.foedselsEllerOrgnr`)}
            </dt>
            <dd className="mt-1 font-medium">
              {hjemmelshaverKriterier.foedselsEllerOrgnr ?? ikkeAngitt}
            </dd>
          </div>
          <div>
            <dt className="text-kv-subtle">{t(`${uk}.felt.etternavn`)}</dt>
            <dd className="mt-1 font-medium">
              {hjemmelshaverKriterier.etternavn ?? ikkeAngitt}
            </dd>
          </div>
          <div>
            <dt className="text-kv-subtle">{t(`${uk}.felt.fornavn`)}</dt>
            <dd className="mt-1 font-medium">
              {hjemmelshaverKriterier.fornavn ?? ikkeAngitt}
            </dd>
          </div>
        </dl>
      </Card.Block>
    </Card>
  )
}
