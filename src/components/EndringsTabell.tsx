import { Table } from "@kv-designsystem/react"
import type { ReactNode } from "react"

export interface EndringsRad {
  key: string
  celler: readonly ReactNode[]
}

export interface EndringsGruppe {
  key: string
  header: ReactNode
  rader: readonly EndringsRad[]
}

interface Props {
  kolonner: readonly string[]
  grupper: readonly EndringsGruppe[]
  radHeader?: string
}

export default function EndringsTabell({
  kolonner,
  grupper,
  radHeader,
}: Props) {
  if (grupper.length === 0) return null

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
      {grupper.map((gruppe) => (
        <Table.Body key={gruppe.key}>
          {gruppe.rader.map((rad, i) => (
            <Table.Row key={rad.key}>
              {i === 0 && (
                <Table.HeaderCell
                  scope="row"
                  rowSpan={gruppe.rader.length}
                  className="align-top"
                >
                  {gruppe.header}
                </Table.HeaderCell>
              )}
              {kolonner.map((kolonne, j) => (
                <Table.Cell className="truncate text-kv-default" key={kolonne}>
                  {rad.celler[j] ?? null}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      ))}
    </Table>
  )
}
