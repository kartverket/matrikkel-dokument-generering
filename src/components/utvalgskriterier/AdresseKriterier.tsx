import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  adresseKriterier: NonNullable<Utvalgskriterier>["adresse"]
}

export function AdresseKriterier({ adresseKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!harAngittVerdi(adresseKriterier)) return null

  return (
    <section>
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.adresse.tittel`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          {erAngitt(adresseKriterier?.adresseKode) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.adresse.adresseKode`)}
              </Table.HeaderCell>
              <Table.Cell>{adresseKriterier.adresseKode}</Table.Cell>
            </Table.Row>
          )}
          {erAngitt(adresseKriterier?.bruksenhetsNr) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.adresse.bruksenhetsNr`)}
              </Table.HeaderCell>
              <Table.Cell>{adresseKriterier.bruksenhetsNr}</Table.Cell>
            </Table.Row>
          )}
          {erAngitt(adresseKriterier?.adresseNavn) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.adresse.adresseNavn`)}
              </Table.HeaderCell>
              <Table.Cell>{adresseKriterier.adresseNavn}</Table.Cell>
            </Table.Row>
          )}
          {erAngitt(adresseKriterier?.adresseNr) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.adresse.adresseNr`)}
              </Table.HeaderCell>
              <Table.Cell>{adresseKriterier.adresseNr}</Table.Cell>
            </Table.Row>
          )}
          {erAngitt(adresseKriterier?.adresseBokstav) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.adresse.adresseBokstav`)}
              </Table.HeaderCell>
              <Table.Cell>{adresseKriterier.adresseBokstav}</Table.Cell>
            </Table.Row>
          )}
          {erAngitt(adresseKriterier?.utenBokstav) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.adresse.utenBokstav`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(`${uk}.${adresseKriterier.utenBokstav ? "ja" : "nei"}`)}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(adresseKriterier?.adresseTilleggsNavn) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.adresse.adresseTilleggsNavn`)}
              </Table.HeaderCell>
              <Table.Cell>{adresseKriterier.adresseTilleggsNavn}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </section>
  )
}
