import { Card, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  sokevinduKriterier: NonNullable<Utvalgskriterier>["sokevindu"]
}

export function SokevinduKriterier({ sokevinduKriterier }: Props) {
  const { t, i18n } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const { nord, ost, syd, vest } = sokevinduKriterier || {}
  if (
    !sokevinduKriterier ||
    !harAngittVerdi(sokevinduKriterier) ||
    [nord, ost, syd, vest].every((verdi) => verdi === 0)
  )
    return null

  const numberFormatter = new Intl.NumberFormat(
    i18n.resolvedLanguage ?? i18n.language,
    {
      maximumFractionDigits: 2,
    },
  )
  const formaterKoordinat = (verdi: number) => numberFormatter.format(verdi)

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.sokevindu`)}
      </Heading>
      <Card variant="tinted" className="border border-kv-border">
        <Card.Block className="p-6">
          <dl className="grid grid-cols-2 gap-8">
            {(erAngitt(ost) || erAngitt(vest)) && (
              <div>
                <dt className="font-medium text-kv-subtle">
                  {t(`${uk}.felt.ost`)}
                </dt>
                <dd className="mt-3 flex items-center gap-3 font-medium tabular-nums">
                  {erAngitt(ost) && <span>{formaterKoordinat(ost)}</span>}
                  {erAngitt(ost) && erAngitt(vest) && (
                    <span
                      className="flex flex-1 items-center"
                      aria-hidden="true"
                    >
                      <span className="size-2 rounded-full bg-kv-blue" />
                      <span className="h-0.5 flex-1 bg-kv-blue" />
                      <span className="size-2 rounded-full bg-kv-blue" />
                    </span>
                  )}
                  {erAngitt(vest) && <span>{formaterKoordinat(vest)}</span>}
                </dd>
              </div>
            )}
            {(erAngitt(nord) || erAngitt(syd)) && (
              <div>
                <dt className="font-medium text-kv-subtle">
                  {t(`${uk}.felt.nord`)}
                </dt>
                <dd className="mt-3 flex items-center gap-3 font-medium tabular-nums">
                  {erAngitt(nord) && <span>{formaterKoordinat(nord)}</span>}
                  {erAngitt(nord) && erAngitt(syd) && (
                    <span
                      className="flex flex-1 items-center"
                      aria-hidden="true"
                    >
                      <span className="size-2 rounded-full bg-kv-blue" />
                      <span className="h-0.5 flex-1 bg-kv-blue" />
                      <span className="size-2 rounded-full bg-kv-blue" />
                    </span>
                  )}
                  {erAngitt(syd) && <span>{formaterKoordinat(syd)}</span>}
                </dd>
              </div>
            )}
          </dl>
        </Card.Block>
      </Card>
    </section>
  )
}
