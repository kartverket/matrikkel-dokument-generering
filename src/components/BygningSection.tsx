import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { ArealSection } from "./ArealSection.tsx"
import { Bruksenheter } from "./Bruksenheter.tsx"
import { BygningsstatuserSection } from "./BygningsstatuserSection.tsx"
import { OmBygget } from "./OmBygget.tsx"

interface Props {
  readonly bygning: Bygning
}

export function BygningSection({ bygning }: Readonly<Props>) {
  if (!bygning) return null

  return (
    <section className="flex flex-col gap-8">
      <OmBygget
        bygningstypeKode={bygning.bygningstypeKode}
        naringsgruppeKode={bygning.naringsgruppeKode}
        etasjedata={bygning.etasjedata}
        representasjonspunkt={bygning.representasjonspunkt}
      />

      {bygning.etasjedata != null && (
        <ArealSection etasjedata={bygning.etasjedata} />
      )}
      
      {bygning.bygningsstatuser != null && (
        <BygningsstatuserSection bygningsstatuser={bygning.bygningsstatuser} />
      )}

      {bygning.bruksenheter.length > 0 && (
        <Bruksenheter bruksenheter={bygning.bruksenheter} />
      )}
    </section>
  )
}
