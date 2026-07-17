import { Heading, Table, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Utvalgskriterier } from "../../lib/schema/reports/BYG0011"

interface Props {
  bygningKriterier: Utvalgskriterier["bygning"]
}

export function BygningKriterier({ bygningKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const ikkeAngitt = t(`${uk}.ikkeAngitt`)

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.bygning`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell scope="row" className="w-1/3">
              {t(`${uk}.felt.bygningsnr`)}
            </Table.HeaderCell>
            <Table.Cell>{bygningKriterier.bygningsnr ?? ikkeAngitt}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.lopenr`)}
            </Table.HeaderCell>
            <Table.Cell>{bygningKriterier.lopenr ?? ikkeAngitt}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.bygningstyper`)}
            </Table.HeaderCell>
            <Table.Cell>
              {bygningKriterier.bygningstyper.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {bygningKriterier.bygningstyper.map(({ kode, navn }) => (
                    <Tag key={kode} data-color="accent" variant="outline">
                      {kode} – {navn}
                    </Tag>
                  ))}
                </span>
              ) : (
                ikkeAngitt
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
