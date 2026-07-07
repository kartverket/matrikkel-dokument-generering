import { createElement } from "react"
import { DataTable } from "../../../components/DataTable"
import { Section } from "../../../components/Section"
import { renderReportStructure } from "./render"
import type {
  DataTableBlock,
  DataTableConfig,
  RepeatSectionBlock,
  RepeatSectionConfig,
  ReportStructure,
  SectionBlock,
  TableBlock,
  ValueResolver,
} from "./types"

export function createReportStructure<T>(
  blocks: ReportStructure<T>,
): ReportStructure<T> {
  return blocks
}

export function table<T>(config: Omit<TableBlock<T>, "type">): TableBlock<T> {
  return { type: "table", ...config }
}

export function dataTable<T, TRow>(
  config: DataTableConfig<T, TRow>,
): DataTableBlock<T, TRow> {
  return {
    type: "dataTable",
    when: config.when,
    render(value, key) {
      const rows = config.rows(value)

      if (rows.length === 0) {
        return []
      }

      return [
        createElement(DataTable<TRow>, {
          key,
          columns: config.columns,
          rows,
          getKey: config.getKey,
        }),
      ]
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
          createElement(Section, {
            key: `${key}-${config.getKey(item)}`,
            title: resolveValue(config.title, item, index),
            children,
          }),
        ]
      })
    },
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
