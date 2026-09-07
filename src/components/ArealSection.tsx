import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatAreal } from "../lib/utils/formatAreal.ts"
import { SectionTitle } from "./utils/SectionTitle.tsx"

type Props = Pick<Bygning, "etasjedata">

export function ArealSection({ etasjedata }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.areal" as const
  const enhet = t(`${tKey}.enhet`)

  const headerCellStyle: string = "border-b! text-xs"
  const valueCellStyle: string = "border-b-0! text-xs"

  return (
    <section className="space-y-2">
      <SectionTitle>{t(`${tKey}.tittel`)}</SectionTitle>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className="text-center text-xs" colSpan={3}>
              {t(`${tKey}.bruksareal`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-center text-xs" colSpan={3}>
              {t(`${tKey}.bruttoareal`)}
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.bolig`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.annet`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.total`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.bolig`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.annet`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.total`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell className={valueCellStyle}>
              {formatAreal(etasjedata?.bruksarealTilBolig, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {formatAreal(etasjedata?.bruksarealTilAnnet, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {formatAreal(etasjedata?.bruksarealTotalt, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {formatAreal(etasjedata?.bruttoarealTilBolig, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {formatAreal(etasjedata?.bruttoarealTilAnnet, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {formatAreal(etasjedata?.bruttoarealTotalt, enhet) ?? "-"}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
