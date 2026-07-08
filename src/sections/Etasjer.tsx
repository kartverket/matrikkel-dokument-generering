import { Table } from "@kv-designsystem/react"
import type { Bygningsendring } from "../lib/schema/byggRapportSchema"
import { formatArea } from "../lib/utils/format"

interface Props {
  etasjeEndringer?: Bygningsendring[] | null
}

export function EtasjerSection({ etasjeEndringer }: Props) {
  if (!etasjeEndringer || etasjeEndringer.length === 0) return null

  const rader = etasjeEndringer.flatMap((endring) =>
    endring.etasjeplan.map((etasje) => ({ endring, etasje })),
  )

  if (rader.length === 0) return null

  return (
    <Table zebra border>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Endring</Table.HeaderCell>
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
        {rader.map(({ endring, etasje: e }) => (
          <Table.Row key={`${endring.id}-${e.etasjeplan}-${e.etasje}`}>
            <Table.Cell>
              {endring.lopenr === 0 ? "Opprinnelig" : `${endring.lopenr}`}
            </Table.Cell>
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
