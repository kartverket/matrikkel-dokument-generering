import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { Section } from "../components/Section.tsx"
import type { Bygningsendring } from "../lib/schema/byggRapportSchema"
import { isFerdigstilt } from "../lib/utils/isFerdigstilt"
import { joinStrings } from "../lib/utils/joinStrings"

interface Props {
  index: number
  endring: Bygningsendring
}

export function Tiltakshavere({ index, endring }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const tiltakshavere = endring.tiltakshavere

  // Vises kun når bygget IKKE er ferdigstilt.
  if (tiltakshavere.length === 0 || isFerdigstilt(endring)) return null

  const th = "rapport.BYG0011.tiltakshavere"

  return (
    <Section index={index} title={t(`${th}.title`)}>
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
                  tom,
                )}
              </Table.Cell>
              <Table.Cell>
                {joinStrings(
                  [person.postnummeromradenr, person.postnummeromradenavn],
                  " ",
                  tom,
                )}
              </Table.Cell>
              <Table.Cell>{person.land ?? tom}</Table.Cell>
              <Table.Cell>{person.bruksenhetsnr ?? tom}</Table.Cell>
              <Table.Cell>{person.datofra ?? tom}</Table.Cell>
              <Table.Cell>
                {joinStrings(
                  [person.kategorikode, person.kontaktpersonKode],
                  " / ",
                  tom,
                )}
              </Table.Cell>
              <Table.Cell>
                {person.eierErUtgatt
                  ? t(`${th}.utgatt`)
                  : (person.statuskode ?? tom)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Section>
  )
}
