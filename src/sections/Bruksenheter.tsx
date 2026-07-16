import { Card, Divider, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/ArealFordeling.tsx"
import { BruksenhetHeader } from "../components/bruksenheter/BruksenhetHeader.tsx"
import { Endringskort } from "../components/bruksenheter/Endringskort.tsx"
import { Hjemmelshavere } from "../components/bruksenheter/Hjemmelshavere.tsx"
import { Kontaktpersoner } from "../components/bruksenheter/Kontaktpersoner.tsx"
import { RegistrerteVedtak } from "../components/bruksenheter/RegistrerteVedtak.tsx"
import { Tiltakshavere } from "../components/bruksenheter/Tiltakshavere.tsx"
import { Detaljgrid, lagDetaljfeltBuilder } from "../components/Detaljfelt.tsx"
import { Section } from "../components/Section.tsx"
import type {
  BruksenhetDetalj,
  Bygningsendring,
  Tiltakshaver,
} from "../lib/schema/byggRapportSchema.ts"
import { isFerdigstilt } from "../lib/utils/isFerdigstilt.ts"

interface Props {
  index: number
  bruksenheter: BruksenhetDetalj[]
  gjeldende: Bygningsendring
  endringer: Bygningsendring[]
}

const bruksenhetFelt = lagDetaljfeltBuilder("rapport.BYG0011.bruksenheter")

function getBruksenhetDetaljfelter(bruksenhet: BruksenhetDetalj) {
  return [
    bruksenhetFelt("adresse", bruksenhet.adresse),
    bruksenhetFelt("etasje", bruksenhet.etasje),
    bruksenhetFelt("bruksareal", bruksenhet.bruksareal),
    bruksenhetFelt("antallRom", bruksenhet.antallRom),
    bruksenhetFelt("kjokken", bruksenhet.kjokken),
    bruksenhetFelt("antallBad", bruksenhet.antallBad),
    bruksenhetFelt("antallWc", bruksenhet.antallWc),
  ]
}

function getTiltaksHavere(
  endringer: Bygningsendring[],
  bruksenhet: BruksenhetDetalj,
) {
  const unikeTiltakshavere = new Map<
    string,
    { endringId: number; tiltakshaver: Tiltakshaver }
  >()

  for (const endring of endringer.toSorted((a, b) => b.lopenr - a.lopenr)) {
    if (isFerdigstilt(endring)) continue

    for (const tiltakshaver of endring.tiltakshavere) {
      if (tiltakshaver.bruksenhetsnr !== bruksenhet.nummer) continue

      const nokkel = JSON.stringify([
        tiltakshaver.eierIdent,
        tiltakshaver.rolle,
        tiltakshaver.bruksenhetsnr,
        tiltakshaver.datofra,
        tiltakshaver.kategorikode,
        tiltakshaver.kontaktpersonKode,
      ])

      if (!unikeTiltakshavere.has(nokkel)) {
        unikeTiltakshavere.set(nokkel, {
          endringId: endring.id,
          tiltakshaver,
        })
      }
    }
  }

  return [...unikeTiltakshavere.values()]
}

function getGjeldendeEndringForBruksenhet(
  gjeldende: Bygningsendring,
  bruksenhet: BruksenhetDetalj,
) {
  return gjeldende.bruksenheter.some(
    ({ bruksenhetsnr }) => bruksenhetsnr === bruksenhet.nummer,
  )
    ? gjeldende
    : undefined
}

export default function Bruksenheter({
  index,
  bruksenheter,
  gjeldende,
  endringer,
}: Props) {
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
          const gjeldendeEndringForBruksenhet =
            getGjeldendeEndringForBruksenhet(gjeldende, bruksenhet)
          const tiltakshavere = getTiltaksHavere(endringer, bruksenhet)

          return (
            <Card
              key={bruksenhet.id}
              data-bruksenhet={bruksenhet.nummer ?? ingenOppgittBruksenhet}
              className="break-inside-avoid border border-kv-border"
            >
              <Card.Block className="p-7">
                <BruksenhetHeader
                  bruksenhetNummer={bruksenhet.nummer}
                  bruksenhetTypeChip={bruksenhet.typeChip}
                  bruksenhetSeksjon={bruksenhet.seksjon}
                  ingenOppgittBruksenhet={ingenOppgittBruksenhet}
                />

                <Detaljgrid
                  felter={getBruksenhetDetaljfelter(bruksenhet)}
                  tom={tom}
                  className="gap-x-8 gap-y-5"
                />

                <Divider className="my-6" />
                <RegistrerteVedtak endring={gjeldendeEndringForBruksenhet} />

                <Divider className="my-6" />
                <Tiltakshavere tiltakshavere={tiltakshavere} />

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
