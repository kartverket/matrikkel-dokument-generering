import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bruksenhet } from "../lib/schema/reports/bygg/shared/bruksenhet.schema.ts"
import { cn } from "../lib/utils/cn.ts"

type Props = Readonly<{
  bruksenheter: Bruksenhet[]
}>

export function Bruksenheter({ bruksenheter }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.bruksenheter" as const

  const filtrerteEnheter: Bruksenhet[] = bruksenheter

  if (filtrerteEnheter.length === 0) {
    return null
  }

  const headerCellStyle: string = "text-tiny"
  const valueCellStyle: string = "border-b-0! text-tiny"

  return (
    <section>
      <Table border>
        <caption className="text-left text-sm">{t(`${tKey}.tittel`)}</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.bruksenhetsNr`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.bruksenhetsTypeKode`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={cn(headerCellStyle, "text-right")}>
              {t(`${tKey}.bruksAreal`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={cn(headerCellStyle, "text-right")}>
              {t(`${tKey}.antallRom`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={cn(headerCellStyle, "text-right")}>
              {t(`${tKey}.antallBad`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={cn(headerCellStyle, "text-right")}>
              {t(`${tKey}.antallWC`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.kjokkenTilgangKode`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.adresse`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.matrikkelNr`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filtrerteEnheter.map((enhet) => (
            <Table.Row
              key={enhet.bruksenhetsnummer ?? Math.random().toString()}
            >
              <Table.Cell className={valueCellStyle}>
                {enhet.bruksenhetsnummer}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {enhet.bruksenhetsTypeKode?.displayTekst ?? "-"}
              </Table.Cell>
              <Table.Cell className={cn(valueCellStyle)}>
                {enhet.bruksareal != null ? `${enhet.bruksareal} m²` : "-"}
              </Table.Cell>
              <Table.Cell className={cn(valueCellStyle)}>
                {enhet.antallRom ?? "-"}
              </Table.Cell>
              <Table.Cell className={cn(valueCellStyle)}>
                {enhet.antallBad ?? "-"}
              </Table.Cell>
              <Table.Cell className={cn(valueCellStyle)}>
                {enhet.antallWC ?? "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {enhet.kjokkentilgang?.displayTekst ?? "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {enhet.adresseIdentRapportInfo?.adresseAsString ?? "-"}
              </Table.Cell>
              <Table.Cell className={valueCellStyle}>
                {enhet.matrikkelnrRapportInfo?.matrikkelNummer ?? "-"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}
