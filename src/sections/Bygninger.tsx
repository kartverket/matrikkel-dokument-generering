import { BygningSection } from "../components/BygningSection.tsx"
import { BygningsendringSection } from "../components/BygningsendringSection.tsx"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

interface Props {
  readonly bygninger: Array<Bygning>
}

export function grupperBygninger(bygninger: Array<Bygning>) {
  return bygninger.reduce<Array<{ bygning: Bygning; endringer: Bygning[] }>>(
    (grupper, bygning) => {
    if (bygning.lopenummer == null || bygning.lopenummer === 0) {
      grupper.push({ bygning, endringer: [] })
      return grupper
    }

    const sisteGruppe = grupper.at(-1)
    if (sisteGruppe) {
      sisteGruppe.endringer.push(bygning)
    }

      return grupper
    },
    [],
  )
}

export function Bygninger({ bygninger }: Readonly<Props>) {
  if (!bygninger) return null

  const grupper = grupperBygninger(bygninger)

  return (
    <section className="pdf-buildings flex flex-col gap-8">
      {grupper.map(({ bygning, endringer }) => (
        <div
          key={`${bygning.bygningsnummer}-${bygning.lopenummer}`}
          className="pdf-building pdf-page-break-before"
        >
          <BygningSection
            bygning={bygning}
          />

          {endringer.length > 0 && (
            <>
              <hr className="w-full my-8 border border-kv-green-border" />

              {endringer.map((endring) => (
                <BygningsendringSection
                  key={`${endring.bygningsnummer}-${endring.lopenummer}`}
                  bygning={endring}
                />
              ))}
            </>
          )}
        </div>
      ))}
    </section>
  )
}
