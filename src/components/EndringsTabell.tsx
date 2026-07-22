import { Table } from "@kv-designsystem/react"
import type { ReactNode } from "react"

export interface EndringsRad {
  key: string
  header: ReactNode
  celler: readonly ReactNode[]
}

interface Props {
  kolonner: readonly string[]
  rader: readonly EndringsRad[]
  radHeader?: string
}

export default function EndringsTabell({ kolonner, rader, radHeader }: Props) {
  if (rader.length === 0) return null

  return (
    <Table className="w-full">
      <Table.Head>
        <Table.Row className="font-regular text-kv-subtle">
          <Table.HeaderCell>{radHeader ?? ""}</Table.HeaderCell>
          {kolonner.map((kolonne) => (
            <Table.HeaderCell key={kolonne}>{kolonne}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rader.map(({ key, header, celler }) => (
          <Table.Row key={key}>
            <Table.HeaderCell scope="row">{header}</Table.HeaderCell>
            {kolonner.map((kolonne, i) => (
              <Table.Cell className="text-kv-default" key={kolonne}>
                {celler[i] ?? null}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
