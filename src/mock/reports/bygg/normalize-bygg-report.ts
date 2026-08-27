import { byggRapportSchema } from "../../../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import type { NormalizedByggRapport } from "../../types"

export function normalizeByggRapport(report: unknown): NormalizedByggRapport {
  const parsed = byggRapportSchema.safeParse(report)

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`)
      .join("\n")
    throw new TypeError(`Report does not match BYG0011 schema:\n${issues}`)
  }

  return parsed.data
}
