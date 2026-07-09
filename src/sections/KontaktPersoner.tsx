import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { Section } from "../components/Section"
import type { Kontaktperson } from "../lib/schema/byggRapportSchema"

interface Props {
  kontaktpersoner?: Kontaktperson[] | null
}

const DASH = "–"

function join(parts: (string | null | undefined)[], separator: string): string {
  const value = parts.filter((p) => p != null && p !== "").join(separator)
  return value.length > 0 ? value : DASH
}

export function KontaktPersoner({ kontaktpersoner }: Props) {
  const { t } = useTranslation()

  if (!kontaktpersoner || kontaktpersoner.length === 0) return null

  const kp = "rapport.BYG0011.kontaktpersoner"

  return (
    <Section title={t(`${kp}.title`)}>
      <Table zebra border>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t(`${kp}.rolle`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.eierIdent`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.navn`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.adresselinjer`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.poststed`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.land`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.bruksenhetsnr`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.gyldigFra`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.kategori`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.status`)}</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {kontaktpersoner.map((person, i) => (
            <Table.Row key={`${person.eierIdent}-${i}`}>
              <Table.Cell>{person.rolle}</Table.Cell>
              <Table.Cell>{person.eierIdent}</Table.Cell>
              <Table.Cell>{person.navn}</Table.Cell>
              <Table.Cell>
                {join(
                  [
                    person.adresselinje1,
                    person.adresselinje2,
                    person.adresselinje3,
                  ],
                  ", ",
                )}
              </Table.Cell>
              <Table.Cell>
                {join(
                  [person.postnummeromradenr, person.postnummeromradenavn],
                  " ",
                )}
              </Table.Cell>
              <Table.Cell>{person.land ?? DASH}</Table.Cell>
              <Table.Cell>{person.bruksenhetsnr ?? DASH}</Table.Cell>
              <Table.Cell>{person.datofra ?? DASH}</Table.Cell>
              <Table.Cell>
                {join([person.kategorikode, person.kontaktpersonKode], " / ")}
              </Table.Cell>
              <Table.Cell>
                {person.eierErUtgatt
                  ? t(`${kp}.utgatt`)
                  : (person.statuskode ?? DASH)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Section>
  )
}
