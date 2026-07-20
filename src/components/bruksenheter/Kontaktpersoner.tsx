import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { Bruksenhet } from "../../lib/schema/reports/bygg/byg0011/bruksenhet.schema"
import { formatAdresse } from "../../lib/utils/formatAdresse"
import { joinStrings } from "../../lib/utils/joinStrings"
import { lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonCard } from "../PersonCard"
import { PersonGrid } from "../PersonGrid"

interface Props {
  kontaktpersoner: Bruksenhet["kontaktpersoner"]
}

type Kontaktperson = Props["kontaktpersoner"][number]
const kontaktpersonFelt = lagDetaljfeltBuilder(
  "rapport.BYG0011.kontaktpersoner",
)

function getKontaktpersonDetaljfelter(
  kontaktperson: Kontaktperson,
  t: TFunction,
  tom: string,
) {
  return [
    kontaktpersonFelt("rolle", kontaktperson.rolle),
    kontaktpersonFelt("identifikasjonsNr", kontaktperson.identifikasjonsNr),
    kontaktpersonFelt(
      "kategori",
      joinStrings(
        [
          kontaktperson.kategorikode == null
            ? null
            : oversettKode(t, "aktoer", kontaktperson.kategorikode),
          kontaktperson.kontaktpersonKode == null
            ? null
            : oversettKode(t, "kontaktperson", kontaktperson.kontaktpersonKode),
        ],
        " / ",
        tom,
      ),
    ),
    kontaktpersonFelt(
      "adresselinjer",
      formatAdresse(
        [
          kontaktperson.adresselinje1,
          kontaktperson.adresselinje2,
          kontaktperson.adresselinje3,
        ],
        kontaktperson.postnummeromradenr,
        kontaktperson.postnummeromradenavn,
        tom,
      ),
    ),
    kontaktpersonFelt("land", kontaktperson.land),
    kontaktpersonFelt("gyldigFra", kontaktperson.datofra),
  ]
}

export function Kontaktpersoner({ kontaktpersoner }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.kontaktpersoner"

  return (
    <PersonGrid title={t(`${translationKey}.title`)} tom={tom}>
      {kontaktpersoner.map((kontaktperson) => (
        <PersonCard
          key={kontaktperson.identifikasjonsNr}
          navn={kontaktperson.navn}
          erUtgatt={kontaktperson.eierErUtgatt}
          statuskode={kontaktperson.statuskode ?? null}
          utgattLabel={t(`${translationKey}.utgatt`)}
          felter={getKontaktpersonDetaljfelter(kontaktperson, t, tom)}
          tom={tom}
        />
      ))}
    </PersonGrid>
  )
}
