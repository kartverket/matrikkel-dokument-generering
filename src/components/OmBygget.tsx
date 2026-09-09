import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatAreal } from "../lib/utils/formatAreal.ts"

type Props = Pick<
  Bygning,
  | "bygningstypeKode"
  | "naringsgruppeKode"
  | "etasjedata"
  | "representasjonspunkt"
  | "sefrakminner"
  | "bebygdAreal"
>

export function OmBygget({
  bygningstypeKode,
  naringsgruppeKode,
  etasjedata,
  representasjonspunkt,
  sefrakminner,
  bebygdAreal,
}: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.omBygget" as const
  const enhet = t(`rapport.BYG0011.areal.enhet`)

  const bygningstype =
    bygningstypeKode?.kodeverdi != null
      ? `${bygningstypeKode.kodeverdi} ${oversettKode({ t, kodeverk: "bygningstype", kode: bygningstypeKode.kodeverdi })}`
      : undefined

  const naringsgruppe =
    naringsgruppeKode?.kodeverdi != null
      ? `${oversettKode({ t, kodeverk: "naringsgruppe", kode: naringsgruppeKode.kodeverdi })}`
      : undefined

  const koordinater =
    representasjonspunkt?.nord != null && representasjonspunkt?.ost != null
      ? `${t(`${tKey}.nord`)}: ${representasjonspunkt.nord}, ${t(`${tKey}.ost`)}: ${representasjonspunkt.ost}`
      : undefined

  const sefrakIDs = sefrakminner
    ?.map((s) => {
      if (
        s.kommunenr == null ||
        s.registreringskretsnr == null ||
        s.huslopenr == null
      )
        return null
      return `${s.kommunenr}-${s.registreringskretsnr}-${s.huslopenr}`
    })
    .filter((id): id is string => id != null)

  const headerCellStyle: string = "text-tiny"
  const valueCellStyle: string = "border-b-0! text-tiny"

  return (
    <div>
      <Table border>
        <caption className="text-left text-sm">{t(`${tKey}.tittel`)}</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.bygningstype`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.naringsgruppe`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.boenheter`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.bebygdAreal`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.representasjonspunkt`)}
            </Table.HeaderCell>
            <Table.HeaderCell className={headerCellStyle}>
              {t(`${tKey}.sefrakId`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell className={valueCellStyle}>
              {bygningstype ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {naringsgruppe ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {etasjedata?.antallBoenheter ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {formatAreal(bebygdAreal, enhet) ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {koordinater ?? "-"}
            </Table.Cell>
            <Table.Cell className={valueCellStyle}>
              {sefrakIDs != null && sefrakIDs.length > 0 ? (
                <div className="flex flex-col">
                  {sefrakIDs.map((id) => (
                    <span key={id}>{id}</span>
                  ))}
                </div>
              ) : (
                "-"
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}
