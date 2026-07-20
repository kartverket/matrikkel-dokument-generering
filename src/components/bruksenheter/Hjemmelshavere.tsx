import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bruksenhet } from "../../lib/schema/reports/bygg/bygg0011/index"
import { formatAdresse } from "../../lib/utils/formatAdresse"
import { KategoriSeksjon } from "./KategoriSeksjon"
import { PersonStatusTag } from "./PersonStatusTag"

interface Props {
  hjemmelshavere: Bruksenhet["hjemmelshavere"]
}

type Hjemmelshaver = Props["hjemmelshavere"][number]

function formatAndel(hjemmelshaver: Hjemmelshaver, tom: string): string {
  if (
    hjemmelshaver.harAndel &&
    hjemmelshaver.andelTeller !== null &&
    hjemmelshaver.andelNevner !== null
  ) {
    return `${hjemmelshaver.andelTeller}/${hjemmelshaver.andelNevner}`
  }
  return tom
}

export function Hjemmelshavere({ hjemmelshavere }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.hjemmelshavere"
  const bruksenhetKey = "rapport.BYG0011.bruksenheter"
  const utgattLabel = t(`${translationKey}.utgatt`)

  return (
    <KategoriSeksjon
      title={t(`${translationKey}.title`)}
      emptyText={t(`${bruksenhetKey}.ingenHjemmelshavere`)}
      isEmpty={hjemmelshavere.length === 0}
    >
      <Table className="w-full">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t(`${translationKey}.navn`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${translationKey}.status`)}</Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.eierIdent`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.adresselinjer`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right">
              {t(`${translationKey}.andel`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {hjemmelshavere.map((hjemmelshaver) => (
            <Table.Row key={hjemmelshaver.eierIdent}>
              <Table.HeaderCell scope="row" className="text-kv-default">
                {hjemmelshaver.navn}
              </Table.HeaderCell>
              <Table.Cell>
                <PersonStatusTag
                  erUtgatt={hjemmelshaver.eierErUtgatt}
                  statuskode={hjemmelshaver.statuskode ?? null}
                  utgattLabel={utgattLabel}
                  tom={tom}
                />
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {hjemmelshaver.eierIdent}
              </Table.Cell>
              <Table.Cell>
                {formatAdresse(
                  [
                    hjemmelshaver.adresselinje1,
                    hjemmelshaver.adresselinje2,
                    hjemmelshaver.adresselinje3,
                  ],
                  hjemmelshaver.postnummer,
                  hjemmelshaver.poststed,
                  tom,
                )}
              </Table.Cell>
              <Table.Cell className="text-right tabular-nums">
                {formatAndel(hjemmelshaver, tom)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </KategoriSeksjon>
  )
}
