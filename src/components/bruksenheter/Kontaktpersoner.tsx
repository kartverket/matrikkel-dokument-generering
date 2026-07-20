import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bruksenhet } from "../../lib/schema/reports/bygg/bygg0011/index"
import { formatAdresse } from "../../lib/utils/formatAdresse"
import { formatDate } from "../../lib/utils/formatDate"
import { joinStrings } from "../../lib/utils/joinStrings"
import { KategoriSeksjon } from "./KategoriSeksjon"
import { PersonStatusTag } from "./PersonStatusTag"

interface Props {
  kontaktpersoner: Bruksenhet["kontaktpersoner"]
}

export function Kontaktpersoner({ kontaktpersoner }: Props) {
  const { i18n, t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.kontaktpersoner"
  const bruksenhetKey = "rapport.BYG0011.bruksenheter"
  const utgattLabel = t(`${translationKey}.utgatt`)

  return (
    <KategoriSeksjon
      title={t(`${translationKey}.title`)}
      emptyText={t(`${bruksenhetKey}.ingenKontaktpersoner`)}
      isEmpty={kontaktpersoner.length === 0}
    >
      <Table className="w-full">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t(`${translationKey}.navn`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${translationKey}.status`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${translationKey}.rolle`)}</Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.eierIdent`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.adresselinjer`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.kategori`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.gyldigFra`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {kontaktpersoner.map((kontaktperson) => (
            <Table.Row key={kontaktperson.eierIdent}>
              <Table.HeaderCell scope="row" className="text-kv-default">
                {kontaktperson.navn}
              </Table.HeaderCell>
              <Table.Cell>
                <PersonStatusTag
                  erUtgatt={kontaktperson.eierErUtgatt}
                  statuskode={kontaktperson.statuskode ?? null}
                  utgattLabel={utgattLabel}
                  tom={tom}
                />
              </Table.Cell>
              <Table.Cell>{kontaktperson.rolle}</Table.Cell>
              <Table.Cell className="tabular-nums">
                {kontaktperson.eierIdent}
              </Table.Cell>
              <Table.Cell>
                {formatAdresse(
                  [
                    kontaktperson.adresselinje1,
                    kontaktperson.adresselinje2,
                    kontaktperson.adresselinje3,
                  ],
                  kontaktperson.postnummeromradenr,
                  kontaktperson.postnummeromradenavn,
                  tom,
                )}
              </Table.Cell>
              <Table.Cell>
                {joinStrings(
                  [kontaktperson.kategorikode, kontaktperson.kontaktpersonKode],
                  " / ",
                  tom,
                )}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDate(i18n, kontaktperson.datofra, tom, {
                  dateStyle: "short",
                })}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </KategoriSeksjon>
  )
}
