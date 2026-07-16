import { Card, Divider, Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/ArealFordeling.tsx"
import { Endringskort } from "../components/bruksenheter/Endringskort.tsx"
import { Hjemmelshavere } from "../components/bruksenheter/Hjemmelshavere.tsx"
import { Kontaktpersoner } from "../components/bruksenheter/Kontaktpersoner.tsx"
import { Detaljgrid, lagDetaljfeltBuilder } from "../components/Detaljfelt.tsx"
import { Section } from "../components/Section.tsx"
import type { BruksenhetDetalj } from "../lib/schema/byggRapportSchema.ts"
import { cn } from "../lib/utils/cn.ts"

interface Props {
  index: number
  bruksenheter: BruksenhetDetalj[]
}

const bruksenhetFelt = lagDetaljfeltBuilder("rapport.BYG0011.bruksenheter")

function getBruksenhetDetaljfelter(bruksenhet: BruksenhetDetalj) {
  return [
    bruksenhetFelt("bruksenhetstype", bruksenhet.bruksenhetstype),
    bruksenhetFelt("adresse", bruksenhet.adresse, {
      className: "col-span-2",
    }),
    bruksenhetFelt("etasje", bruksenhet.etasje),
    bruksenhetFelt("bruksareal", bruksenhet.bruksareal),
    bruksenhetFelt("antallRom", bruksenhet.antallRom),
    bruksenhetFelt("kjokken", bruksenhet.kjokken),
    bruksenhetFelt("antallBad", bruksenhet.antallBad),
    bruksenhetFelt("antallWc", bruksenhet.antallWc),
  ]
}

export default function Bruksenheter({ index, bruksenheter }: Props) {
  const { t } = useTranslation()
  const i18n = "rapport.BYG0011.bruksenheter"
  const tom = t("tom")
  const ingenOppgittBruksenhet = t(`${i18n}.ingenOppgittBruksenhet`)

  if (bruksenheter.length === 0) return null

  return (
    <Section
      title={t(`${i18n}.title`)}
      index={index}
      description={t(`${i18n}.description`)}
    >
      <div className="flex flex-col gap-5">
        {bruksenheter.map((bruksenhet) => {
          const harEndringer = bruksenhet.endringer.length > 0

          return (
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
                      className={cn(
                        bruksenhet.nummer === null &&
                          "font-normal text-kv-subtle",
                      )}
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

                <Detaljgrid
                  felter={getBruksenhetDetaljfelter(bruksenhet)}
                  tom={tom}
                  className="gap-x-8 gap-y-5"
                />

                <Divider className="my-6" />
                <ArealFordeling arealfordeling={bruksenhet.arealfordeling} />

                <Divider className="my-6" />
                <Hjemmelshavere hjemmelshavere={bruksenhet.hjemmelshavere} />

                <Divider className="my-6" />
                <Kontaktpersoner kontaktpersoner={bruksenhet.kontaktpersoner} />

                <Divider className="my-6" />

                <div>
                  <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
                    {harEndringer
                      ? t(`${i18n}.endringerPaBruksenheten`)
                      : t(`${i18n}.ingenEndringer`)}
                  </Paragraph>
                  {harEndringer && (
                    <div className="flex flex-col gap-3">
                      {bruksenhet.endringer.map((endring) => (
                        <Endringskort key={endring.id} endring={endring} />
                      ))}
                    </div>
                  )}
                </div>
              </Card.Block>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
