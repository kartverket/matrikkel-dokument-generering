import { Card, Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"
import { formatAdresse } from "../../lib/utils/formatAdresse"
import { Detaljgrid, lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonStatusTag } from "./PersonStatusTag"

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
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>
      {hjemmelshavere.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {hjemmelshavere.map((hjemmelshaver) => (
            <Card key={hjemmelshaver.eierIdent}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <Paragraph className="font-semibold">
                  {hjemmelshaver.navn}
                </Paragraph>
                <PersonStatusTag
                  erUtgatt={hjemmelshaver.eierErUtgatt}
                  statuskode={hjemmelshaver.statuskode}
                  utgattLabel={t(`${translationKey}.utgatt`)}
                  tom={tom}
                />
              </div>

              <Detaljgrid
                felter={getHjemmelshaverDetaljfelter(hjemmelshaver, tom)}
                tom={tom}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
