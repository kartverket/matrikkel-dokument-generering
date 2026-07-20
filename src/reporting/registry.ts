import type { RapportMetadata } from "../lib/schema/core/meta.schema.ts"
import type { AnyReportDefinition } from "./core/define-report.ts"
import { createReportRegistry } from "./core/create-report-registry.ts"
import { byggReportDefinitions } from "./reports/bygg/registry.ts"

export const reportDefinitions = [
  ...byggReportDefinitions,
] as const satisfies readonly [AnyReportDefinition, ...AnyReportDefinition[]]

export type RapportType = (typeof reportDefinitions)[number]["code"]
export type RapportMeta = RapportMetadata & { rapportType: RapportType }

export const reportRegistry = createReportRegistry(reportDefinitions)
