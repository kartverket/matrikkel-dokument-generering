import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { Aktoer } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonCard } from "../PersonCard"
import { PersonGrid } from "../PersonGrid"

interface Props {
  aktoer: Aktoer | undefined
}

const hjemmelshaverFelt = lagDetaljfeltBuilder("rapport.BYG0011.hjemmelshavere")

const getHjemmelshaverDetaljfelter = (aktoer: Aktoer, t: TFunction) => {
  return [
    hjemmelshaverFelt("identifikasjonsNr", aktoer.identifikasjonsNr),
    hjemmelshaverFelt("andel", aktoer.andel),
    hjemmelshaverFelt("adresse", aktoer.adresse),
    hjemmelshaverFelt("bruksenhetsnr", aktoer.bruksenhetsNr),
    hjemmelshaverFelt(
      "kategori",
      oversettKode({ t, kodeverk: "aktoer", kode: aktoer.aktoerKode }),
    ),
  ]
}

export function Hjemmelshavere({ aktoer }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.hjemmelshavere"

  return (
    <PersonGrid title={t(`${translationKey}.title`)} tom={tom}>
      {aktoer && (
        <PersonCard
          navn={aktoer.navn ?? tom}
          erUtgatt={aktoer.erAvdoed}
          statuskode={null}
          utgattLabel={t(`${translationKey}.utgatt`)}
          felter={getHjemmelshaverDetaljfelter(aktoer, t)}
          tom={tom}
        />
      )}
    </PersonGrid>
  )
}
