import { Heading, Table } from "@kv-designsystem/react"
import { createElement } from "react"
import type { Column } from "../../../types"
import { renderReportStructure } from "./render"
import type {
  ColumnTableBlock,
  ColumnTableConfig,
  RepeatSectionBlock,
  RepeatSectionConfig,
  ReportStructure,
  SectionBlock,
  TableBlock,
  TableConfig,
  ValueResolver,
} from "./types"

export function createReportStructure<T>(
  blocks: ReportStructure<T>,
): ReportStructure<T> {
  return blocks
}

export function table<T>(config: TableConfig<T>): TableBlock<T> {
  return { type: "table", ...config }
}

export function columnTable<T, TRow>(
  config: ColumnTableConfig<T, TRow>,
): ColumnTableBlock<T, TRow> {
  return {
    type: "columnTable",
    when: config.when,
    render(value, key) {
      const rows = config.rows(value)

      if (rows.length === 0) {
        return []
      }

      return [renderTable(key, config.columns, rows, config.getKey)]
    },
  }
}

export function section<T>(
  config: Omit<SectionBlock<T>, "type">,
): SectionBlock<T> {
  return { type: "section", ...config }
}

export function repeatSection<T, TItem>(
  config: RepeatSectionConfig<T, TItem>,
): RepeatSectionBlock<T, TItem> {
  return {
    type: "repeat",
    when: config.when,
    render(value, key) {
      return config.items(value).flatMap((item, index) => {
        const children = renderReportStructure(
          item,
          config.blocks,
          `${key}-${index}`,
        )

        if (children.length === 0) {
          return []
        }

        return [
          createSection(
            `${key}-${config.getKey(item)}`,
            resolveValue(config.title, item, index),
            children,
          ),
        ]
      })
    },
  }
}

function createSection(
  key: string,
  title: string,
  children: React.ReactNode[],
): React.ReactNode {
  return createElement(
    "section",
    { key },
    createElement(Heading, { level: 2 }, title),
    ...children,
  )
}

function renderTable<TRow>(
  key: string,
  columns: readonly Column<TRow>[],
  rows: readonly TRow[],
  getKey: (row: TRow) => string,
): React.ReactNode {
  return createElement(
    Table,
    { key, border: true },
    createElement(
      Table.Head,
      null,
      createElement(
        Table.Row,
        null,
        ...columns.map((column) =>
          createElement(
            Table.HeaderCell,
            { key: column.header },
            column.header,
          ),
        ),
      ),
    ),
    createElement(
      Table.Body,
      null,
      ...rows.map((row) =>
        createElement(
          Table.Row,
          { key: getKey(row) },
          ...columns.map((column) =>
            createElement(
              Table.Cell,
              { key: column.header },
              column.render(row),
            ),
          ),
        ),
      ),
    ),
  )
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
