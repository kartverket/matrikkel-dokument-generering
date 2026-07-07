import { Section } from "../../../components/Section"
import { Table } from "../../../components/Table"
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

      return [<Table key={key} rows={rows} />]
    }

    case "dataTable": {
      return block.render(value, key)
    }

    case "section": {
      const children = renderReportStructure(value, block.blocks, key)

      if (children.length === 0) {
        return []
      }

      return [
        <Section key={key} title={resolveValue(block.title, value, 0)}>
          {children}
        </Section>,
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
