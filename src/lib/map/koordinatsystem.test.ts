import { describe, expect, test } from "bun:test"
import { koordinatsystemSchema, resolveEpsg } from "./koordinatsystem"

describe("resolveEpsg", () => {
  test("støtter alle EUREF89 UTM-sonene fra mock-generatoren", () => {
    for (let sone = 32; sone <= 35; sone++) {
      const epsg: number | undefined = resolveEpsg(
        `${sone - 10} - EUREF89 UTM Sone ${sone}`,
      )
      expect(epsg).toBe(25800 + sone)
    }
  })

  test("støtter alle EUREF89 NTM-sonene fra mock-generatoren", () => {
    for (let sone = 5; sone <= 30; sone++) {
      const epsg: number | undefined = resolveEpsg(
        `${100 + sone} - EUREF89 NTM Sone ${sone}`,
      )
      expect(epsg).toBe(5100 + sone)
    }
  })

  test("støtter alle WGS84 UTM-sonene fra mock-generatoren", () => {
    for (let sone = 32; sone <= 35; sone++) {
      const epsg: number | undefined = resolveEpsg(
        `${300 + sone} - WGS84 UTM Sone ${sone}`,
      )
      expect(epsg).toBe(32600 + sone)
    }
  })

  test("støtter eksplisitte EPSG-koder for støttede meterbaserte systemer", () => {
    expect(resolveEpsg("EPSG:25833")).toBe(25833)
    expect(resolveEpsg("EPSG:32633")).toBe(32633)
    expect(resolveEpsg("EPSG:5112")).toBe(5112)
  })

  test("avviser ukjente, feilmerkede og ikke-meterbaserte systemer", () => {
    expect(resolveEpsg("ukjent")).toBeUndefined()
    expect(resolveEpsg("22 - EUREF89 UTM Sone 33")).toBeUndefined()
    expect(resolveEpsg("EPSG:3857")).toBeUndefined()
  })
})

describe("koordinatsystemSchema", () => {
  test("avviser et koordinatsystem som kartet ikke kan gjengi korrekt", () => {
    expect(koordinatsystemSchema.safeParse("ukjent").success).toBe(false)
  })
})
