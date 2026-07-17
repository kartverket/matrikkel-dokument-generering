import { Card, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Utvalgskriterier } from "../../lib/schema/reports/BYG0011"

const numberFormatter = new Intl.NumberFormat("nb-NO", {
  maximumFractionDigits: 2,
})

interface Props {
  sokevinduKriterier: Utvalgskriterier["sokevindu"]
}

export function SokevinduKriterier({ sokevinduKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!sokevinduKriterier) return null

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
                <span>
                  {numberFormatter.format(sokevinduKriterier.nedreVenstre.ost)}
                </span>
                <span className="flex flex-1 items-center" aria-hidden="true">
                  <span className="size-2 rounded-full bg-kv-blue" />
                  <span className="h-0.5 flex-1 bg-kv-blue" />
                  <span className="size-2 rounded-full bg-kv-blue" />
                </span>
                <span>
                  {numberFormatter.format(sokevinduKriterier.ovreHoeyre.ost)}
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-kv-subtle">
                {t(`${uk}.felt.nord`)}
              </dt>
              <dd className="mt-3 flex items-center gap-3 font-medium tabular-nums">
                <span>
                  {numberFormatter.format(sokevinduKriterier.nedreVenstre.nord)}
                </span>
                <span className="flex flex-1 items-center" aria-hidden="true">
                  <span className="size-2 rounded-full bg-kv-blue" />
                  <span className="h-0.5 flex-1 bg-kv-blue" />
                  <span className="size-2 rounded-full bg-kv-blue" />
                </span>
                <span>
                  {numberFormatter.format(sokevinduKriterier.ovreHoeyre.nord)}
                </span>
              </dd>
            </div>
          </dl>
        </Card.Block>
      </Card>
    </section>
  )
}
