import type {
  MassivuttrekkBruksenhet,
  MassivuttrekkEtasje,
} from "../lib/schema/reports/bygg/byg0012/massivuttrekkBygg.schema.ts"
import type { Byg0012Rapport } from "../lib/schema/reports/bygg/byg0012/massivuttrekkRapport.schema.ts"

function isoDatetime(date: string) {
  return `${date}T00:00:00Z`
}

function bruksenhet({
  id,
  antallRom,
  bruksAreal,
}: {
  id: string
  antallRom: number
  bruksAreal: number
}): MassivuttrekkBruksenhet {
  return {
    bruksenhetsNr: id,
    matrikkelNr: "3201/208/12/0",
    adresse: `Belsetveien 114 ${id}, 1348 Rykkinn`,
    bruksenhetsTypeKode: "B",
    antallRom,
    antallBad: 1,
    antallWC: 1,
    bruksAreal,
    kjokkenTilgangKode: "1",
  }
}

function etasje({
  etasjeplanKode,
  etasjeNr,
  antallBoenheter,
  boligAreal,
  annetAreal,
}: {
  etasjeplanKode: MassivuttrekkEtasje["etasjeplanKode"]
  etasjeNr: number
  antallBoenheter: number
  boligAreal: number
  annetAreal: number
}): MassivuttrekkEtasje {
  return {
    etasjeplanKode,
    etasje: etasjeNr,
    antallBoenheter,
    bruksareal: {
      boligAreal,
      annetAreal,
      totaltAreal: boligAreal + annetAreal,
    },
  }
}

const mockMassivuttrekkRapport: Byg0012Rapport = {
  rapportKode: "BYG0012",
  locale: "nb",
  metadata: {
    kommune: { kommuneNr: "3201", kommuneNavn: "Bærum" },
    koordinatSystemKode: "22",
    generertTidspunkt: "2026-07-17T10:00:00Z",
  },
  utvalgskriterier: {
    omfang: {
      inkluderBestaaendeBygg: true,
      inkluderUtgaatteBygg: false,
      inkluderBygninger: true,
      inkluderBygningsendringer: true,
      inkluderFrededeBygninger: true,
    },
    matrikkelenhet: { gnr: 208, bnr: 12 },
  },
  bygg: [
    {
      type: "Bygning",
      kommuneNr: "3201",
      bygningsnr: "18 520 621",
      bygningsStatusKode: "TB",
      statusDato: isoDatetime("1998-06-18"),
      bygningsTypeKode: "111",
      naringsgruppeKode: "X",
      nord: 6642100,
      ost: 597400,
      vannforsyningsKode: "1",
      avlopsKode: "1",
      harHeis: false,
      bebygdAreal: 95,
      bruksenheter: [
        bruksenhet({ id: "H0101", antallRom: 3, bruksAreal: 74 }),
        bruksenhet({ id: "H0102", antallRom: 2, bruksAreal: 28 }),
      ],
      etasjer: [
        etasje({
          etasjeplanKode: "H",
          etasjeNr: 1,
          antallBoenheter: 2,
          boligAreal: 80,
          annetAreal: 10,
        }),
        etasje({
          etasjeplanKode: "K",
          etasjeNr: 1,
          antallBoenheter: 0,
          boligAreal: 22,
          annetAreal: 25,
        }),
      ],
    },
    {
      type: "Bygningsendring",
      kommuneNr: "3201",
      bygningsnr: "18 520 621",
      lopeNr: 1,
      bygningsStatusKode: "FA",
      statusDato: isoDatetime("2020-08-20"),
      bygningsTypeKode: "111",
      naringsgruppeKode: "X",
      nord: 6642100,
      ost: 597400,
      vannforsyningsKode: "1",
      avlopsKode: "1",
      harHeis: false,
      bebygdAreal: 24,
      bruksenheter: [bruksenhet({ id: "H0103", antallRom: 2, bruksAreal: 40 })],
      etasjer: [
        etasje({
          etasjeplanKode: "H",
          etasjeNr: 1,
          antallBoenheter: 1,
          boligAreal: 40,
          annetAreal: 0,
        }),
      ],
    },
  ],
}

export default mockMassivuttrekkRapport
