import { describe, expect, test } from "bun:test"
import { byggHistorikk } from "../../../../src/components/byggoversikt/utils/byggHistorikk"
import type { BygningsEndring } from "../../../../src/lib/schema/reports/bygg/byg0011/byggEndring.schema"
import mockByggRapport from "../../../../src/mock/byggRapport"

describe("byggHistorikk", () => {
  test("lager et kompakt sammendrag av alle viktige endringer", () => {
    const endringer = mockByggRapport.bygninger[0]?.endringer ?? []

    const historikk = byggHistorikk(endringer)

    expect(historikk.map(({ lopeNr }) => lopeNr)).toEqual([5, 4, 3, 2, 1, 0])
    expect(historikk.find(({ lopeNr }) => lopeNr === 5)).toMatchObject({
      byggEndringsKode: "4",
      byggStatusKode: "TB",
      dato: "2022-09-01T00:00:00Z",
    })
    expect(historikk.find(({ lopeNr }) => lopeNr === 4)).toMatchObject({
      byggEndringsKode: "1",
      byggStatusKode: "FA",
      dato: "2020-08-20T00:00:00Z",
      totalBruksArealEndring: 14,
      arealEndringer: [{ type: "annet", areal: 14, handling: "lagtTil" }],
      berorteBruksenheter: ["H0103"],
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
      erForsteVedtak: true,
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

  test("sorterer på løpenummer synkende, uavhengig av dato", () => {
    const endringer: BygningsEndring[] = [
      {
        lopeNr: 2,
        byggDatoEndring: { ferdigattest: "2025-06-27" },
        etasjePlan: [],
        bruksenheter: [],
      },
      {
        lopeNr: 0,
        byggDatoEndring: { tattIBruk: "2022-07-07" },
        etasjePlan: [],
        bruksenheter: [],
      },
      {
        lopeNr: 1,
        byggDatoEndring: { utgaattRevet: "2007-03-16" },
        etasjePlan: [],
        bruksenheter: [],
      },
      {
        lopeNr: 4,
        byggDatoEndring: { midlertidigBrukstillatelse: "2002-06-17" },
        etasjePlan: [],
        bruksenheter: [],
      },
      {
        lopeNr: 3,
        byggMetaEndring: { bygningsStatusKode: "GR" },
        etasjePlan: [],
        bruksenheter: [],
      },
    ]

    expect(byggHistorikk(endringer).map(({ lopeNr }) => lopeNr)).toEqual([
      4, 3, 2, 1, 0,
    ])
  })

  test("avrunder arealendringer til maksimalt to desimaler", () => {
    const endring = (
      lopeNr: number,
      annetAreal: number,
    ): NonNullable<BygningsEndring> => ({
      lopeNr,
      byggDatoEndring: { ferdigattest: `202${lopeNr}-01-01` },
      byggArealEndring: {
        bruksarealBolig: {
          annetAreal,
          totaltAreal: annetAreal,
        },
        bruttoarealBolig: {},
      },
      etasjePlan: [],
      bruksenheter: [],
    })
    const historikk = byggHistorikk([
      endring(0, 0),
      endring(1, 50.800000000000004),
      endring(2, 13.674),
    ])

    expect(
      historikk.find(({ lopeNr }) => lopeNr === 1)?.arealEndringer,
    ).toEqual([{ type: "annet", areal: 50.8, handling: "lagtTil" }])
    expect(
      historikk.find(({ lopeNr }) => lopeNr === 2)?.arealEndringer,
    ).toEqual([{ type: "annet", areal: 37.13, handling: "fjernet" }])
  })

  test("finner etasjene som faktisk er endret", () => {
    const etasje = (annetAreal: number) => ({
      etasjeplanKode: "1" as const,
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

    expect(byggHistorikk(endringer)[0]?.berorteEtasjer).toEqual([
      { etasje: 1, etasjeplanKode: "1" },
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
