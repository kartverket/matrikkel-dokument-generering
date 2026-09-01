import { useTranslation } from "react-i18next"
import type { Hjemmelshaver } from "../lib/schema/reports/bygg/shared/eierforholdSchema.ts"
import { TableSection } from "./utils/TableSection.tsx"

interface Props {
  readonly hjemmelshavere: Array<Hjemmelshaver>
}

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

  const hjemmelshaverList: (FlattenedPerson & { eierident: string })[] =
    hjemmelshavere
      .flatMap((eierforhold) => eierforhold.matrikkelenhetEiereInfos || [])
      .flatMap((matrikkel) => matrikkel.personEierforhold || [])
      .filter(
        (person): person is FlattenedPerson & { eierident: string } =>
          !!person.eierident,
      )

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
      rowKey={(item) => item.eierident}
    />
  )
}
