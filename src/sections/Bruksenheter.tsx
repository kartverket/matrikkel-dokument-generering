import { Card, Divider, Paragraph } from "@kv-designsystem/react"
import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/ArealFordeling.tsx"
import { BruksenhetHeader } from "../components/bruksenheter/BruksenhetHeader.tsx"
import { Endringskort } from "../components/bruksenheter/Endringskort.tsx"
import { Hjemmelshavere } from "../components/bruksenheter/Hjemmelshavere.tsx"
import { RegistrerteVedtak } from "../components/bruksenheter/RegistrerteVedtak.tsx"
import { Tiltakshavere } from "../components/bruksenheter/Tiltakshavere.tsx"
import { Detaljgrid, lagDetaljfeltBuilder } from "../components/Detaljfelt.tsx"
import { Section } from "../components/Section.tsx"
import type { Bruksenhet } from "../lib/schema/reports/bygg/byg0011/bruksenhet.schema.ts"
import type {
  BygningsEndring,
  TiltaksHaver,
} from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatArea } from "../lib/utils/formatArea.ts"
import {
  finnGjeldendeBygningsendring,
  isFerdigstilt,
} from "../lib/utils/isFerdigstilt.ts"

interface Props {
  index: number
  bygning: Bygning
}

const bruksenhetFelt = lagDetaljfeltBuilder("rapport.BYG0011.bruksenheter")

function getBruksenhetDetaljfelter(bruksenhet: Bruksenhet, t: TFunction) {
  const kjokkentilgang =
    bruksenhet.kjokkentilgang === null
      ? null
      : t(
          `rapport.BYG0011.bruksenheter.${bruksenhet.kjokkentilgang ? "jaMedAntall" : "neiMedAntall"}`,
        )

  return [
    bruksenhetFelt("adresse", bruksenhet.adresse),
    bruksenhetFelt("etasje", bruksenhet.etasje),
    bruksenhetFelt(
      "bruksareal",
      formatArea(bruksenhet.arealfordeling.bruksareal.totaltAreal),
    ),
    bruksenhetFelt("antallRom", String(bruksenhet.antallRom)),
    bruksenhetFelt("kjokkentilgang", kjokkentilgang),
    bruksenhetFelt("antallBad", String(bruksenhet.antallBad)),
    bruksenhetFelt("antallWc", String(bruksenhet.antallWc)),
  ]
}

function getTiltakshavere(
  endringer: BygningsEndring[],
  bruksenhet: Bruksenhet,
): TiltaksHaver[] {
  const unikeTiltakshavere = new Map<string, TiltaksHaver>()

  for (const endring of endringer.toSorted(
    (a, b) => (b?.lopeNr ?? 0) - (a?.lopeNr ?? 0),
  )) {
    const tiltakshaver = endring?.tiltaksHaver

    if (!tiltakshaver || isFerdigstilt(endring)) continue
    if (tiltakshaver.bruksenhetsNr !== bruksenhet.bruksenhetsNr) continue

    const nokkel = JSON.stringify([
      tiltakshaver.identifikasjonsNr,
      tiltakshaver.kontaktPersonKode,
      tiltakshaver.bruksenhetsNr,
    ])

    if (!unikeTiltakshavere.has(nokkel)) {
      unikeTiltakshavere.set(nokkel, tiltakshaver)
    }
  }

  return Array.from(unikeTiltakshavere.values())
}

function berorerBruksenhet(
  endring: BygningsEndring,
  bruksenhet: Bruksenhet,
): boolean {
  return Boolean(
    bruksenhet.bruksenhetsNr &&
      endring?.bruksenheter?.some(
        (berortBruksenhet) =>
          berortBruksenhet.bruksenhetsNr === bruksenhet.bruksenhetsNr,
      ),
  )
}
export default function Bruksenheter({ index, bygning }: Props) {
  const { endringer } = bygning
  const { t } = useTranslation()
  const i18n = "rapport.BYG0011.bruksenheter"
  const tom = t("tom")
  const ingenOppgittBruksenhet = t(`${i18n}.ingenOppgittBruksenhet`)
  const gjeldende = finnGjeldendeBygningsendring(endringer)
  const sorterteBruksenheter = endringer.flatMap(
    (endring) => endring?.bruksenheter ?? [],
  )

  if (sorterteBruksenheter.length === 0) return null

  return (
    <Section
      title={t(`${i18n}.title`)}
      index={index}
      description={t(`${i18n}.description`)}
    >
      <div className="flex flex-col gap-5">
        {sorterteBruksenheter.map((bruksenhet) => {
          const bruksenhetsEndringer = endringer.filter((endring) =>
            berorerBruksenhet(endring, bruksenhet),
          )
          const gjeldendeEndringForBruksenhet = berorerBruksenhet(
            gjeldende,
            bruksenhet,
          )
            ? gjeldende
            : undefined
          const tiltakshavere = getTiltakshavere(endringer, bruksenhet)

          return (
            <Card
              key={bruksenhet.id}
              data-bruksenhet={
                bruksenhet.bruksenhetsNr ?? ingenOppgittBruksenhet
              }
              className="break-inside-avoid border border-kv-border"
            >
              <Card.Block className="p-7">
                <BruksenhetHeader
                  bruksenhetNummer={bruksenhet.bruksenhetsNr ?? null}
                  bruksenhetTypeChip={bruksenhet.type ?? null}
                  bruksenhetSeksjon={bruksenhet.seksjon ?? null}
                  ingenOppgittBruksenhet={ingenOppgittBruksenhet}
                />

                <Detaljgrid
                  felter={getBruksenhetDetaljfelter(bruksenhet, t)}
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
                <Hjemmelshavere aktor={gjeldendeEndringForBruksenhet?.aktor} />

                <Divider className="my-6" />

                <div>
                  <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
                    {bruksenhetsEndringer.length > 0
                      ? t(`${i18n}.endringerPaBruksenheten`)
                      : t(`${i18n}.ingenEndringer`)}
                  </Paragraph>
                  {bruksenhetsEndringer.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {bruksenhetsEndringer.map((bruksenhetsEndring) => (
                        <Endringskort
                          key={bruksenhetsEndring?.lopeNr}
                          endring={bruksenhetsEndring}
                          matrikkelNummer={bygning.matrikkelenhetsNr}
                        />
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
