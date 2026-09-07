import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bruksenhet } from "../lib/schema/reports/bygg/shared/bruksenhet.schema.ts"
import { SectionTitle } from "./utils/SectionTitle.tsx"

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

  return (
    <section className="space-y-2">
      <SectionTitle>{t(`${tKey}.tittel`)}</SectionTitle>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className="text-xs">
              {t(`${tKey}.bruksenhetsNr`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t(`${tKey}.bruksenhetsTypeKode`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right text-xs">
              {t(`${tKey}.bruksAreal`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right text-xs">
              {t(`${tKey}.antallRom`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right text-xs">
              {t(`${tKey}.antallBad`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right text-xs">
              {t(`${tKey}.antallWC`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t(`${tKey}.kjokkenTilgangKode`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t(`${tKey}.adresse`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-xs">
              {t(`${tKey}.matrikkelNr`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filtrerteEnheter.map((enhet) => (
            <Table.Row
              key={enhet.bruksenhetsnummer ?? Math.random().toString()}
            >
              <Table.Cell className="border-b-0! text-xs">
                {enhet.bruksenhetsnummer}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {enhet.bruksenhetsTypeKode?.displayTekst ?? "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-right text-xs">
                {enhet.bruksareal != null ? `${enhet.bruksareal} m²` : "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-right text-xs">
                {enhet.antallRom ?? "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-right text-xs">
                {enhet.antallBad ?? "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-right text-xs">
                {enhet.antallWC ?? "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {enhet.kjokkentilgang?.displayTekst ?? "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {enhet.adresseIdentRapportInfo?.adresseAsString ?? "-"}
              </Table.Cell>
              <Table.Cell className="border-b-0! text-xs">
                {enhet.matrikkelnrRapportInfo?.matrikkelNummer ?? "-"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}
