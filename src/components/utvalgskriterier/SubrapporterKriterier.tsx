import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"

interface Props {
  subrapporterKriterier: NonNullable<Utvalgskriterier>["subrapporter"]
}

export function SubrapporterKriterier({ subrapporterKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <section>
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.subrapporter.tittel`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell scope="row" className="w-1/3">
              {t(`${uk}.subrapporter.inkluderEtasjer`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${subrapporterKriterier?.inkluderEtasjer ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.inkluderBruksenheter`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${subrapporterKriterier?.inkluderBruksenheter ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.inkluderTiltakshavere`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${subrapporterKriterier?.inkluderTiltakshavere ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.inkluderKontaktpersoner`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${subrapporterKriterier?.inkluderKontaktpersoner ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.inkluderHjemmelshavere`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${subrapporterKriterier?.inkluderHjemmelshavere ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.inkluderKulturminner`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${subrapporterKriterier?.inkluderKulturminner ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
