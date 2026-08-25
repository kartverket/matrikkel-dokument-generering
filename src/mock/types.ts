import type { Byg0011Rapport } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

export type NormalizedByggRapport = Byg0011Rapport

/**
 * BYG0011 fixture report format allowing legacy/convenience field names.
 * Converted to NormalizedByggRapport by the normalization layer.
 * This adapter layer exists to keep fixture data concise while schema compliance is enforced at load-time.
 */
export type LegacyFixtureByggRapport = Byg0011Rapport
