import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

type Props = Pick<Bygning, "enkeltminner">

export function Kulturminner({ enkeltminner }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.kulturminner" as const

  if (enkeltminner.length === 0) return null

  const headerCellStyle: string = "text-xs"
  const valueCellStyle: string = "border-b-0! text-xs"

  return (
    <div>
      <Table border>
        <caption className="text-left text-base">{t(`${tKey}.tittel`)}</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.enkeltminneNr`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.enkeltminneArtKode`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.vernetypeKode`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.kulturminnekategoriKode`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {enkeltminner.map((minne, index) => (
            <Table.Row key={minne.enkeltminneNummer ?? index}>
              <Table.Cell className={valueCellStyle}>
                {minne.enkeltminneNummer ?? "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {minne.enkeltminneArtKode?.displayTekst ?? "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {minne.vernetypeKode?.displayTekst ?? "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {minne.kulturminnekategoriKode?.displayTekst ?? "-"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
