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
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${tKey}.bolig`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${tKey}.annet`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${tKey}.total`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${tKey}.bolig`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${tKey}.annet`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${tKey}.total`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="border-b-0! text-xs">
              {formatAreal(etasjedata?.bruksarealTilBolig, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className="border-b-0! text-xs">
              {formatAreal(etasjedata?.bruksarealTilAnnet, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className="border-b-0! text-xs">
              {formatAreal(etasjedata?.bruksarealTotalt, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className="border-b-0! text-xs">
              {formatAreal(etasjedata?.bruttoarealTilBolig, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className="border-b-0! text-xs">
              {formatAreal(etasjedata?.bruttoarealTilAnnet, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className="border-b-0! text-xs">
              {formatAreal(etasjedata?.bruttoarealTotalt, enhet) ?? "-"}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
