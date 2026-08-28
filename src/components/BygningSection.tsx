import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { BygningsstatuserSection } from "./BygningsstatuserSection.tsx"
import { OmBygget } from "./OmBygget.tsx"

interface Props {
  readonly bygning: Bygning
}

export function BygningSection({ bygning }: Readonly<Props>) {
  if (!bygning) return null

  return (
    <section>
      <OmBygget
        bygningstypeKode={bygning.bygningstypeKode}
        naringsgruppeKode={bygning.naringsgruppeKode}
        etasjedata={bygning.etasjedata}
        representasjonspunkt={bygning.representasjonspunkt}
      />
      <BygningsstatuserSection bygningsstatuser={bygning.bygningsstatuser} />
    </section>
  )
}
