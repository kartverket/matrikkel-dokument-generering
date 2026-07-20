import { Card, Divider, Paragraph } from "@kv-designsystem/react"
import type { TFunction } from "i18next"
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
import type { Tiltakshaver } from "../lib/schema/reports/bygg/byg0011/aktoer.schema.ts"
import type { Bruksenhet } from "../lib/schema/reports/bygg/byg0011/bruksenhet.schema.ts"
import type { BygningsEndring } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatArea } from "../lib/utils/formatArea.ts"
import {
  finnGjeldendeBygningsendring,
  isFerdigstilt,
} from "../lib/utils/isFerdigstilt.ts"
import { sorterBruksenheterEtterNummer } from "../lib/utils/sorterBruksenheter.ts"

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
      formatArea(bruksenhet.arealfordeling.bruksareal.totalt),
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
): Tiltakshaver[] {
  const unikeTiltakshavere = new Map<string, Tiltakshaver>()

  for (const endring of endringer.toSorted(
    (a, b) => (b?.lopeNr ?? 0) - (a?.lopeNr ?? 0),
  )) {
    if (isFerdigstilt(endring)) continue

    for (const tiltakshaver of endring.tiltakshavere) {
      if (tiltakshaver.bruksenhetsnr !== bruksenhet.nummer) continue

      const nokkel = JSON.stringify([
        tiltakshaver.identifikasjonsNr,
        tiltakshaver.rolle,
        tiltakshaver.bruksenhetsnr,
        tiltakshaver.datofra,
        tiltakshaver.kategorikode,
        tiltakshaver.kontaktpersonKode,
      ])

      if (!unikeTiltakshavere.has(nokkel)) {
        unikeTiltakshavere.set(nokkel, tiltakshaver)
      }
    }
  }

  return [...unikeTiltakshavere.values()]
}

function berorerBruksenhet(endring: BygningsEndring, bruksenhet: Bruksenhet) {
  return (
    bruksenhet.bruksenhetsNr !== null &&
    endring.bruksenheter.some(() => bruksenhetsNr === bruksenhet.bruksenhetsNr)
  )
}

export default function Bruksenheter({ index, bygning }: Props) {
  const { t } = useTranslation()
  const i18n = "rapport.BYG0011.bruksenheter"
  const tom = t("tom")
  const ingenOppgittBruksenhet = t(`${i18n}.ingenOppgittBruksenhet`)
  const gjeldende = finnGjeldendeBygningsendring(bygning.endringer)
  const sorterteBruksenheter = sorterBruksenheterEtterNummer(
    bygning.bruksenheter,
  )

  if (bygning.bruksenheter.length === 0) return null

  return (
    <Section
      title={t(`${i18n}.title`)}
      index={index}
      description={t(`${i18n}.description`)}
    >
      <div className="flex flex-col gap-5">
        {sorterteBruksenheter.map((bruksenhet) => {
          const endringer = bygning.endringer.filter((endring) =>
            berorerBruksenhet(endring, bruksenhet),
          )
          const gjeldendeEndringForBruksenhet = berorerBruksenhet(
            gjeldende,
            bruksenhet,
          )
            ? gjeldende
            : undefined
          const tiltakshavere = getTiltakshavere(bygning.endringer, bruksenhet)

          return (
            <Card
              key={bruksenhet.id}
              data-bruksenhet={bruksenhet.nummer ?? ingenOppgittBruksenhet}
              className="break-inside-avoid border border-kv-border"
            >
              <Card.Block className="p-7">
                <BruksenhetHeader
                  bruksenhetNummer={bruksenhet.nummer ?? null}
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
                <Hjemmelshavere hjemmelshavere={bruksenhet.hjemmelshavere} />

                <Divider className="my-6" />
                <Kontaktpersoner kontaktpersoner={bruksenhet.kontaktpersoner} />

                <Divider className="my-6" />

                <div>
                  <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
                    {endringer.length > 0
                      ? t(`${i18n}.endringerPaBruksenheten`)
                      : t(`${i18n}.ingenEndringer`)}
                  </Paragraph>
                  {endringer.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {endringer.map((endring) => (
                        <Endringskort
                          key={endring.lopeNr}
                          endring={endring}
                          bygning={bygning}
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
