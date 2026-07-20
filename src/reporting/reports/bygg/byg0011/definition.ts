import { renderDocument } from "../../../../Document.tsx"
import { byg0011Schema } from "../../../../lib/schema/reports/bygg/byg0011/byg0011.schema.ts"
import { defineReport } from "../../../core/define-report.ts"

export const byg0011Definition = defineReport({
  code: "BYG0011",
  schema: byg0011Schema,
  render: renderDocument,
})
