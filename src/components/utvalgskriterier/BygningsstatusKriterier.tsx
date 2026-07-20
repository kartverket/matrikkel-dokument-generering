import { Heading, Table, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { formatDate } from "../../lib/utils/formatDate"

interface Props {
  bygningsstatusKriterier: NonNullable<Utvalgskriterier>["bygningsstatus"]
}

export function BygningsstatusKriterier({ bygningsstatusKriterier }: Props) {
  const { i18n, t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  const ikkeAngitt = t(`${uk}.ikkeAngitt`)

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.bygningsstatus`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell scope="row" className="w-1/3">
              {t(`${uk}.felt.naavaerende`)}
            </Table.HeaderCell>
            <Table.Cell>
              {bygningsstatusKriterier?.naavaerende &&
              bygningsstatusKriterier.naavaerende.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {bygningsstatusKriterier?.naavaerende?.map((status) => (
                    <Tag key={status} data-color="success" variant="outline">
                      {status}
                    </Tag>
                  ))}
                </span>
              ) : (
                ikkeAngitt
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.tidligere`)}
            </Table.HeaderCell>
            <Table.Cell>
              {bygningsstatusKriterier?.tidligere &&
              bygningsstatusKriterier.tidligere.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {bygningsstatusKriterier?.tidligere?.map((status) => (
                    <Tag key={status} data-color="accent" variant="outline">
                      {status}
                    </Tag>
                  ))}
                </span>
              ) : (
                ikkeAngitt
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.periodeFra`)}
            </Table.HeaderCell>
            <Table.Cell>
              {formatDate(
                i18n,
                bygningsstatusKriterier?.periodeFra,
                ikkeAngitt,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.periodeTil`)}
            </Table.HeaderCell>
            <Table.Cell>
              {formatDate(
                i18n,
                bygningsstatusKriterier?.periodeTil,
                ikkeAngitt,
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
