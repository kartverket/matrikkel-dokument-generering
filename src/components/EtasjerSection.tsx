import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatAreal } from "../lib/utils/formatAreal.ts"
import { SectionTitle } from "./utils/SectionTitle.tsx"

type Props = Pick<Bygning, "etasjer">

export function EtasjerSection({ etasjer }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.etasjer" as const
  const arealKey = "rapport.BYG0011.areal" as const
  const enhet = t(`${arealKey}.enhet`)

  const etasjeliste = etasjer.filter((etasje) => etasje != null)

  return (
    <section className="space-y-4">
      <SectionTitle>{t(`${tKey}.title`)}</SectionTitle>

      <Table
        style={{
          fontVariantNumeric: "tabular-nums",
          tableLayout: "fixed",
        }}
        zebra
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className="text-xs" rowSpan={2}>
              {t(`${tKey}.etasjeplan`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs" rowSpan={2}>
              {t(`${tKey}.etasje`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs" rowSpan={2}>
              {t(`${tKey}.antallBoenheter`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-center text-xs" colSpan={3}>
              {t(`${arealKey}.bruksareal`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-center text-xs" colSpan={3}>
              {t(`${arealKey}.bruttoareal`)}
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${arealKey}.bolig`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${arealKey}.annet`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${arealKey}.total`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${arealKey}.bolig`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${arealKey}.annet`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="border-b! text-xs">
              {t(`${arealKey}.total`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {etasjeliste.map((etasje) => (
            <Table.Row
              key={`${etasje.etasjeplanKode?.kodeverdi}-${etasje.etasjenummer}`}
            >
              <Table.Cell className="border-b-0! text-xs">
                {etasje.etasjeplanKode?.kodeverdi != null
                  ? oversettKode({
                      t,
                      kodeverk: "etasjeplan",
                      kode: etasje.etasjeplanKode.kodeverdi,
                    })
                  : "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {etasje.etasjenummer ?? "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {etasje.etasjedata?.antallBoenheter ?? "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {formatAreal(etasje.etasjedata?.bruksarealTilBolig, enhet) ??
                  "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {formatAreal(etasje.etasjedata?.bruksarealTilAnnet, enhet) ??
                  "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {formatAreal(etasje.etasjedata?.bruksarealTotalt, enhet) ?? "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {formatAreal(etasje.etasjedata?.bruttoarealTilBolig, enhet) ??
                  "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {formatAreal(etasje.etasjedata?.bruttoarealTilAnnet, enhet) ??
                  "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {formatAreal(etasje.etasjedata?.bruttoarealTotalt, enhet) ??
                  "-"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}
