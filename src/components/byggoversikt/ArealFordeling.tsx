import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningsendring } from "../../lib/schema/reports/bygg/bygg0011/index"
import { summerAreal } from "../../lib/utils/arealLinje"
import { formatArea } from "../../lib/utils/formatArea"

interface Props {
  endring: Bygningsendring
}

export default function ArealFordeling({ endring }: Props) {
  const { t } = useTranslation()
  const af = "rapport.BYG0011.byggoversikt.arealfordeling"

  const sum = endring.etasjeplan.reduce(
    (acc, e) => ({
      antallBoenheter: acc.antallBoenheter + e.antallBoenheter,
      bolig: acc.bolig + e.bruksareal.bolig,
      annet: acc.annet + e.bruksareal.annet,
      bra: acc.bra + summerAreal(e.bruksareal),
      bta: acc.bta + summerAreal(e.bruttoareal),
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
          {endring.etasjeplan.map((e) => (
            <Table.Row key={`${e.etasjeplan}-${e.etasje}`}>
              <Table.Cell>{e.etasjeplan}</Table.Cell>
              <Table.Cell>{e.antallBoenheter}</Table.Cell>
              <Table.Cell>{formatArea(e.bruksareal.bolig)}</Table.Cell>
              <Table.Cell>{formatArea(e.bruksareal.annet)}</Table.Cell>
              <Table.Cell>{formatArea(summerAreal(e.bruksareal))}</Table.Cell>
              <Table.Cell>{formatArea(summerAreal(e.bruttoareal))}</Table.Cell>
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
