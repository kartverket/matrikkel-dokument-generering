import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { ArealSection } from "./ArealSection.tsx"
import { OmBygget } from "./OmBygget.tsx"

interface Props {
  readonly bygning: Bygning
}

export function BygningSection({ bygning }: Readonly<Props>) {
  if (!bygning) return null

  return (
    <section className="flex flex-col gap-4">
      <OmBygget
        bygningstypeKode={bygning.bygningstypeKode}
        naringsgruppeKode={bygning.naringsgruppeKode}
        etasjedata={bygning.etasjedata}
        representasjonspunkt={bygning.representasjonspunkt}
      />
      {bygning.etasjedata != null && (
        <ArealSection etasjedata={bygning.etasjedata} />
      )}
    </section>
  )
}
