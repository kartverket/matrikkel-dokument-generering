import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { BygningsStatusKode } from "../../lib/schema/reports/bygg/koder/byggningsStatusKode.schema.ts"
import type { EndringsKode } from "../../lib/schema/reports/bygg/koder/endringsKode.schema.ts"

// Sammendrag av byggets endringer.
type ByggHistorikk = {
  byggEndringsKode?: EndringsKode
  byggStatusKode?: BygningsStatusKode
  // dato: string
  // datoType: string
  totalBruksArealEndring: number
  totalBruttoArealEndring: number
}

export function byggHistorikk(
  byggEndringer: BygningsEndring[],
): ByggHistorikk[] {
  if (byggEndringer.length === 0) return []

  return byggEndringer.flatMap((endring) => {
    if (endring === undefined) return []

    const totalBruksArealEndring =
      endring.byggArealEndring?.bruksarealBolig.totaltAreal

    const totalBruttoArealEndring =
      endring.byggArealEndring?.bruttoarealBolig.totaltAreal

    // Returner tom liste dersom ingen areal endringer har skjedd
    if (
      totalBruksArealEndring === undefined ||
      totalBruksArealEndring === 0 ||
      totalBruttoArealEndring === undefined ||
      totalBruttoArealEndring === 0
    ) {
      return []
    }

    return [
      {
        byggEndringsKode: endring.byggMetaEndring?.endringsKode,
        byggStatusKode: endring.byggMetaEndring?.bygningsStatusKode,
        totalBruksArealEndring,
        totalBruttoArealEndring,
      },
    ]
  })
}
