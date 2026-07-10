import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/byggRapportSchema"
import { arealLinje } from "../lib/utils/arealLinje"
import { formatArea } from "../lib/utils/format"
import { getKulturMinner } from "../lib/utils/getKulturMinner"
import { isFerdigstilt } from "../lib/utils/isFerdigstilt"

interface Props {
  bygning: Bygning
}

export function Bygningslinje({ bygning }: Props) {
  const { t } = useTranslation()

  if (bygning.endringer.length === 0) return null

  const bl = "rapport.BYG0011.bygningslinje"

  return (
    <section>
      <h2>{t(`${bl}.title`)}</h2>
      <Table zebra border>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t(`${bl}.bygningsnr`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.lopenr`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.endringskode`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.bygningsstatus`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.utgattKode`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.bygningstype`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.bygningstypekode`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.naringsgruppe`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.rammetillatelse`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.igangsetting`)}</Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${bl}.midlertidigBrukstillatelse`)}
            </Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.ferdigattest`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.tattIBruk`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.utgaattRevet`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.bruksareal`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.bruttoareal`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.antallBoenheter`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.bebygdAreal`)}</Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${bl}.representasjonspunkt`)}
            </Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.erFerdigstilt`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${bl}.minner`)}</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {bygning.endringer.map((endring) => (
            <Table.Row key={endring.id}>
              <Table.Cell>{bygning.bygningsnr}</Table.Cell>
              <Table.Cell>{endring.lopenr}</Table.Cell>
              <Table.Cell>{endring.endringskode ?? "-"}</Table.Cell>
              <Table.Cell>{endring.bygningsstatus.navn}</Table.Cell>
              <Table.Cell>{endring.bygningsstatus.kode ?? "-"}</Table.Cell>
              <Table.Cell>{bygning.bygningstype.navn}</Table.Cell>
              <Table.Cell>{bygning.bygningstype.kode}</Table.Cell>
              <Table.Cell>{bygning.naeringsgruppe}</Table.Cell>
              <Table.Cell>{endring.datoer.rammetillatelse ?? "-"}</Table.Cell>
              <Table.Cell>
                {endring.datoer.igangsettingstillatelse ?? "-"}
              </Table.Cell>
              <Table.Cell>
                {endring.datoer.midlertidigBrukstillatelse ?? "-"}
              </Table.Cell>
              <Table.Cell>{endring.datoer.ferdigattest ?? "-"}</Table.Cell>
              <Table.Cell>{endring.datoer.tattIBruk ?? "-"}</Table.Cell>
              <Table.Cell>{endring.datoer.utgaattRevet ?? "-"}</Table.Cell>
              <Table.Cell>{arealLinje(endring.bruksareal)}</Table.Cell>
              <Table.Cell>{arealLinje(endring.bruttoareal)}</Table.Cell>
              <Table.Cell>{endring.antallBoenheter}</Table.Cell>
              <Table.Cell>{formatArea(endring.bebygdAreal)}</Table.Cell>
              <Table.Cell>
                {endring.koordinat.nord}, {endring.koordinat.ost}
              </Table.Cell>
              <Table.Cell>{isFerdigstilt(endring) ? "Ja" : "Nei"}</Table.Cell>
              <Table.Cell>{getKulturMinner(endring)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}
