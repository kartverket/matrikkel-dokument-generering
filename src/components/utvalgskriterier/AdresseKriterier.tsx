import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"

interface Props {
  adresseKriterier: NonNullable<Utvalgskriterier>["adresse"]
}

export function AdresseKriterier({ adresseKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const ikkeAngitt = t(`${uk}.ikkeAngitt`)

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.adresse`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell scope="row" className="w-1/3">
              {t(`${uk}.felt.adressekode`)}
            </Table.HeaderCell>
            <Table.Cell>
              {adresseKriterier?.adressekode ?? ikkeAngitt}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.bruksenhetsnr`)}
            </Table.HeaderCell>
            <Table.Cell>
              {adresseKriterier?.bruksenhetsnr ?? ikkeAngitt}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.adressenavn`)}
            </Table.HeaderCell>
            <Table.Cell>
              {adresseKriterier?.adressenavn ?? ikkeAngitt}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.nr`)}
            </Table.HeaderCell>
            <Table.Cell>{adresseKriterier?.nr ?? ikkeAngitt}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.bokstav`)}
            </Table.HeaderCell>
            <Table.Cell>{adresseKriterier?.bokstav ?? ikkeAngitt}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.utenBokstav`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(`${uk}.${adresseKriterier?.utenBokstav ? "ja" : "nei"}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.tilleggsnavn`)}
            </Table.HeaderCell>
            <Table.Cell>
              {adresseKriterier?.tilleggsnavn ?? ikkeAngitt}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
