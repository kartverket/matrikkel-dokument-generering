import { useTranslation } from "react-i18next"
import type { Kontaktperson } from "../lib/schema/reports/bygg/shared/kontaktperson.schema.ts"
import { TableSection } from "./utils/TableSection.tsx"

interface Props {
  readonly kontaktpersoner: Array<Kontaktperson>
}

export function Kontaktpersoner({ kontaktpersoner }: Readonly<Props>) {
  const { t } = useTranslation()

  // Only show kontaktpersoner with valid eierident
  const validKontaktpersoner: (Kontaktperson & { eierident: string })[] =
    kontaktpersoner.filter(
      (item): item is Kontaktperson & { eierident: string } => !!item.eierident,
    )

  const columns = [
    {
      key: "rolle",
      labelKey: t("rapport.BYG0011.person.rolle"),
      render: (item: Kontaktperson) =>
        item.kontaktpersonKode?.displayTekst || "-",
    },
    {
      key: "eierident",
      labelKey: t("rapport.BYG0011.person.identifikasjonsNr"),
      render: (item: Kontaktperson) => item.eierident,
    },
    {
      key: "navn",
      labelKey: t("rapport.BYG0011.person.navn"),
      render: (item: Kontaktperson) => item.navn,
    },
    {
      key: "adresse",
      labelKey: t("rapport.BYG0011.person.adresse"),
      render: (item: Kontaktperson) => item.eierAdresse || "-",
    },
    {
      key: "bruksenhet",
      labelKey: t("rapport.BYG0011.kontaktpersoner.bruksenhet"),
      render: (item: Kontaktperson) => item.bruksenhetsnummer || "-",
    },
  ]

  return (
    <TableSection
      title={t("rapport.BYG0011.kontaktpersoner.tittel")}
      items={validKontaktpersoner}
      columns={columns}
      rowKey={(item) => item.eierident}
    />
  )
}
