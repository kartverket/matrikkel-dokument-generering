import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  subrapporterKriterier: NonNullable<Utvalgskriterier>["subrapporter"]
}

export function SubrapporterKriterier({ subrapporterKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!harAngittVerdi(subrapporterKriterier)) return null

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.subrapporter`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          {erAngitt(subrapporterKriterier?.inkluderEtasjer) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.subrapporter.etasjer`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${subrapporterKriterier.inkluderEtasjer ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(subrapporterKriterier?.inkluderBruksenheter) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.subrapporter.bruksenheter`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${subrapporterKriterier.inkluderBruksenheter ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(subrapporterKriterier?.inkluderTiltakshavere) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.subrapporter.tiltakshavere`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${subrapporterKriterier.inkluderTiltakshavere ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(subrapporterKriterier?.inkluderKontaktpersoner) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.subrapporter.kontaktpersoner`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${subrapporterKriterier.inkluderKontaktpersoner ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(subrapporterKriterier?.inkluderHjemmelshavere) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.subrapporter.hjemmelshavere`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${subrapporterKriterier.inkluderHjemmelshavere ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(subrapporterKriterier?.inkluderKulturminner) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.subrapporter.kulturminner`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${subrapporterKriterier.inkluderKulturminner ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </section>
  )
}
