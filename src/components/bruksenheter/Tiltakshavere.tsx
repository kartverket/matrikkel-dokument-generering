import { Card, Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Tiltakshaver } from "../../lib/schema/byggRapportSchema"
import {
  formatAdresselinjer,
  formatPoststed,
} from "../../lib/utils/formatAdresse"
import { joinStrings } from "../../lib/utils/joinStrings"
import { Detaljgrid, lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonStatusTag } from "./PersonStatusTag"

interface Props {
  tiltakshavere: Array<{
    endringId: number
    tiltakshaver: Tiltakshaver
  }>
}

const tiltakshaverFelt = lagDetaljfeltBuilder("rapport.BYG0011.tiltakshavere")

function getTiltakshaverDetaljfelter(tiltakshaver: Tiltakshaver, tom: string) {
  return [
    tiltakshaverFelt("rolle", tiltakshaver.rolle),
    tiltakshaverFelt("eierIdent", tiltakshaver.eierIdent),
    tiltakshaverFelt(
      "adresselinjer",
      formatAdresselinjer(
        [
          tiltakshaver.adresselinje1,
          tiltakshaver.adresselinje2,
          tiltakshaver.adresselinje3,
        ],
        tom,
      ),
      { className: "col-span-2" },
    ),
    tiltakshaverFelt(
      "poststed",
      formatPoststed(
        tiltakshaver.postnummeromradenr,
        tiltakshaver.postnummeromradenavn,
        tom,
      ),
    ),
    tiltakshaverFelt("land", tiltakshaver.land),
    tiltakshaverFelt("bruksenhetsnr", tiltakshaver.bruksenhetsnr),
    tiltakshaverFelt("gyldigFra", tiltakshaver.datofra),
    tiltakshaverFelt(
      "kategori",
      joinStrings(
        [tiltakshaver.kategorikode, tiltakshaver.kontaktpersonKode],
        " / ",
        tom,
      ),
    ),
  ]
}

export function Tiltakshavere({ tiltakshavere }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.tiltakshavere"
  const harTiltakshavere = tiltakshavere.length > 0

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>
      {harTiltakshavere ? (
        <div className="grid grid-cols-2 gap-3">
          {tiltakshavere.map(({ endringId, tiltakshaver }) => (
            <Card key={`${endringId}-${tiltakshaver.eierIdent}`}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <Paragraph className="font-semibold">
                  {tiltakshaver.navn}
                </Paragraph>
                <PersonStatusTag
                  erUtgatt={tiltakshaver.eierErUtgatt}
                  statuskode={tiltakshaver.statuskode}
                  utgattLabel={t(`${translationKey}.utgatt`)}
                  tom={tom}
                />
              </div>
              <Detaljgrid
                felter={getTiltakshaverDetaljfelter(tiltakshaver, tom)}
                tom={tom}
              />
            </Card>
          ))}
        </div>
      ) : (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      )}
    </div>
  )
}
