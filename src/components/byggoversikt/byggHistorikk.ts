import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { BygningsStatusKode } from "../../lib/schema/reports/bygg/koder/byggningsStatusKode.schema.ts"
import type { EndringsKode } from "../../lib/schema/reports/bygg/koder/endringsKode.schema.ts"

// Sammendrag av byggets endringer.
type ByggHistorikk = {
  byggEndringsKode: EndringsKode
  byggStatusKode: BygningsStatusKode
  dato: string
  datoType: string
  byggArealEndring: number
}

export function byggHistorikk(
  byggEndringer: BygningsEndring[],
): ByggHistorikk[] {
  if (byggEndringer.length === 0) return []

  return byggEndringer.flatMap((endring) => {
    if (endring === undefined) return []

    const byggEndringsKode = endring.byggMetaEndring?.endringsKode
    const byggStatusKode = endring.byggMetaEndring?.bygningsStatusKode
    const byggArealEndring =
      endring.byggArealEndring?.bruksarealBolig.totaltAreal

    if (
      byggEndringsKode === undefined ||
      byggStatusKode === undefined ||
      byggArealEndring === undefined
    ) {
      return []
    }

    return Object.entries(endring.byggDatoEndring ?? {}).flatMap(
      ([datoType, dato]) => {
        if (dato === undefined) return []

        return [
          {
            byggEndringsKode,
            byggStatusKode,
            dato,
            datoType,
            byggArealEndring,
          },
        ]
      },
    )
  })
}
