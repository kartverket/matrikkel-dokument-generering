import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatDate } from "../lib/utils/formatDate.ts"
import { SectionTitle } from "./utils/SectionTitle.tsx"

type Props = Pick<Bygning, "bygningsstatuser">

const STATUSREKKEFØLGE = ["RA", "IG", "MB", "FA", "TB", "BR"] as const

export function BygningsstatuserSection({ bygningsstatuser }: Props) {
  const { t, i18n } = useTranslation()
  const tKey = "rapport.BYG0011.bygningsstatuser" as const

  const headerCellStyle: string = "border-b-0! text-xs"
  const valueCellStyle: string = "border-b-0! text-xs"

  return (
    <section className="space-y-2">
      <SectionTitle>{t(`${tKey}.tittel`)}</SectionTitle>

      <Table>
        <Table.Head>
          <Table.Row>
            {STATUSREKKEFØLGE.map((kode) => (
              <Table.HeaderCell key={kode} className={headerCellStyle}>
                {oversettKode({ t, kodeverk: "bygningsstatus", kode })}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            {STATUSREKKEFØLGE.map((kode) => (
              <Table.Cell key={kode} className={valueCellStyle}>
                {formatDate(i18n, bygningsstatuser?.[kode], "-", {
                  dateStyle: "short",
                })}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
