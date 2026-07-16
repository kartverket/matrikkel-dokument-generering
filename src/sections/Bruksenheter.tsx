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

type DetaljFeltKey =
  | "bruksenhetstype"
  | "adresse"
  | "etasje"
  | "bruksareal"
  | "antallRom"
  | "kjokken"
  | "antallBad"
  | "antallWc"

interface DetaljFelt {
  key: DetaljFeltKey
  value: BruksenhetDetalj[DetaljFeltKey]
  className?: string
}

function detaljFelter(bruksenhet: BruksenhetDetalj): DetaljFelt[] {
  return [
    { key: "bruksenhetstype", value: bruksenhet.bruksenhetstype },
    { key: "adresse", value: bruksenhet.adresse, className: "col-span-2" },
    { key: "etasje", value: bruksenhet.etasje },
    { key: "bruksareal", value: bruksenhet.bruksareal },
    { key: "antallRom", value: bruksenhet.antallRom },
    { key: "kjokken", value: bruksenhet.kjokken },
    { key: "antallBad", value: bruksenhet.antallBad },
    { key: "antallWc", value: bruksenhet.antallWc },
  ]
}

export default function Bruksenheter({ index, bruksenheter }: Props) {
  const { t } = useTranslation()
  const i18n = "rapport.BYG0011.bruksenheter"
  const tom = t(`${i18n}.tom`)
  const ingenOppgittBruksenhet = t(`${i18n}.ingenOppgittBruksenhet`)
  const harBruksenheter = bruksenheter.length > 0

  return (
    <Section
      title={t(`${i18n}.title`)}
      index={index}
      description={t(`${i18n}.description`)}
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
                {detaljFelter(bruksenhet).map(({ key, value, className }) => (
                  <EndringsDetalje
                    key={key}
                    label={t(`${i18n}.${key}`)}
                    className={className}
                    {...getDetaljVerdi(value, tom)}
                  />
                ))}
              </dl>

              <Divider className="my-6" />
              <ArealFordeling arealfordeling={bruksenhet.arealfordeling} />

              <Divider className="my-6" />
              <Hjemmelshavere hjemmelshavere={bruksenhet.hjemmelshavere} />

              <Divider className="my-6" />
              <Kontaktpersoner kontaktpersoner={bruksenhet.kontaktpersoner} />

              <Divider className="my-6" />

              <div>
                <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
                  {harBruksenheter
                    ? t(`${i18n}.endringerPaBruksenheten`)
                    : t(`${i18n}.ingenEndringer`)}
                </Paragraph>
                {harBruksenheter && (
                  <div className="flex flex-col gap-3">
                    {bruksenhet.endringer.map((endring) => (
                      <Endringskort key={endring.id} endring={endring} />
                    ))}
                  </div>
                )}
              </div>
            </Card.Block>
          </Card>
        ))}
      </div>
    </Section>
  )
}
