import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Utvalgskriterier } from "../../lib/schema/byggRapportSchema"

interface Props {
  subrapporterKriterier: Utvalgskriterier["subrapporter"]
}

export function SubrapporterKriterier({ subrapporterKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.subrapporter`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell scope="row" className="w-1/3">
              {t(`${uk}.subrapporter.etasjer`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(`${uk}.${subrapporterKriterier.etasjer ? "ja" : "nei"}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.bruksenheter`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(`${uk}.${subrapporterKriterier.bruksenheter ? "ja" : "nei"}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.tiltakshavere`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(`${uk}.${subrapporterKriterier.tiltakshavere ? "ja" : "nei"}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.kontaktpersoner`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${subrapporterKriterier.kontaktpersoner ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.hjemmelshavere`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${subrapporterKriterier.hjemmelshavere ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.subrapporter.kulturminner`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(`${uk}.${subrapporterKriterier.kulturminner ? "ja" : "nei"}`)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
