import { describe, expect, test } from "bun:test"
import {
  formatAdresse,
  formatAdresselinjer,
  formatPoststed,
} from "../../src/lib/utils/formatAdresse.ts"

describe("adresseformattering", () => {
  test("slår sammen adresselinjer og poststed", () => {
    expect(
      formatAdresse(["Storgata 1", null, "C/O Ola"], "0155", "Oslo", "tom"),
    ).toBe("Storgata 1, C/O Ola, 0155 Oslo")
  })

  test("legger ikke tomverdien inn i en delvis adresse", () => {
    expect(formatAdresse(["Storgata 1"], null, null, "tom")).toBe("Storgata 1")
  })

  test("bruker tomverdien når alle feltene mangler", () => {
    expect(formatAdresselinjer([null, undefined], "tom")).toBe("tom")
    expect(formatPoststed(null, null, "tom")).toBe("tom")
    expect(formatAdresse([], null, null, "tom")).toBe("tom")
  })
})
