import type { Byg0001Rapport } from "../lib/schema/reports/bygg/byg0001/bygningMassivRapport.schema.ts"
import ByggoversiktMassiv from "../sections/ByggoversiktMassiv.tsx"
import BygningsendringerMassiv from "../sections/BygningsendringerMassiv.tsx"

export function Byg0001Document({ rapport }: { rapport: Byg0001Rapport }) {
  const bygninger = (rapport.bygninger ?? []).filter(
    (b): b is NonNullable<typeof b> => b !== undefined,
  )

  return (
    <main className="mx-auto max-w-2xl">
      {bygninger.map((bygning, indeks) => (
        <ByggoversiktMassiv
          key={bygning.bygningsnr}
          index={1}
          bygning={bygning}
          bygningIndeks={indeks + 1}
          antallBygninger={bygninger.length}
        />
      ))}
      {bygninger.map((bygning, indeks) => (
        <BygningsendringerMassiv
          key={bygning.bygningsnr}
          index={2}
          bygning={bygning}
          bygningIndeks={indeks + 1}
          antallBygninger={bygninger.length}
        />
      ))}
    </main>
  )
}
