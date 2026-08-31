import { SectionTitle } from "./SectionTitle.tsx"

// Tailwind classes extracted to constants
const TABLE_CELL_CLASSES = "px-2 py-2"
const TABLE_HEADER_CLASSES = `${TABLE_CELL_CLASSES} text-left font-bold`

interface Column<T> {
  key: string
  labelKey: string
  render: (item: T) => React.ReactNode
  align?: "left" | "right"
}

interface Props<T> {
  readonly title: string
  readonly items: Array<T>
  readonly columns: Array<Column<T>>
  readonly rowKey: (item: T) => string
}

export function TableSection<T>({
  title,
  items,
  columns,
  rowKey,
}: Readonly<Props<T>>) {
  if (!items?.length) return null

  const alignClass = (align?: string) => {
    return align === "right" ? "text-right" : "text-left"
  }

  return (
    <>
      {title && <SectionTitle>{title}</SectionTitle>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${TABLE_HEADER_CLASSES} ${alignClass(col.align)}`}
                >
                  {col.labelKey}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={rowKey(item)}>
                {columns.map((col) => (
                  <td
                    key={`${rowKey(item)}-${col.key}`}
                    className={`${TABLE_CELL_CLASSES} ${alignClass(col.align)}`}
                  >
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
