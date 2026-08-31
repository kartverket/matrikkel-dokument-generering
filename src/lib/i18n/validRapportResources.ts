import type { RapportKode } from "../schema/core/koder/rapportKode.schema.ts"

export type ValidRapportResources = {
  [K in RapportKode]: { rapportTittel: string } & Record<string, any>
}
