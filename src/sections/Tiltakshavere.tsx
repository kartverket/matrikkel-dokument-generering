import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningsendring } from "../lib/schema/byggRapportSchema"
import { isFerdigstilt } from "../lib/utils/isFerdigstilt"
import { joinStrings } from "../lib/utils/joinStrings"

interface Props {
  endring: Bygningsendring
}

export function Tiltakshavere({ endring }: Props) {
  const { t } = useTranslation()
  const tiltakshavere = endring.tiltakshavere

  // Vises kun når bygget IKKE er ferdigstilt.
  if (tiltakshavere.length === 0 || isFerdigstilt(endring)) return null

  const th = "rapport.BYG0011.tiltakshavere"

  return (
    <section>
      <h2>{t(`${th}.title`)}</h2>
      <Table zebra border>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t(`${th}.rolle`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${th}.eierIdent`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${th}.navn`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${th}.adresselinjer`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${th}.poststed`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${th}.land`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${th}.bruksenhetsnr`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${th}.gyldigFra`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${th}.kategori`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${th}.status`)}</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {tiltakshavere.map((person) => (
            <Table.Row key={person.eierIdent}>
              <Table.Cell>{person.rolle}</Table.Cell>
              <Table.Cell>{person.eierIdent}</Table.Cell>
              <Table.Cell>{person.navn}</Table.Cell>
              <Table.Cell>
                {joinStrings(
                  [
                    person.adresselinje1,
                    person.adresselinje2,
                    person.adresselinje3,
                  ],
                  ", ",
                )}
              </Table.Cell>
              <Table.Cell>
                {joinStrings(
                  [person.postnummeromradenr, person.postnummeromradenavn],
                  " ",
                )}
              </Table.Cell>
              <Table.Cell>{person.land ?? "-"}</Table.Cell>
              <Table.Cell>{person.bruksenhetsnr ?? "-"}</Table.Cell>
              <Table.Cell>{person.datofra ?? "-"}</Table.Cell>
              <Table.Cell>
                {joinStrings(
                  [person.kategorikode, person.kontaktpersonKode],
                  " / ",
                )}
              </Table.Cell>
              <Table.Cell>
                {person.eierErUtgatt
                  ? t(`${th}.utgatt`)
                  : (person.statuskode ?? "-")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}
