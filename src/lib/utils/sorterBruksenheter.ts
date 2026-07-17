import type { Bruksenhet } from "../schema/reports/BYG0011.ts"

const bruksenhetsnummerCollator = new Intl.Collator("nb", { numeric: true })

export function sorterBruksenheterEtterNummer<
  T extends Pick<Bruksenhet, "nummer">,
>(bruksenheter: readonly T[]): T[] {
  return bruksenheter.toSorted((a, b) => {
    if (a.nummer == null) return b.nummer == null ? 0 : 1
    if (b.nummer == null) return -1

    return bruksenhetsnummerCollator.compare(a.nummer, b.nummer)
  })
}
