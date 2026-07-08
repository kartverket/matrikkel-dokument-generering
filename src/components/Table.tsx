import type { Row } from "../types";

export function Table({ rows }: { rows: Row[] }) {
  return (
    <table style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "4px" }}>
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