import { Card, Divider } from "@kv-designsystem/react"
import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/ArealFordeling.tsx"
import { BruksenhetHeader } from "../components/bruksenheter/BruksenhetHeader.tsx"
import { Hjemmelshavere } from "../components/bruksenheter/Hjemmelshavere.tsx"
import { Kontaktpersoner } from "../components/bruksenheter/Kontaktpersoner.tsx"
import { RegistrerteVedtak } from "../components/bruksenheter/RegistrerteVedtak.tsx"
import { Tiltakshavere } from "../components/bruksenheter/Tiltakshavere.tsx"
import { Detaljgrid, lagDetaljfeltBuilder } from "../components/Detaljfelt.tsx"
import { Section } from "../components/Section.tsx"
import type {
  Bruksenhet,
  Bygning,
  Bygningsendring,
} from "../lib/schema/reports/bygg/bygg0011/index.ts"
import { summerAreal } from "../lib/utils/arealLinje.ts"
import { formatArea } from "../lib/utils/formatArea.ts"
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
      formatArea(summerAreal(bruksenhet.arealfordeling.bruksareal)),
    ),
    bruksenhetFelt("antallRom", String(bruksenhet.antallRom)),
    bruksenhetFelt("kjokkentilgang", kjokkentilgang),
    bruksenhetFelt("antallBad", String(bruksenhet.antallBad)),
    bruksenhetFelt("antallWc", String(bruksenhet.antallWc)),
  ]
}

function berorerBruksenhet(endring: Bygningsendring, bruksenhet: Bruksenhet) {
  return (
    bruksenhet.nummer !== null &&
    endring.bruksenheter.some(
      ({ bruksenhetsnr }) => bruksenhetsnr === bruksenhet.nummer,
    )
  )
}

export default function Bruksenheter({ index, bygning }: Props) {
  const { t } = useTranslation()
  const i18n = "rapport.BYG0011.bruksenheter"
  const tom = t("tom")
  const ingenOppgittBruksenhet = t(`${i18n}.ingenOppgittBruksenhet`)
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

          return (
            <div
              key={bruksenhet.id}
              data-bruksenhet={bruksenhet.nummer ?? ingenOppgittBruksenhet}
              className="space-y-8 p-4 border-t border-kv-blue-subtle"
            >
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

              <Hjemmelshavere hjemmelshavere={bruksenhet.hjemmelshavere} />

              <RegistrerteVedtak endringer={endringer} />

              <ArealFordeling
                arealfordeling={bruksenhet.arealfordeling}
                endringer={endringer}
              />

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
