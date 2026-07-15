import { Card, Divider, Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { Endringskort } from "../components/bruksenheter/Endringskort.tsx"
import { Section } from "../components/Section.tsx"
import type { BruksenhetDetalj } from "../lib/schema/byggRapportSchema.ts"

interface Props {
  index: number
  bruksenheter: BruksenhetDetalj[]
}

export default function Bruksenheter({ index, bruksenheter }: Props) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.bruksenheter"

  if (bruksenheter.length === 0) return null

  return (
    <Section
      title={t(`${translationKey}.title`)}
      index={index}
      description={t(`${translationKey}.description`)}
    >
      <div className="flex flex-col gap-5">
        {bruksenheter.map((bruksenhet) => (
          <Card
            key={bruksenhet.id}
            data-bruksenhet={bruksenhet.nummer}
            className="break-inside-avoid border border-kv-border"
          >
            <Card.Block className="p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Heading level={3} data-size="sm">
                    {bruksenhet.nummer}
                  </Heading>
                  {bruksenhet.typeChip && (
                    <Tag data-color="accent" variant="outline">
                      {bruksenhet.typeChip}
                    </Tag>
                  )}
                </div>
                {bruksenhet.seksjon && (
                  <Paragraph className="text-kv-subtle text-sm">
                    {bruksenhet.seksjon}
                  </Paragraph>
                )}
              </div>

              <dl className="grid grid-cols-3 gap-x-8 gap-y-5">
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.bruksenhetstype`)}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {bruksenhet.bruksenhetstype}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.adresse`)}
                  </dt>
                  <dd className="mt-1 font-medium">{bruksenhet.adresse}</dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.etasje`)}
                  </dt>
                  <dd className="mt-1 font-medium">{bruksenhet.etasje}</dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.bruksareal`)}
                  </dt>
                  <dd className="mt-1 font-medium">{bruksenhet.bruksareal}</dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.antallRom`)}
                  </dt>
                  <dd className="mt-1 font-medium">{bruksenhet.antallRom}</dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.kjokken`)}
                  </dt>
                  <dd className="mt-1 font-medium">{bruksenhet.kjokken}</dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.antallBad`)}
                  </dt>
                  <dd className="mt-1 font-medium">{bruksenhet.antallBad}</dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.antallWc`)}
                  </dt>
                  <dd className="mt-1 font-medium">{bruksenhet.antallWc}</dd>
                </div>
              </dl>

              {bruksenhet.seksjon && (
                <>
                  <Divider className="my-6" />
                  <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
                    {t(`${translationKey}.hjemmelshaverEier`)}
                  </Paragraph>
                  <div className="flex flex-col gap-3">
                    {bruksenhet.hjemmelshavere.length > 0 ? (
                      bruksenhet.hjemmelshavere.map((eier) => (
                        <div
                          key={eier.id}
                          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                        >
                          <Paragraph className="font-semibold">
                            {eier.navn}
                          </Paragraph>
                          <Paragraph className="text-kv-subtle text-sm">
                            {eier.meta}
                          </Paragraph>
                        </div>
                      ))
                    ) : (
                      <Paragraph className="font-semibold">
                        {t(`${translationKey}.tom`)}
                      </Paragraph>
                    )}
                  </div>
                </>
              )}

              <Divider className="my-6" />
              {bruksenhet.endringer.length === 0 ? (
                <Paragraph className="text-kv-subtle text-sm">
                  {t(`${translationKey}.ingenEndringer`)}
                </Paragraph>
              ) : (
                <div>
                  <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
                    {t(`${translationKey}.endringerPaBruksenheten`)}
                  </Paragraph>
                  <div className="flex flex-col gap-3">
                    {bruksenhet.endringer.map((endring) => (
                      <Endringskort key={endring.id} endring={endring} />
                    ))}
                  </div>
                </div>
              )}
            </Card.Block>
          </Card>
        ))}
      </div>
    </Section>
  )
}
