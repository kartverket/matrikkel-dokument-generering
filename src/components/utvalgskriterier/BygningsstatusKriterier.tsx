import { Heading, Table, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Utvalgskriterier } from "../../lib/schema/byggRapportSchema"

const dateFormatter = new Intl.DateTimeFormat("nb-NO")

interface Props {
  bygningsstatusKriterier: Utvalgskriterier["bygningsstatus"]
}

export function BygningsstatusKriterier({ bygningsstatusKriterier }: Props) {
  const { t } = useTranslation()
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
              {bygningsstatusKriterier.naavaerende.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {bygningsstatusKriterier.naavaerende.map((status) => (
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
              {t(`${uk}.felt.tidligere`)}
            </Table.HeaderCell>
            <Table.Cell>
              {bygningsstatusKriterier.tidligere.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {bygningsstatusKriterier.tidligere.map((status) => (
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
              {bygningsstatusKriterier.periodeFra
                ? dateFormatter.format(
                    new Date(bygningsstatusKriterier.periodeFra),
                  )
                : ikkeAngitt}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.periodeTil`)}
            </Table.HeaderCell>
            <Table.Cell>
              {bygningsstatusKriterier.periodeTil
                ? dateFormatter.format(
                    new Date(bygningsstatusKriterier.periodeTil),
                  )
                : ikkeAngitt}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
