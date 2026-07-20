import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { Tiltakshaver } from "../../lib/schema/reports/bygg/byg0011/aktoer.schema.ts"
import {
  formatAdresselinjer,
  formatPoststed,
} from "../../lib/utils/formatAdresse"
import { joinStrings } from "../../lib/utils/joinStrings"
import { lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonCard } from "../PersonCard"
import { PersonGrid } from "../PersonGrid"

interface Props {
  tiltakshavere: Tiltakshaver[]
}

const tiltakshaverFelt = lagDetaljfeltBuilder("rapport.BYG0011.tiltakshavere")

function getTiltakshaverDetaljfelter(
  tiltakshaver: Tiltakshaver,
  t: TFunction,
  tom: string,
) {
  return [
    tiltakshaverFelt("rolle", tiltakshaver.rolle),
    tiltakshaverFelt("identifikasjonsNr", tiltakshaver.identifikasjonsNr),
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
        [
          tiltakshaver.kategorikode == null
            ? null
            : oversettKode(t, "aktoer", tiltakshaver.kategorikode),
          tiltakshaver.kontaktpersonKode == null
            ? null
            : oversettKode(t, "kontaktperson", tiltakshaver.kontaktpersonKode),
        ],
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

  return (
    <PersonGrid title={t(`${translationKey}.title`)} tom={tom}>
      {tiltakshavere.map((tiltakshaver, index) => (
        <PersonCard
          key={String(index)}
          navn={tiltakshaver.navn}
          erUtgatt={tiltakshaver.eierErUtgatt}
          statuskode={tiltakshaver.statuskode ?? null}
          utgattLabel={t(`${translationKey}.utgatt`)}
          felter={getTiltakshaverDetaljfelter(tiltakshaver, t, tom)}
          tom={tom}
        />
      ))}
    </PersonGrid>
  )
}
