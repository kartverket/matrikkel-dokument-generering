import type { Column, Row } from "../../../types"

export type ValueResolver<T, TValue> =
  | TValue
  | ((value: T, index: number) => TValue)
export type Predicate<T> = (value: T) => boolean

type RenderBlock<T> = {
  render: (value: T, key: string) => React.ReactNode[]
  when?: Predicate<T>
}

export type TableBlock<T> = {
  type: "table"
  rows: (value: T) => readonly Row[]
  when?: Predicate<T>
}

export type DataTableConfig<T, TRow> = {
  columns: readonly Column<TRow>[]
  rows: (value: T) => readonly TRow[]
  getKey: (row: TRow) => string
  when?: Predicate<T>
}

export type DataTableBlock<T, _TRow = never> = RenderBlock<T> & {
  type: "dataTable"
}

export type SectionBlock<T> = {
  type: "section"
  title: ValueResolver<T, string>
  blocks: readonly StructureBlock<T>[]
  when?: Predicate<T>
}

export type RepeatSectionConfig<T, TItem> = {
  items: (value: T) => readonly TItem[]
  title: ValueResolver<TItem, string>
  blocks: readonly StructureBlock<TItem>[]
  getKey: (item: TItem) => string
  when?: Predicate<T>
}

export type RepeatSectionBlock<T, _TItem = never> = RenderBlock<T> & {
  type: "repeat"
}

export type StructureBlock<T> =
  | TableBlock<T>
  | DataTableBlock<T>
  | SectionBlock<T>
  | RepeatSectionBlock<T>

export type ReportStructure<T> = readonly StructureBlock<T>[]
