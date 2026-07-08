export type Pair = {
  key: string
  value: string
}

export type Row = {
  label: string
  value: React.ReactNode | null
}

export type Column<T> = {
  header: string
  render: (row: T) => React.ReactNode
}
