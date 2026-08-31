import { useTranslation } from "react-i18next"
import type { Kontaktperson } from "../lib/schema/reports/bygg/shared/kontaktperson.schema.ts"
import { TableSection } from "./utils/TableSection.tsx"

interface Props {
  readonly tiltakshavere: Array<Kontaktperson>
}

export function Tiltakshavere({ tiltakshavere }: Readonly<Props>) {
  const { t } = useTranslation()

  // Only show tiltakshavere with valid eierident
  const validTiltakshavere: (Kontaktperson & { eierident: string })[] =
    tiltakshavere.filter(
      (item): item is Kontaktperson & { eierident: string } => !!item.eierident,
    )

  const columns = [
    {
      key: "rolle",
      labelKey: t("rapport.BYG0011.tiltakshavere.rolle"),
      render: (item: Kontaktperson) =>
        item.kontaktpersonKode?.displayTekst || "-",
    },
    {
      key: "eierident",
      labelKey: t("rapport.BYG0011.tiltakshavere.fodselsnum"),
      render: (item: Kontaktperson) => item.eierident,
    },
    {
      key: "navn",
      labelKey: t("rapport.BYG0011.tiltakshavere.navn"),
      render: (item: Kontaktperson) => item.navn,
    },
    {
      key: "adresse",
      labelKey: t("rapport.BYG0011.tiltakshavere.addresse"),
      render: (item: Kontaktperson) => item.eierAdresse || "-",
    },
    {
      key: "bruksenhet",
      labelKey: t("rapport.BYG0011.tiltakshavere.bruksenhet"),
      render: (item: Kontaktperson) => item.bruksenhetsnummer || "-",
    },
  ]

  return (
    <TableSection
      title={t("rapport.BYG0011.tiltakshavere.tittel")}
      items={validTiltakshavere}
      columns={columns}
      rowKey={(item) => item.eierident}
    />
  )
}
