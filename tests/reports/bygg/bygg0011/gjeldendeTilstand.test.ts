import { describe, expect, test } from "bun:test"
import { aggregerGjeldendeTilstand } from "../../../../src/components/byggoversikt/utils/gjeldendeTilstand.ts"
import type { BygningsEndring } from "../../../../src/lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"

function endring(
  lopeNr: number,
  status: NonNullable<
    NonNullable<BygningsEndring>["byggMetaEndring"]
  >["bygningsStatusKode"],
  datoer: NonNullable<BygningsEndring>["byggDatoEndring"],
): NonNullable<BygningsEndring> {
  return {
    lopeNr,
    byggMetaEndring: { bygningsStatusKode: status },
    byggDatoEndring: datoer,
    etasjePlan: [],
    bruksenheter: [],
  }
}

describe("aggregerGjeldendeTilstand", () => {
  test("returnerer nyeste ferdigstilte endring fremfor basisregistreringen", () => {
    const basis = endring(0, "TB", {
      tattIBruk: "2010-01-01T00:00:00Z",
    })
    const ferdigstilt = endring(1, "FA", {
      ferdigattest: "2020-01-01T00:00:00Z",
    })

    expect(aggregerGjeldendeTilstand([basis, ferdigstilt])).toBe(ferdigstilt)
  })

  test("ignorerer en nyere endring som fortsatt er pågående", () => {
    const ferdigstilt = endring(1, "TB", {
      tattIBruk: "2020-01-01T00:00:00Z",
    })
    const pagaende = endring(2, "IG", {
      igangsettingstillatelse: "2022-01-01T00:00:00Z",
    })

    expect(aggregerGjeldendeTilstand([ferdigstilt, pagaende])).toBe(ferdigstilt)
  })

  test("regner midlertidig brukstillatelse som gjeldende tilstand", () => {
    const basis = endring(0, "TB", {
      tattIBruk: "2010-01-01T00:00:00Z",
    })
    const midlertidigBrukstillatelse = endring(1, "MB", {
      midlertidigBrukstillatelse: "2021-01-01T00:00:00Z",
    })

    expect(aggregerGjeldendeTilstand([basis, midlertidigBrukstillatelse])).toBe(
      midlertidigBrukstillatelse,
    )
  })

  test("bruker ferdigdato fremfor løpenummer for å finne nyeste tilstand", () => {
    const hoyereLopenummer = endring(2, "FA", {
      ferdigattest: "2020-01-01T00:00:00Z",
    })
    const senestFerdigstilt = endring(1, "FA", {
      ferdigattest: "2022-01-01T00:00:00Z",
    })

    expect(
      aggregerGjeldendeTilstand([hoyereLopenummer, senestFerdigstilt]),
    ).toBe(senestFerdigstilt)
  })

  test("bruker ferdigstatus når ferdigdato mangler", () => {
    const basis = endring(0, "TB", {
      tattIBruk: "2010-01-01T00:00:00Z",
    })
    const meldingssakFullfort = endring(1, "MF", {})

    expect(aggregerGjeldendeTilstand([basis, meldingssakFullfort])).toBe(
      meldingssakFullfort,
    )
  })

  test("faller tilbake til basisregistreringen og aldri en pågående endring", () => {
    const basis = endring(0, "RA", {
      rammetillatelse: "2018-01-01T00:00:00Z",
    })
    const pagaende = endring(1, "IG", {
      igangsettingstillatelse: "2020-01-01T00:00:00Z",
    })

    expect(aggregerGjeldendeTilstand([pagaende, basis])).toBe(basis)
    expect(aggregerGjeldendeTilstand([pagaende])).toBeUndefined()
  })
})
