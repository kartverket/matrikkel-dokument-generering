import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatAreal } from "../lib/utils/formatAreal.ts"

type Props = Pick<Bygning, "etasjer">

export function EtasjerSection({ etasjer }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.etasjer" as const
  const arealKey = "rapport.BYG0011.areal" as const
  const enhet = t(`${arealKey}.enhet`)

  const etasjeliste = etasjer.filter((etasje) => etasje != null)

  const headerCellStyle: string = "text-tiny"
  const valueCellStyle: string = "border-b-0! text-tiny"

  return (
    <section>
      <Table border>
        <caption className="text-left text-sm">{t(`${tKey}.title`)}</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.etasjeplan`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.etasje`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.antallBoenheter`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${arealKey}.bolig_bra`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${arealKey}.annet_bra`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${arealKey}.total_bra`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${arealKey}.bolig_bta`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${arealKey}.annet_bta`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${arealKey}.total_bta`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {etasjeliste.map((etasje) => (
            <Table.Row
              key={`${etasje.etasjeplanKode?.kodeverdi}-${etasje.etasjenummer}`}
            >
              <Table.Cell className={valueCellStyle}>
                {etasje.etasjeplanKode?.kodeverdi != null
                  ? oversettKode({
                      t,
                      kodeverk: "etasjeplan",
                      kode: etasje.etasjeplanKode.kodeverdi,
                    })
                  : "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {etasje.etasjenummer ?? "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {etasje.etasjedata?.antallBoenheter ?? "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {formatAreal(etasje.etasjedata?.bruksarealTilBolig, enhet) ??
                  "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {formatAreal(etasje.etasjedata?.bruksarealTilAnnet, enhet) ??
                  "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {formatAreal(etasje.etasjedata?.bruksarealTotalt, enhet) ?? "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {formatAreal(etasje.etasjedata?.bruttoarealTilBolig, enhet) ??
                  "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {formatAreal(etasje.etasjedata?.bruttoarealTilAnnet, enhet) ??
                  "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
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
