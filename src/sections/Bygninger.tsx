import { BygningSection } from "../components/BygningSection.tsx"
import { BygningsEndringerSection } from "../components/BygningsEndringerSection.tsx"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

interface Props {
  readonly bygninger: Array<Bygning>
}

export function Bygninger({ bygninger }: Readonly<Props>) {
  if (!bygninger) return null

  return (
    <section className="flex flex-col gap-8">
      {bygninger.map((bygning) =>
        bygning.lopenummer == null || bygning.lopenummer < 1 ? (
          <BygningSection
            key={`${bygning.bygningsnummer}-${bygning.lopenummer}`}
            bygning={bygning}
          />
        ) : (
          <BygningsEndringerSection
            key={`${bygning.bygningsnummer}-${bygning.lopenummer}`}
            bygning={bygning}
          />
        ),
      )}
    </section>
  )
}
