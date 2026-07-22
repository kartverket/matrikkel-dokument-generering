import type { TFunction } from "i18next"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { BygningsStatusKode } from "../../lib/schema/reports/bygg/koder/byggningsStatusKode.schema.ts"
import type { EndringsKode } from "../../lib/schema/reports/bygg/koder/endringsKode.schema.ts"

type HistorikkTranslationKey = "rapport.BYG0011.byggoversikt.historikk"

// Sammendrag av Byggets endringer.

type ByggHistorikk = {
  byggEndringsKode: EndringsKode
  byggStatusKode: BygningsStatusKode
  dato: string
  datoType: string
}

export function byggHistorikk(byggEndringer: BygningsEndring[]) {}
