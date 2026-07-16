import { describe, expect, test } from "bun:test"
import { cn } from "../../src/lib/utils/cn.ts"

describe("cn", () => {
  test("slår sammen betingede klasser", () => {
    expect(cn("px-2", false, null, { "font-bold": true })).toBe(
      "px-2 font-bold",
    )
  })

  test("beholder siste Tailwind-klasse ved konflikt", () => {
    expect(cn("gap-x-7 text-sm", "gap-x-8 text-lg")).toBe("gap-x-8 text-lg")
  })
})
