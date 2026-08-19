import { describe, expect, test } from "bun:test"
import { byggRapportSchema } from "../../src/lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { createBygg32341Report } from "../../src/mock/reports/bygg/fixtures/bygg-32-341.ts"
import { createBygg42221Report } from "../../src/mock/reports/bygg/fixtures/bygg-42-221.ts"
import { createBygg1098Report } from "../../src/mock/reports/bygg/fixtures/bygg-109-8.ts"
import { createByggSlottsplassen1Report } from "../../src/mock/reports/bygg/fixtures/bygg-slottsplassen-1.ts"
import { createByggStasjonsveien1Report } from "../../src/mock/reports/bygg/fixtures/bygg-stasjonsveien-1.ts"
import { normalizeByggRapport } from "../../src/mock/reports/bygg/normalize-bygg-report.ts"

describe("Mock server fixtures", () => {
  const fixtures = [
    { name: "bygg-32-341", create: createBygg32341Report },
    { name: "bygg-42-221", create: createBygg42221Report },
    { name: "bygg-109-8", create: createBygg1098Report },
    { name: "bygg-slottsplassen-1", create: createByggSlottsplassen1Report },
    { name: "bygg-stasjonsveien-1", create: createByggStasjonsveien1Report },
  ]

  fixtures.forEach(({ name, create }) => {
    test(`${name} fixture validates against BYG0011 schema after normalization`, () => {
      const rawReport = create()
      const normalizedReport = normalizeByggRapport(rawReport)

      const parseResult = byggRapportSchema.safeParse(normalizedReport)

      if (!parseResult.success) {
        const errors = JSON.stringify(
          parseResult.error.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
          null,
          2,
        )
        throw new Error(`Fixture ${name} failed schema validation:\n${errors}`)
      }

      expect(parseResult.success).toBe(true)
    })
  })
})
