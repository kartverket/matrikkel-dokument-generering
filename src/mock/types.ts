import type { Byg0011Rapport } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

export type NormalizedByggRapport = Byg0011Rapport

/**
 * Backward-compatible alias used by older fixture modules.
 * New fixtures should target NormalizedByggRapport directly.
 */
export type LegacyFixtureByggRapport = Byg0011Rapport
