import type { RapportKode } from "../schema/core/koder/rapportKode.schema.ts"

export type ValidRapportResources = {
  // biome-ignore lint/suspicious/noExplicitAny: i18n resources require flexible structure
  [K in RapportKode]: { rapportTittel: string } & Record<string, any>
}
