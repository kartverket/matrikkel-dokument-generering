import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { EtasjePlan } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { formatArea } from "../../lib/utils/formatArea"

interface Props {
  etasjePlan: EtasjePlan
}

export default function ArealFordeling({ etasjePlan }: Props) {
  const { t } = useTranslation()
  const af = "rapport.BYG0011.byggoversikt.arealfordeling"

  const etasjer = etasjePlan.filter((etasje) => etasje !== undefined)

  const sum = etasjer.reduce(
    (acc, e) => ({
      antallBoenheter: acc.antallBoenheter + (e.antallBoenheter ?? 0),
      bolig: acc.bolig + (e.bruksareal.boligAreal ?? 0),
      annet: acc.annet + (e.bruksareal.annetAreal ?? 0),
      bra: acc.bra + (e.bruksareal.totaltAreal ?? 0),
      bta: acc.bta + (e.bruttoareal.totaltAreal ?? 0),
    }),
    { antallBoenheter: 0, bolig: 0, annet: 0, bra: 0, bta: 0 },
  )

  return (
    <div className="space-y-4">
      <Heading level={4} data-size="xs">
        {t(`${af}.title`)}
      </Heading>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t(`${af}.etasje`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${af}.boenheter`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${af}.bolig`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${af}.annet`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${af}.bra`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${af}.bta`)}</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {etasjer.map((e) => (
            <Table.Row key={`${e.etasjeplanKode}-${e.etasje}`}>
              <Table.Cell>
                {t(`koder.etasjeplan.${e.etasjeplanKode}`)}
              </Table.Cell>
              <Table.Cell>{e.antallBoenheter}</Table.Cell>
              <Table.Cell>{formatArea(e.bruksareal.boligAreal)}</Table.Cell>
              <Table.Cell>{formatArea(e.bruksareal.annetAreal)}</Table.Cell>
              <Table.Cell>{formatArea(e.bruksareal.totaltAreal)}</Table.Cell>
              <Table.Cell>{formatArea(e.bruttoareal.totaltAreal)}</Table.Cell>
            </Table.Row>
          ))}
          <Table.Row className="font-semibold">
            <Table.HeaderCell scope="row">{t(`${af}.sum`)}</Table.HeaderCell>
            <Table.Cell>{sum.antallBoenheter}</Table.Cell>
            <Table.Cell>{formatArea(sum.bolig)}</Table.Cell>
            <Table.Cell>{formatArea(sum.annet)}</Table.Cell>
            <Table.Cell>{formatArea(sum.bra)}</Table.Cell>
            <Table.Cell>{formatArea(sum.bta)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}
