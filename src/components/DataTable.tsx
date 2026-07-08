import type { Column } from "../types";

export function DataTable<T>({ columns, rows, getKey }: { columns: Column<T>[]; rows: T[]; getKey: (row: T, index: number) => string }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.header}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={getKey(row, i)}>
            {columns.map((col) => (
              <td key={col.header}>{col.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}