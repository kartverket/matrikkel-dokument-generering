import type { Row } from "../types";

export function Table({ rows }: { rows: Row[] }) {
  return (
    <table>
      <tbody>
        {rows.filter((r) => r.value !== null).map((row) => (
          <tr key={row.label}>
            <td>{row.label}</td>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}