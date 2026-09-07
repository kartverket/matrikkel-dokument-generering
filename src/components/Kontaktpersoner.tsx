import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Kontaktperson } from "../lib/schema/reports/bygg/shared/kontaktperson.schema.ts"
import { SectionTitle } from "./utils/SectionTitle.tsx"

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

  if (validKontaktpersoner.length === 0) {
    return null
  }

  const headerCellStyle: string = "text-xs"
  const valueCellStyle: string = "border-b-0! text-xs"

  return (
    <section className="space-y-2">
      <SectionTitle>{t("rapport.BYG0011.kontaktpersoner.tittel")}</SectionTitle>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.kontaktpersoner.rolle")}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.kontaktpersoner.fodselsnum")}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.kontaktpersoner.navn")}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.kontaktpersoner.addresse")}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t("rapport.BYG0011.kontaktpersoner.bruksenhet")}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {validKontaktpersoner.map((item) => (
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
