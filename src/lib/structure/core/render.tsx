import { Heading, Table } from "@kv-designsystem/react"
import type { ReportStructure, StructureBlock, ValueResolver } from "./types"

export function renderReportStructure<T>(
  value: T,
  blocks: ReportStructure<T>,
  keyPrefix = "block",
): React.ReactNode[] {
  return blocks.flatMap((block, index) =>
    renderBlock(block, value, `${keyPrefix}-${index}`),
  )
}

function renderBlock<T>(
  block: StructureBlock<T>,
  value: T,
  key: string,
): React.ReactNode[] {
  if (block.when && !block.when(value)) {
    return []
  }

  switch (block.type) {
    case "table": {
      const rows = block.rows(value).filter((row) => row.value != null)

      if (rows.length === 0) {
        return []
      }

      return [
        <Table key={key} border>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.label}>
                <Table.HeaderCell scope="row">{row.label}</Table.HeaderCell>
                <Table.Cell>{row.value}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>,
      ]
    }

    case "columnTable": {
      return block.render(value, key)
    }

    case "section": {
      const children = renderReportStructure(value, block.blocks, key)

      if (children.length === 0) {
        return []
      }

      return [
        <section key={key}>
          <Heading level={2}>{resolveValue(block.title, value, 0)}</Heading>
          {children}
        </section>,
      ]
    }

    case "repeat": {
      return block.render(value, key)
    }
  }
}

function resolveValue<T, TValue>(
  value: ValueResolver<T, TValue>,
  input: T,
  index: number,
): TValue {
  if (typeof value === "function") {
    return (value as (value: T, index: number) => TValue)(input, index)
  }

  return value
}
