import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { Section } from "../components/Section.tsx"
import type { Hjemmelshaver } from "../lib/schema/byggRapportSchema"
import { joinStrings } from "../lib/utils/joinStrings"

interface Props {
  index: number
  hjemmelshavere?: Hjemmelshaver[] | null
}

export function Hjemmelshavere({ index, hjemmelshavere }: Props) {
  const { t } = useTranslation()

  if (!hjemmelshavere || hjemmelshavere.length === 0) return null

  const kp = "rapport.BYG0011.hjemmelshavere"

  return (
    <Section index={index} title={t(`${kp}.title`)}>
      <Table zebra border>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t(`${kp}.eierIdent`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.navn`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.andel`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${kp}.eierforhold`)}</Table.HeaderCell>
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
          {hjemmelshavere.map((hh) => (
            <Table.Row key={hh.eierIdent}>
              <Table.Cell>{hh.eierIdent}</Table.Cell>
              <Table.Cell>{hh.navn}</Table.Cell>
              <Table.Cell>
                {hh.harAndel ? `${hh.andelTeller}/${hh.andelNevner}` : "-"}
              </Table.Cell>
              <Table.Cell>
                {hh.erSelveier ? t(`${kp}.erSelveier`) : t(`${kp}.harAndel`)}
              </Table.Cell>
              <Table.Cell>
                {joinStrings(
                  [hh.adresselinje1, hh.adresselinje2, hh.adresselinje3],
                  ", ",
                )}
              </Table.Cell>
              <Table.Cell>
                {joinStrings([hh.postnummer, hh.poststed], " ")}
              </Table.Cell>
              <Table.Cell>
                {joinStrings(
                  [
                    hh.erSelveier ? "Ja" : "Nei",
                    hh.harAndel ? "Har andel" : "Har ikke andel",
                  ],
                  " ",
                )}
              </Table.Cell>
              <Table.Cell>{hh.land ?? "-"}</Table.Cell>
              <Table.Cell>{hh.bruksenhetsnr ?? "-"}</Table.Cell>
              <Table.Cell>{hh.datofra ?? "-"}</Table.Cell>
              <Table.Cell>{hh.kategorikode}</Table.Cell>
              <Table.Cell>
                {hh.eierErUtgatt ? t(`${kp}.utgatt`) : (hh.statuskode ?? "-")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Section>
  )
}
