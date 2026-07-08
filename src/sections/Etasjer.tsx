import { Table } from "@kv-designsystem/react"
import type { Etasjeplan } from "../lib/schema/byggRapportSchema"
import { formatArea } from "../lib/utils/format"

interface Props {
  etasjer?: Etasjeplan[] | null
}

export function EtasjerSection({ etasjer }: Props) {
  if (!etasjer || etasjer.length === 0) return null

  return (
    <Table zebra border>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Etasjeplan</Table.HeaderCell>
          <Table.HeaderCell>Etasje</Table.HeaderCell>
          <Table.HeaderCell>Antall boenheter</Table.HeaderCell>
          <Table.HeaderCell>Bruksareal bolig</Table.HeaderCell>
          <Table.HeaderCell>Bruksareal annet</Table.HeaderCell>
          <Table.HeaderCell>Bruksareal totalt</Table.HeaderCell>
          <Table.HeaderCell>Bruttoareal bolig</Table.HeaderCell>
          <Table.HeaderCell>Bruttoareal annet</Table.HeaderCell>
          <Table.HeaderCell>Bruttoareal totalt</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {etasjer.map((e) => (
          <Table.Row key={`${e.etasjeplan}-${e.etasje}`}>
            <Table.Cell>{e.etasjeplan}</Table.Cell>
            <Table.Cell>{e.etasje}</Table.Cell>
            <Table.Cell>{e.antallBoenheter}</Table.Cell>
            <Table.Cell>{formatArea(e.bruksareal.bolig)}</Table.Cell>
            <Table.Cell>{formatArea(e.bruksareal.annet)}</Table.Cell>
            <Table.Cell>{formatArea(e.bruksareal.totalt)}</Table.Cell>
            <Table.Cell>{formatArea(e.bruttoareal.bolig)}</Table.Cell>
            <Table.Cell>{formatArea(e.bruttoareal.annet)}</Table.Cell>
            <Table.Cell>{formatArea(e.bruttoareal.totalt)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
