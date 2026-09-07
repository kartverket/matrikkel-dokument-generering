import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { SectionTitle } from "./utils/SectionTitle.tsx"

type Props = Pick<Bygning, "hjemmelshavere">

interface FlattenedPerson {
  eierident?: string
  eierforholdKode?: { displayTekst?: string }
  personStatusKode?: { displayTekst?: string }
  navn?: string
  eierAdresse?: string
  bruksenhetsnummer?: string
  teller?: number
  nevner?: number
}

export function Hjemmelshavere({ hjemmelshavere }: Readonly<Props>) {
  const { t } = useTranslation()

  const hjemmelshaverList: FlattenedPerson[] =
    hjemmelshavere
      .flatMap((eierforhold) => eierforhold.matrikkelenhetEiereInfos || [])
      .flatMap((matrikkel) => matrikkel.personEierforhold || [])
      .map((person) => ({
        eierident: person.eierident,
        eierforholdKode: person.eierforholdKode,
        personStatusKode: person.personStatusKode,
        navn: person.navn,
        eierAdresse: person.eierAdresse,
        bruksenhetsnummer: person.bruksenhetsnummer,
        teller: person.teller,
        nevner: person.nevner,
      })) ?? []

  if (!hjemmelshaverList.length) return null

  return (
    <section className="space-y-2">
      <SectionTitle>{t("rapport.BYG0011.hjemmelshavere.tittel")}</SectionTitle>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className="text-xs">
              {t("rapport.BYG0011.hjemmelshavere.rolle")}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t("rapport.BYG0011.hjemmelshavere.status")}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t("rapport.BYG0011.hjemmelshavere.fodselsnum")}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t("rapport.BYG0011.hjemmelshavere.navn")}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t("rapport.BYG0011.hjemmelshavere.addresse")}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t("rapport.BYG0011.hjemmelshavere.bruksenhet")}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t("rapport.BYG0011.hjemmelshavere.andel")}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {hjemmelshaverList.map((item) => (
            <Table.Row key={item.eierident ?? Math.random().toString()}>
              <Table.Cell className="border-b-0! text-xs">
                {item.eierforholdKode?.displayTekst || "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {item.personStatusKode?.displayTekst || "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {item.eierident}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {item.navn || "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {item.eierAdresse || "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {item.bruksenhetsnummer || "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {item.teller && item.nevner
                  ? `${item.teller}/${item.nevner}`
                  : "-"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}
