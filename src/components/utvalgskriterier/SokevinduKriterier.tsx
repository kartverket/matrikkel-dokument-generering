import { Card, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/utvalgskriterier.schema"

const numberFormatter = new Intl.NumberFormat("nb-NO", {
  maximumFractionDigits: 2,
})

interface Props {
  sokevinduKriterier: NonNullable<Utvalgskriterier>["sokevindu"]
}

export function SokevinduKriterier({ sokevinduKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const ikkeAngitt = t(`${uk}.ikkeAngitt`)

  if (!sokevinduKriterier) return null

  const formatCoordinate = (value: number | null) =>
    value === null ? ikkeAngitt : numberFormatter.format(value)

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.sokevindu`)}
      </Heading>
      <Card variant="tinted" className="border border-kv-border">
        <Card.Block className="p-6">
          <dl className="grid grid-cols-2 gap-8">
            <div>
              <dt className="font-medium text-kv-subtle">
                {t(`${uk}.felt.ost`)}
              </dt>
              <dd className="mt-3 flex items-center gap-3 font-medium tabular-nums">
                <span>{formatCoordinate(sokevinduKriterier.ost)}</span>
                <span className="flex flex-1 items-center" aria-hidden="true">
                  <span className="size-2 rounded-full bg-kv-blue" />
                  <span className="h-0.5 flex-1 bg-kv-blue" />
                  <span className="size-2 rounded-full bg-kv-blue" />
                </span>
                <span>{formatCoordinate(sokevinduKriterier.vest)}</span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-kv-subtle">
                {t(`${uk}.felt.nord`)}
              </dt>
              <dd className="mt-3 flex items-center gap-3 font-medium tabular-nums">
                <span>{formatCoordinate(sokevinduKriterier.nord)}</span>
                <span className="flex flex-1 items-center" aria-hidden="true">
                  <span className="size-2 rounded-full bg-kv-blue" />
                  <span className="h-0.5 flex-1 bg-kv-blue" />
                  <span className="size-2 rounded-full bg-kv-blue" />
                </span>
                <span>{formatCoordinate(sokevinduKriterier.syd)}</span>
              </dd>
            </div>
          </dl>
        </Card.Block>
      </Card>
    </section>
  )
}
