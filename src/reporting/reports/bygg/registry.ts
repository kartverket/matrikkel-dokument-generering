import type { AnyReportDefinition } from "../../core/define-report.ts"
import { byg0011Definition } from "./byg0011/definition.ts"

export const byggReportDefinitions = [
  byg0011Definition,
] as const satisfies readonly AnyReportDefinition[]
