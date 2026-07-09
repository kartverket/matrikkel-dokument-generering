import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bruksenhet } from "../lib/schema/byggRapportSchema.ts"
import { formatArea } from "../lib/utils/format"

interface BruksenhetProps {
  bruksenheter: Bruksenhet[]
}

export default function Bruksenheter({ bruksenheter }: BruksenhetProps) {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t("rapport.BYG0011.bruksenheter.title")}</h2>
      <Table zebra border>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              {t("rapport.BYG0011.bruksenheter.bruksenhetsnr")}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t("rapport.BYG0011.bruksenheter.type")}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t("rapport.BYG0011.bruksenheter.matrikkelenhet")}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t("rapport.BYG0011.bruksenheter.adresse")}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t("rapport.BYG0011.bruksenheter.bra")}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t("rapport.BYG0011.bruksenheter.rom")}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t("rapport.BYG0011.bruksenheter.kjokkentilgang")}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t("rapport.BYG0011.bruksenheter.bad")}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t("rapport.BYG0011.bruksenheter.wc")}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {bruksenheter.map((b, i) => (
            <Table.Row key={b.bruksenhetsnr ?? String(i)}>
              <Table.Cell>{b.bruksenhetsnr ?? "–"}</Table.Cell>
              <Table.Cell>{b.type}</Table.Cell>
              <Table.Cell>
                {b.matrikkelenhet.gnr}/{b.matrikkelenhet.bnr}
              </Table.Cell>
              <Table.Cell>{b.adresse ?? "–"}</Table.Cell>
              <Table.Cell>{formatArea(b.bruksareal)}</Table.Cell>
              <Table.Cell>{b.antallRom}</Table.Cell>
              <Table.Cell>{b.kjokkentilgang ? "Ja" : "Nei"}</Table.Cell>
              <Table.Cell>{b.antallBad}</Table.Cell>
              <Table.Cell>{b.antallWc}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
