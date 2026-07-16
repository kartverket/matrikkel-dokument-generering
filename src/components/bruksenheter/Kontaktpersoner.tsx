import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"
import { formatAdresse } from "../../lib/utils/formatAdresse"
import { joinStrings } from "../../lib/utils/joinStrings"
import { Detaljgrid, lagDetaljfeltBuilder } from "../Detaljfelt"
import { PersonStatusTag } from "./PersonStatusTag"

interface Props {
  kontaktpersoner: BruksenhetDetalj["kontaktpersoner"]
}

type Kontaktperson = Props["kontaktpersoner"][number]
const kontaktpersonFelt = lagDetaljfeltBuilder(
  "rapport.BYG0011.kontaktpersoner",
)

function getKontaktpersonDetaljfelter(
  kontaktperson: Kontaktperson,
  tom: string,
) {
  return [
    kontaktpersonFelt("rolle", kontaktperson.rolle),
    kontaktpersonFelt("eierIdent", kontaktperson.eierIdent),
    kontaktpersonFelt(
      "kategori",
      joinStrings(
        [kontaktperson.kategorikode, kontaktperson.kontaktpersonKode],
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
      { className: "col-span-2" },
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
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>

      {kontaktpersoner.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <div className="flex flex-col gap-3">
          {kontaktpersoner.map((kontaktperson) => (
            <div
              key={kontaktperson.eierIdent}
              className="rounded-md border border-kv-border bg-kv-gray p-4"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <Paragraph className="font-semibold">
                  {kontaktperson.navn}
                </Paragraph>
                <PersonStatusTag
                  erUtgatt={kontaktperson.eierErUtgatt}
                  statuskode={kontaktperson.statuskode}
                  utgattLabel={t(`${translationKey}.utgatt`)}
                  tom={tom}
                />
              </div>
              <Detaljgrid
                felter={getKontaktpersonDetaljfelter(kontaktperson, tom)}
                tom={tom}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
