import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"
import { formatAdresse } from "../../lib/utils/formatAdresse"
import { lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonCard } from "../PersonCard"
import { PersonGrid } from "../PersonGrid"

interface Props {
  hjemmelshavere: BruksenhetDetalj["hjemmelshavere"]
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
  tom: string,
) => {
  return [
    hjemmelshaverFelt("eierIdent", hjemmelshaver.eierIdent),
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
      { className: "col-span-2" },
    ),
    hjemmelshaverFelt("land", hjemmelshaver.land),
    hjemmelshaverFelt("gyldigFra", hjemmelshaver.datofra),
    hjemmelshaverFelt("gyldigTil", hjemmelshaver.datotil),
    hjemmelshaverFelt("kategori", hjemmelshaver.kategorikode),
  ]
}

export function Hjemmelshavere({ hjemmelshavere }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.hjemmelshavere"

  return (
    <PersonGrid
      title={t(`${translationKey}.title`)}
      tom={tom}
      className="grid-cols-2"
    >
      {hjemmelshavere.map((hjemmelshaver) => (
        <PersonCard
          key={hjemmelshaver.eierIdent}
          navn={hjemmelshaver.navn}
          erUtgatt={hjemmelshaver.eierErUtgatt}
          statuskode={hjemmelshaver.statuskode}
          utgattLabel={t(`${translationKey}.utgatt`)}
          felter={getHjemmelshaverDetaljfelter(hjemmelshaver, tom)}
          tom={tom}
        />
      ))}
    </PersonGrid>
  )
}
