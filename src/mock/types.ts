import type { Byg0011Rapport } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

/**
 * BYG0011-specific normalized report output matching the schema.
 * Used for fixture validation and API responses.
 *
 * @internal Will be refactored to generic form when multi-rapport support is added.
 */
export type NormalizedByggRapport = Byg0011Rapport

type NormalizedBygning = NonNullable<NormalizedByggRapport["bygninger"]>[number]
type NormalizedEndring = NonNullable<
  NonNullable<NormalizedBygning["endringer"]>[number]
>

/**
 * Fixture format allowing singular convenience fields (aktuellEier instead of aktuelleEiere).
 * Used internally by fixture creators; converted to normalized format during loading.
 * This is a legacy adapter to keep fixtures simple while the normalizer handles the conversion.
 */
export type LegacyByggEndring = Omit<
  NormalizedEndring,
  "aktuelleEiere" | "kulturminner" | "sefrakIder" | "tiltaksHavere"
> & {
  aktuelleEiere?: NormalizedEndring["aktuelleEiere"]
  aktuellEier?: NormalizedEndring["aktuelleEiere"][number]
  harKulturminne?: boolean
  kulturminner?: NormalizedEndring["kulturminner"]
  sefrakIder?: string[]
  sefrakId?: string
  tiltaksHavere?: NormalizedEndring["tiltaksHavere"]
  tiltaksHaver?: NormalizedEndring["tiltaksHavere"][number]
}

type LegacyBygning = Omit<NormalizedBygning, "endringer"> & {
  endringer: LegacyByggEndring[]
}

/**
 * BYG0011 fixture report format allowing legacy/convenience field names.
 * Converted to NormalizedByggRapport by the normalization layer.
 * This adapter layer exists to keep fixture data concise while schema compliance is enforced at load-time.
 */
export type LegacyFixtureByggRapport = Omit<
  NormalizedByggRapport,
  "bygninger"
> & {
  bygninger: LegacyBygning[]
}
