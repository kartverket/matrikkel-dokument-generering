import { describe, expect, test } from "bun:test"
import { createI18n } from "../../src/lib/i18n/createI18n"
import { getBygningstype } from "../../src/lib/schema/reports/bygg/koder/bygningsTypeKodeSchema.ts"

describe("getBygningstype", () => {
  test.each([
    ["nb", "Enebolig", "Ikke valgt", "Ukjent bygningstype"],
    ["nn", "Einebustad", "Ikkje valt", "Ukjend bygningstype"],
  ] as const)("uses %s labels and fallbacks", (locale, known, notSelected, unknown) => {
    const { t } = createI18n(locale)

    expect(getBygningstype("111", t)).toBe(known)
    expect(getBygningstype(" ", t)).toBe(notSelected)
    expect(getBygningstype("not-a-code", t)).toBe(unknown)
  })
})
