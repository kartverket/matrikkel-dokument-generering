import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Kontaktperson } from "../lib/schema/reports/bygg/shared/kontaktperson.schema.ts"
import { SectionTitle } from "./utils/SectionTitle.tsx"

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

  if (validTiltakshavere.length === 0) {
    return null
  }

  const headerCellStyle: string = "text-xs"
  const valueCellStyle: string = "border-b-0! text-xs"

  return (
    <section className="space-y-2">
      <SectionTitle>{t("rapport.BYG0011.tiltakshavere.tittel")}</SectionTitle>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.tiltakshavere.rolle")}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.tiltakshavere.fodselsnum")}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.tiltakshavere.navn")}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.tiltakshavere.addresse")}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.tiltakshavere.bruksenhet")}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {validTiltakshavere.map((item) => (
            <Table.Row key={item.eierident}>
              <Table.Cell className={valueCellStyle}>
                {item.kontaktpersonKode?.displayTekst || "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {item.eierident}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>{item.navn}</Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {item.eierAdresse || "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {item.bruksenhetsnummer || "-"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}
