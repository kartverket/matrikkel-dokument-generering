import { DataTable } from "../../components/DataTable"
import { Section } from "../../components/Section"
import { Table } from "../../components/Table"
import type { Column, Row } from "../../types"

type ValueResolver<T, TValue> = TValue | ((value: T, index: number) => TValue)
type Predicate<T> = (value: T) => boolean

export type TableBlock<T> = {
  type: "table"
  rows: (value: T) => readonly Row[]
  when?: Predicate<T>
}

export type DataTableBlock<T, TRow> = {
  type: "dataTable"
  columns: readonly Column<TRow>[]
  rows: (value: T) => readonly TRow[]
  getKey: (row: TRow) => string
  when?: Predicate<T>
}

export type SectionBlock<T> = {
  type: "section"
  title: ValueResolver<T, string>
  blocks: readonly StructureBlock<T>[]
  when?: Predicate<T>
}

export type RepeatSectionBlock<T, TItem> = {
  type: "repeat"
  items: (value: T) => readonly TItem[]
  title: ValueResolver<TItem, string>
  blocks: readonly StructureBlock<TItem>[]
  getKey: (item: TItem) => string
  when?: Predicate<T>
}

export type StructureBlock<T> =
  | TableBlock<T>
  | DataTableBlock<T, any>
  | SectionBlock<T>
  | RepeatSectionBlock<T, any>

export function createReportStructure<T>(blocks: readonly StructureBlock<T>[]) {
  return blocks
}

export function table<T>(config: Omit<TableBlock<T>, "type">): TableBlock<T> {
  return { type: "table", ...config }
}

export function dataTable<T, TRow>(
  config: Omit<DataTableBlock<T, TRow>, "type">,
): DataTableBlock<T, TRow> {
  return { type: "dataTable", ...config }
}

export function section<T>(
  config: Omit<SectionBlock<T>, "type">,
): SectionBlock<T> {
  return { type: "section", ...config }
}

export function repeatSection<T, TItem>(
  config: Omit<RepeatSectionBlock<T, TItem>, "type">,
): RepeatSectionBlock<T, TItem> {
  return { type: "repeat", ...config }
}

export function renderReportStructure<T>(
  value: T,
  blocks: readonly StructureBlock<T>[],
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
      const rows = block.rows(value)

      if (rows.length === 0) {
        return []
      }

      return [
        <DataTable
          key={key}
          columns={block.columns}
          rows={rows}
          getKey={block.getKey}
        />,
      ]
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
      return block.items(value).flatMap((item, index) => {
        const children = renderReportStructure(item, block.blocks, `${key}-${index}`)

        if (children.length === 0) {
          return []
        }

        return [
          <Section
            key={`${key}-${block.getKey(item)}`}
            title={resolveValue(block.title, item, index)}
          >
            {children}
          </Section>,
        ]
      })
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