import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { Aktor } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonCard } from "../PersonCard"
import { PersonGrid } from "../PersonGrid"

interface Props {
  aktor: Aktor | undefined
}

const hjemmelshaverFelt = lagDetaljfeltBuilder("rapport.BYG0011.hjemmelshavere")

const getHjemmelshaverDetaljfelter = (aktor: Aktor, t: TFunction) => {
  return [
    hjemmelshaverFelt("identifikasjonsNr", aktor.identifikasjonsNr),
    hjemmelshaverFelt("andel", aktor.andel),
    hjemmelshaverFelt("adresse", aktor.adresse),
    hjemmelshaverFelt("bruksenhetsnr", aktor.bruksenhetsNr),
    hjemmelshaverFelt(
      "kategori",
      oversettKode({ t, kodeverk: "aktor", kode: aktor.aktorKode }),
    ),
  ]
}

export function Hjemmelshavere({ aktor }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.hjemmelshavere"

  return (
    <PersonGrid title={t(`${translationKey}.title`)} tom={tom}>
      {aktor && (
        <PersonCard
          navn={aktor.navn ?? tom}
          erUtgatt={aktor.erAvdoed}
          statuskode={null}
          utgattLabel={t(`${translationKey}.utgatt`)}
          felter={getHjemmelshaverDetaljfelter(aktor, t)}
          tom={tom}
        />
      )}
    </PersonGrid>
  )
}
