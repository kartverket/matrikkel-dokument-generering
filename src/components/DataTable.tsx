import type { Column } from "../types";

export function DataTable<T>({ columns, rows, getKey }: { columns: Column<T>[]; rows: T[]; getKey: (row: T) => string }) {
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
        {rows.map((row) => (
          <tr key={getKey(row)}>
            {columns.map((col) => (
              <td key={col.header}>{col.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}