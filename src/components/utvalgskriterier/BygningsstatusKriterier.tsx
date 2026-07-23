import { Heading, Table, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { formatDate } from "../../lib/utils/formatDate"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  bygningsstatusKriterier: NonNullable<Utvalgskriterier>["bygningsstatus"]
}

export function BygningsstatusKriterier({ bygningsstatusKriterier }: Props) {
  const { i18n, t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!harAngittVerdi(bygningsstatusKriterier)) return null

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.bygningsstatus`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          {erAngitt(bygningsstatusKriterier?.naavaerende) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.felt.naavaerende`)}
              </Table.HeaderCell>
              <Table.Cell>
                <span className="flex flex-wrap gap-2">
                  {bygningsstatusKriterier.naavaerende.map((status) => (
                    <Tag key={status} data-color="success" variant="outline">
                      {oversettKode({
                        t,
                        kodeverk: "bygningsstatus",
                        kode: status,
                      })}
                    </Tag>
                  ))}
                </span>
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(bygningsstatusKriterier?.tidligere) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.felt.tidligere`)}
              </Table.HeaderCell>
              <Table.Cell>
                <span className="flex flex-wrap gap-2">
                  {bygningsstatusKriterier.tidligere.map((status) => (
                    <Tag key={status} data-color="accent" variant="outline">
                      {oversettKode({
                        t,
                        kodeverk: "bygningsstatus",
                        kode: status,
                      })}
                    </Tag>
                  ))}
                </span>
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(bygningsstatusKriterier?.periodeFra) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.felt.periodeFra`)}
              </Table.HeaderCell>
              <Table.Cell>
                {formatDate(i18n, bygningsstatusKriterier.periodeFra)}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(bygningsstatusKriterier?.periodeTil) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.felt.periodeTil`)}
              </Table.HeaderCell>
              <Table.Cell>
                {formatDate(i18n, bygningsstatusKriterier.periodeTil)}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </section>
  )
}
