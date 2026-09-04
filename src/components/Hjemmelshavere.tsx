import { useTranslation } from "react-i18next"
import { TableSection } from "./utils/TableSection.tsx"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

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

  const columns = [
    {
      key: "rolle",
      labelKey: t("rapport.BYG0011.hjemmelshavere.rolle"),
      render: (item: FlattenedPerson) =>
        item.eierforholdKode?.displayTekst || "-",
    },
    {
      key: "status",
      labelKey: t("rapport.BYG0011.hjemmelshavere.status"),
      render: (item: FlattenedPerson) =>
        item.personStatusKode?.displayTekst || "-",
    },
    {
      key: "eierident",
      labelKey: t("rapport.BYG0011.hjemmelshavere.fodselsnum"),
      render: (item: FlattenedPerson) => item.eierident,
    },
    {
      key: "navn",
      labelKey: t("rapport.BYG0011.hjemmelshavere.navn"),
      render: (item: FlattenedPerson) => item.navn || "-",
    },
    {
      key: "adresse",
      labelKey: t("rapport.BYG0011.hjemmelshavere.addresse"),
      render: (item: FlattenedPerson) => item.eierAdresse || "-",
    },
    {
      key: "bruksenhet",
      labelKey: t("rapport.BYG0011.hjemmelshavere.bruksenhet"),
      render: (item: FlattenedPerson) => item.bruksenhetsnummer || "-",
    },
    {
      key: "andel",
      labelKey: t("rapport.BYG0011.hjemmelshavere.andel"),
      render: (item: FlattenedPerson) =>
        item.teller && item.nevner ? `${item.teller}/${item.nevner}` : "-",
    },
  ]

  return (
    <TableSection
      title={t("rapport.BYG0011.hjemmelshavere.tittel")}
      items={hjemmelshaverList}
      columns={columns}
      rowKey={(item) => item.eierident ?? Math.random().toString()}
    />
  )
}
