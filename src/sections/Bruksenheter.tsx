import { Card, Divider, Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/ArealFordeling.tsx"
import { EndringsDetalje } from "../components/bruksenheter/EndringsDetalje.tsx"
import { Endringskort } from "../components/bruksenheter/Endringskort.tsx"
import { Hjemmelshavere } from "../components/bruksenheter/Hjemmelshavere.tsx"
import { Kontaktpersoner } from "../components/bruksenheter/Kontaktpersoner.tsx"
import { Section } from "../components/Section.tsx"
import type { BruksenhetDetalj } from "../lib/schema/byggRapportSchema.ts"
import { getDetaljVerdi } from "../lib/utils/getDetaljVerdi.ts"

interface Props {
  index: number
  bruksenheter: BruksenhetDetalj[]
}

export default function Bruksenheter({ index, bruksenheter }: Props) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.bruksenheter"
  const tom = t(`${translationKey}.tom`)
  const ingenOppgittBruksenhet = t(`${translationKey}.ingenOppgittBruksenhet`)

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
            data-bruksenhet={bruksenhet.nummer ?? ingenOppgittBruksenhet}
            className="break-inside-avoid border border-kv-border"
          >
            <Card.Block className="p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Heading
                    level={3}
                    data-size="sm"
                    className={
                      bruksenhet.nummer === null
                        ? "font-normal text-kv-subtle"
                        : undefined
                    }
                  >
                    {bruksenhet.nummer ?? ingenOppgittBruksenhet}
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
                <EndringsDetalje
                  label={t(`${translationKey}.bruksenhetstype`)}
                  {...getDetaljVerdi(bruksenhet.bruksenhetstype, tom)}
                />
                <EndringsDetalje
                  label={t(`${translationKey}.adresse`)}
                  {...getDetaljVerdi(bruksenhet.adresse, tom)}
                  className="col-span-2"
                />
                <EndringsDetalje
                  label={t(`${translationKey}.etasje`)}
                  {...getDetaljVerdi(bruksenhet.etasje, tom)}
                />
                <EndringsDetalje
                  label={t(`${translationKey}.bruksareal`)}
                  value={bruksenhet.bruksareal}
                />
                <EndringsDetalje
                  label={t(`${translationKey}.antallRom`)}
                  value={bruksenhet.antallRom}
                />
                <EndringsDetalje
                  label={t(`${translationKey}.kjokken`)}
                  {...getDetaljVerdi(bruksenhet.kjokken, tom)}
                />
                <EndringsDetalje
                  label={t(`${translationKey}.antallBad`)}
                  value={bruksenhet.antallBad}
                />
                <EndringsDetalje
                  label={t(`${translationKey}.antallWc`)}
                  value={bruksenhet.antallWc}
                />
              </dl>

              <Divider className="my-6" />
              <ArealFordeling arealfordeling={bruksenhet.arealfordeling} />

              <Divider className="my-6" />
              <Hjemmelshavere hjemmelshavere={bruksenhet.hjemmelshavere} />

              <Divider className="my-6" />
              <Kontaktpersoner kontaktpersoner={bruksenhet.kontaktpersoner} />

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
