import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

interface Props {
  readonly bygning: Bygning
}

export function BygningSection({ bygning }: Readonly<Props>) {
  if (!bygning) return null

  return (
    <section>
      <h2>Bygningsnummer: {bygning.bygningsnummer}</h2>
    </section>
  )
}
