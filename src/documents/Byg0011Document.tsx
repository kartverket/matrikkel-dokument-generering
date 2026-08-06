import type { Byg0011Rapport } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import ByggEndringer from "../sections/ByggEndringer.tsx"
import Byggoversikt from "../sections/Byggoversikt.tsx"
import { ByggUtvalgskriterier } from "../sections/ByggUtvalgskriterier.tsx"

export function Byg0011Document({ rapport }: { rapport: Byg0011Rapport }) {
  const { bygninger } = rapport

  return (
    <main className="mx-auto max-w-2xl">
      <ByggUtvalgskriterier index={1} kriterier={rapport.utvalgskriterier} />
      {bygninger.map((bygning, indeks) => (
        <Byggoversikt
          key={bygning.bygningsnr}
          index={2}
          bygning={bygning}
          bygningIndeks={indeks + 1}
          antallBygninger={bygninger.length}
        />
      ))}
      {bygninger.map((bygning, indeks) => (
        <ByggEndringer
          key={bygning.bygningsnr}
          index={3}
          bygning={bygning}
          bygningIndeks={indeks + 1}
          antallBygninger={bygninger.length}
        />
      ))}
    </main>
  )
}
