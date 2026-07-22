import { describe, expect, test } from "bun:test"
import { byggHistorikk } from "../../../src/components/byggoversikt/utils/byggHistorikk.ts"
import type { BygningsEndring } from "../../../src/lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import mockByggRapport from "../../../src/mock/byggRapport.ts"

describe("byggHistorikk", () => {
  test("lager et kompakt sammendrag av alle viktige endringer", () => {
    const endringer = mockByggRapport.bygninger[0]?.endringer ?? []

    const historikk = byggHistorikk(endringer)

    expect(historikk.map(({ lopeNr }) => lopeNr)).toEqual([5, 4, 3, 2, 1, 0])
    expect(historikk.find(({ lopeNr }) => lopeNr === 4)).toMatchObject({
      byggEndringsKode: "1",
      byggStatusKode: "FA",
      dato: "2020-01-22T00:00:00Z",
      totalBruksArealEndring: 14,
      arealEndringer: [{ type: "annet", areal: 14, handling: "lagtTil" }],
      beroerteBruksenheter: ["H0103"],
    })
    expect(historikk.find(({ lopeNr }) => lopeNr === 3)).toMatchObject({
      byggStatusKode: "IG",
      arealEndringer: [{ type: "bolig", areal: 19, handling: "lagtTil" }],
    })
    expect(historikk.find(({ lopeNr }) => lopeNr === 2)).toMatchObject({
      byggStatusKode: "RA",
      arealEndringer: [{ type: "annet", areal: 60, handling: "godkjent" }],
    })
    expect(historikk.find(({ lopeNr }) => lopeNr === 1)).toMatchObject({
      byggStatusKode: "MB",
      arealEndringer: [],
    })
    expect(historikk.find(({ lopeNr }) => lopeNr === 0)).toMatchObject({
      byggStatusKode: "TB",
      arealEndringer: [],
      erFoersteVedtak: true,
    })
  })

  test("viser totalareal bare som reserve når arealtype mangler", () => {
    const endringer: BygningsEndring[] = [
      {
        lopeNr: 0,
        byggDatoEndring: { tattIBruk: "2020-01-01T00:00:00Z" },
        byggArealEndring: {
          bruksarealBolig: { totaltAreal: 100 },
          bruttoarealBolig: {},
        },
        etasjePlan: [],
        bruksenheter: [],
      },
      {
        lopeNr: 1,
        byggDatoEndring: { ferdigattest: "2021-01-01T00:00:00Z" },
        byggArealEndring: {
          bruksarealBolig: { totaltAreal: 114 },
          bruttoarealBolig: {},
        },
        etasjePlan: [],
        bruksenheter: [],
      },
    ]

    expect(byggHistorikk(endringer)[0]?.arealEndringer).toEqual([
      { type: "totalt", areal: 14, handling: "lagtTil" },
    ])
  })

  test("finner etasjene som faktisk er endret", () => {
    const etasje = (annetAreal: number) => ({
      etasjeplan: "Hovedetasje",
      etasje: 1,
      bruksareal: {
        boligAreal: 80,
        annetAreal,
        totaltAreal: 80 + annetAreal,
      },
      bruttoareal: {},
    })
    const endringer: BygningsEndring[] = [
      {
        lopeNr: 0,
        byggDatoEndring: { tattIBruk: "2020-01-01T00:00:00Z" },
        etasjePlan: [etasje(0)],
        bruksenheter: [],
      },
      {
        lopeNr: 1,
        byggDatoEndring: { ferdigattest: "2021-01-01T00:00:00Z" },
        etasjePlan: [etasje(14)],
        bruksenheter: [],
      },
    ]

    expect(byggHistorikk(endringer)[0]?.beroerteEtasjer).toEqual([
      { etasje: 1, etasjeplan: "Hovedetasje" },
    ])
  })

  test("ignorerer tomme og udefinerte endringer", () => {
    expect(
      byggHistorikk([
        undefined,
        { lopeNr: 0, etasjePlan: [], bruksenheter: [] },
      ]),
    ).toEqual([])
  })
})
