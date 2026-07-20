import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { Bruksenhet } from "../../lib/schema/reports/bygg/byg0011/bruksenhet.schema"
import { formatAdresse } from "../../lib/utils/formatAdresse"
import { lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonCard } from "../PersonCard"
import { PersonGrid } from "../PersonGrid"

interface Props {
  hjemmelshavere: Bruksenhet["hjemmelshavere"]
}

const hjemmelshaverFelt = lagDetaljfeltBuilder("rapport.BYG0011.hjemmelshavere")

const getAndel = (hjemmelshaver: Props["hjemmelshavere"][number]) => {
  if (
    hjemmelshaver.harAndel &&
    hjemmelshaver.andelTeller !== null &&
    hjemmelshaver.andelNevner !== null
  ) {
    return `${hjemmelshaver.andelTeller}/${hjemmelshaver.andelNevner}`
  }
  return null
}

const getHjemmelshaverDetaljfelter = (
  hjemmelshaver: Props["hjemmelshavere"][number],
  t: TFunction,
  tom: string,
) => {
  return [
    hjemmelshaverFelt("identifikasjonsNr", hjemmelshaver.identifikasjonsNr),
    hjemmelshaverFelt("andel", getAndel(hjemmelshaver)),
    hjemmelshaverFelt(
      "adresselinjer",
      formatAdresse(
        [
          hjemmelshaver.adresselinje1,
          hjemmelshaver.adresselinje2,
          hjemmelshaver.adresselinje3,
        ],
        hjemmelshaver.postnummer,
        hjemmelshaver.poststed,
        tom,
      ),
    ),
    hjemmelshaverFelt("land", hjemmelshaver.land),
    hjemmelshaverFelt("gyldigFra", hjemmelshaver.datofra),
    hjemmelshaverFelt("gyldigTil", hjemmelshaver.datotil),
    hjemmelshaverFelt(
      "kategori",
      hjemmelshaver.kategorikode == null
        ? null
        : oversettKode(t, "aktoer", hjemmelshaver.kategorikode),
    ),
  ]
}

export function Hjemmelshavere({ hjemmelshavere }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.hjemmelshavere"

  return (
    <PersonGrid title={t(`${translationKey}.title`)} tom={tom}>
      {hjemmelshavere.map((hjemmelshaver) => (
        <PersonCard
          key={hjemmelshaver.identifikasjonsNr}
          navn={hjemmelshaver.navn}
          erUtgatt={hjemmelshaver.eierErUtgatt}
          statuskode={hjemmelshaver.statuskode ?? null}
          utgattLabel={t(`${translationKey}.utgatt`)}
          felter={getHjemmelshaverDetaljfelter(hjemmelshaver, t, tom)}
          tom={tom}
        />
      ))}
    </PersonGrid>
  )
}
