import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { TiltaksHaver } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonCard } from "../PersonCard"
import { PersonGrid } from "../PersonGrid"

interface Props {
  tiltakshavere: TiltaksHaver[]
}

const tiltakshaverFelt = lagDetaljfeltBuilder("rapport.BYG0011.tiltakshavere")

function getTiltakshaverDetaljfelter(tiltakshaver: TiltaksHaver, t: TFunction) {
  return [
    tiltakshaverFelt(
      "rolle",
      tiltakshaver.kontaktPersonKode == null
        ? null
        : oversettKode({
            t,
            kodeverk: "kontaktperson",
            kode: tiltakshaver.kontaktPersonKode,
          }),
    ),
    tiltakshaverFelt("identifikasjonsNr", tiltakshaver.identifikasjonsNr),
    tiltakshaverFelt("adresse", tiltakshaver.adresse),
    tiltakshaverFelt("bruksenhetsnr", tiltakshaver.bruksenhetsNr),
  ]
}

export function Tiltakshavere({ tiltakshavere }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.tiltakshavere"

  return (
    <PersonGrid title={t(`${translationKey}.title`)} tom={tom}>
      {tiltakshavere.map((tiltakshaver, index) => (
        <PersonCard
          key={String(index)}
          navn={tiltakshaver.navn ?? tom}
          erUtgatt={false}
          statuskode={null}
          utgattLabel={t(`${translationKey}.utgatt`)}
          felter={getTiltakshaverDetaljfelter(tiltakshaver, t)}
          tom={tom}
        />
      ))}
    </PersonGrid>
  )
}
