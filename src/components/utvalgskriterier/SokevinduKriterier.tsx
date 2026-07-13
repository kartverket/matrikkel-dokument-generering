import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Utvalgskriterier } from "../../lib/schema/byggRapportSchema"

const numberFormatter = new Intl.NumberFormat("nb-NO", {
  maximumFractionDigits: 2,
})

interface Props {
  sokevinduKriterier: Utvalgskriterier["sokevindu"]
}

export function SokevinduKriterier({ sokevinduKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.sokevindu`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell scope="row" className="w-1/3">
              {t(`${uk}.felt.nedreVenstre`)} – {t(`${uk}.felt.ost`)}
            </Table.HeaderCell>
            <Table.Cell>
              {numberFormatter.format(sokevinduKriterier.nedreVenstre.ost)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.nedreVenstre`)} – {t(`${uk}.felt.nord`)}
            </Table.HeaderCell>
            <Table.Cell>
              {numberFormatter.format(sokevinduKriterier.nedreVenstre.nord)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.ovreHoeyre`)} – {t(`${uk}.felt.ost`)}
            </Table.HeaderCell>
            <Table.Cell>
              {numberFormatter.format(sokevinduKriterier.ovreHoeyre.ost)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.ovreHoeyre`)} – {t(`${uk}.felt.nord`)}
            </Table.HeaderCell>
            <Table.Cell>
              {numberFormatter.format(sokevinduKriterier.ovreHoeyre.nord)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
