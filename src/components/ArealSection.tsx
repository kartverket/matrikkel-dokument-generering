import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatAreal } from "../lib/utils/formatAreal.ts"

type Props = Pick<Bygning, "etasjedata">

export function ArealSection({ etasjedata }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.areal" as const
  const enhet = t(`${tKey}.enhet`)

  const headerCellStyle: string = "text-xs"
  const valueCellStyle: string = "border-b-0! text-xs"

  return (
    <section>
      <Table border>
        <caption className="text-left text-base">{t(`${tKey}.tittel`)}</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.bolig_bra`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.annet_bra`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.total_bra`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.bolig_bta`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.annet_bta`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.total_bta`)}
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
