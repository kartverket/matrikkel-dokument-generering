import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/ArealFordeling.tsx"
import { BruksenhetHeader } from "../components/bruksenheter/BruksenhetHeader.tsx"
import {Aktorere, Hjemmelshavere} from "../components/Aktorere.tsx"
import { Kontaktpersoner } from "../components/bruksenheter/Kontaktpersoner.tsx"
import { RegistrerteVedtak } from "../components/bruksenheter/RegistrerteVedtak.tsx"
import { Tiltakshavere } from "../components/bruksenheter/Tiltakshavere.tsx"
import { Detaljgrid, lagDetaljfeltBuilder } from "../components/Detaljfelt.tsx"
import { Section } from "../components/Section.tsx"
import type { Bruksenhet } from "../lib/schema/reports/bygg/byg0011/bruksenhet.schema.ts"
import type { BygningsEndring } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatArea } from "../lib/utils/formatArea.ts"

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
      formatArea(bruksenhet?.arealfordeling?.bruksareal?.boligAreal ?? 0),
    ),
    bruksenhetFelt("antallRom", String(bruksenhet.antallRom)),
    bruksenhetFelt("kjokkentilgang", kjokkentilgang),
    bruksenhetFelt("antallBad", String(bruksenhet.antallBad)),
    bruksenhetFelt("antallWc", String(bruksenhet.antallWc)),
  ]
}

function berorerBruksenhet(endring: BygningsEndring, bruksenhet: Bruksenhet) {
  return (
    bruksenhet.bruksenhetsNr !== null &&
    endring?.bruksenheter.some(
      ({ bruksenhetsNr }) => bruksenhetsNr === bruksenhet.bruksenhetsNr,
    )
  )
}

export default function Bruksenheter({ index, bygning }: Props) {
  const { t } = useTranslation()
  const i18n = "rapport.BYG0011.bruksenheter"
  const tom = t("tom")
  const ingenOppgittBruksenhet = t(`${i18n}.ingenOppgittBruksenhet`)

  // TODO: Bruksenheter burde kunne ta inn en ferdig sortert/aggregert liste med bruksenheter, denne sortering dupliserer bruksnhetenene per endring
  const sorterteBruksenheter = bygning.endringer.flatMap(
    (endring) => endring?.bruksenheter ?? [],
  )

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

          return (
            <div
              key={bruksenhet.id}
              data-bruksenhet={
                bruksenhet.bruksenhetsNr ?? ingenOppgittBruksenhet
              }
              className="mb-10 space-y-8"
            >
              <BruksenhetHeader
                bruksenhetNummer={bruksenhet.bruksenhetsNr ?? null}
                bruksenhetTypeChip={bruksenhet.type ?? null}
                bruksenhetSeksjon={bruksenhet.seksjon ?? null}
                ingenOppgittBruksenhet={ingenOppgittBruksenhet}
                bygningsNr={bygning.bygningsnr ?? null}
              />
              <Detaljgrid
                felter={getBruksenhetDetaljfelter(bruksenhet, t)}
                tom={tom}
                className="gap-x-8 gap-y-5"
              />
              <Aktorere aktorer={gjeldendeEndringForBruksenhet?.aktorer} />{" "}
              hjemmelshavere={bruksenhet.hjemmelshavere} />
              <RegistrerteVedtak endringer={endringer} />
              {/* ArealFordeling */}
              <Tiltakshavere
                endringer={endringer}
                bruksenhetsnr={bruksenhet.nummer ?? null}
              />
              <Kontaktpersoner kontaktpersoner={bruksenhet.kontaktpersoner} />
            </div>
          )
        })}
      </div>
    </Section>
  )
}
