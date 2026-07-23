import type {
  Bruksenhet,
  ByggEndringsDatoer,
  BygningsEndring,
} from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Byg0011Rapport as ByggRapport } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import type { EndringsKode } from "../lib/schema/reports/bygg/koder/endringsKode.schema.ts"

function isoDatetime(date: string) {
  return `${date}T00:00:00Z`
}

function arealFordeling(boligAreal: number, annetAreal: number) {
  return {
    boligAreal,
    annetAreal,
    totaltAreal: boligAreal + annetAreal,
  }
}

function bruksenhet({
  id,
  antallRom,
  boligAreal,
}: {
  id: string
  antallRom: number
  boligAreal: number
}): Bruksenhet {
  return {
    bruksenhetsNr: id,
    bruksenhetsTypeKode: "0",
    bruksAreal: boligAreal,
    adresse: `Belsetveien 114 ${id}, 1348 Rykkinn`,
    matrikkelNr: "3201/208/12/0",
    antallRom,
    antallBad: 1,
    antallWC: 1,
    kjokkenTilgangKode: "1",
  }
}

const h0101 = bruksenhet({
  id: "H0101",
  antallRom: 3,
  boligAreal: 74,
})

const h0102 = bruksenhet({
  id: "H0102",
  antallRom: 2,
  boligAreal: 28,
})

const h0103 = bruksenhet({
  id: "H0103",
  antallRom: 2,
  boligAreal: 40,
})

const h0104 = bruksenhet({
  id: "H0104",
  antallRom: 2,
  boligAreal: 42,
})

function byggEndring({
  lopeNr,
  endringsKode,
  boligAreal,
  annetAreal,
  datoer,
  bruksenheter,
}: {
  lopeNr: number
  endringsKode?: EndringsKode
  boligAreal: number
  annetAreal: number
  datoer: ByggEndringsDatoer
  bruksenheter: Bruksenhet[]
}): BygningsEndring {
  return {
    lopeNr,
    byggMetaEndring: {
      endringsKode,
      bygningsStatusKode: "TB",
      bygningsTypeKode: "111",
      antallBoenheter: 1,
      naeringsgruppe: "Bolig",
    },
    byggArealEndring: {
      bruksarealBolig: arealFordeling(boligAreal, annetAreal),
      bruttoarealBolig: arealFordeling(
        Math.ceil(boligAreal * 1.13),
        Math.ceil(annetAreal * 1.2),
      ),
      bebygdAreal: 95,
    },
    etasjePlan: [
      {
        etasjeplanKode: "1",
        etasje: 1,
        antallBoenheter: 1,
        bruksareal: arealFordeling(80, 10),
        bruttoareal: arealFordeling(90, 12),
      },
      {
        etasjeplanKode: "1",
        etasje: 2,
        antallBoenheter: 0,
        bruksareal: arealFordeling(60, 10),
        bruttoareal: arealFordeling(68, 12),
      },
    ],
    byggKoordinatEndring: { nord: 6642100, ost: 597400 },
    byggDatoEndring: datoer,
    aktuellEier: {
      bruksenhetsNr: "H0101",
      eierforholdKode: "1",
      identifikasjonsNr: "12051978",
      erAvdoed: false,
      navn: "Ola Nordmann",
      adresse: "Belsetveien 114, 1348 Rykkinn",
      andel: "1/2",
    },
    tiltaksHaver: {
      bruksenhetsNr: "H0101",
      kontaktPersonKode: "1",
      identifikasjonsNr: "01019012345",
      navn: "Fredrik Nordmann",
      adresse: "Storgata 1, 0155 Oslo",
    },
    bruksenheter,
  }
}

const gjeldendeEndring = byggEndring({
  lopeNr: 5,
  boligAreal: 140,
  annetAreal: 35,
  datoer: {
    rammetillatelse: isoDatetime("2019-03-15"),
    igangsettingstillatelse: isoDatetime("2019-05-01"),
    ferdigattest: isoDatetime("2020-08-20"),
    tattIBruk: isoDatetime("2020-09-01"),
  },
  bruksenheter: [h0101, h0102, h0103],
})

const historiskeEndringer: BygningsEndring[] = [
  byggEndring({
    lopeNr: 4,
    endringsKode: "1",
    boligAreal: 121,
    annetAreal: 74,
    datoer: {
      rammetillatelse: isoDatetime("2016-09-12"),
      igangsettingstillatelse: isoDatetime("2017-03-06"),
      ferdigattest: isoDatetime("2020-01-22"),
    },
    bruksenheter: [h0103],
  }),
  byggEndring({
    lopeNr: 3,
    endringsKode: "2",
    boligAreal: 121,
    annetAreal: 60,
    datoer: {
      rammetillatelse: isoDatetime("2016-09-12"),
      igangsettingstillatelse: isoDatetime("2017-03-06"),
    },
    bruksenheter: [h0103],
  }),
  byggEndring({
    lopeNr: 2,
    endringsKode: "3",
    boligAreal: 102,
    annetAreal: 60,
    datoer: { rammetillatelse: isoDatetime("2016-09-12") },
    bruksenheter: [h0104],
  }),
  byggEndring({
    lopeNr: 1,
    endringsKode: "4",
    boligAreal: 102,
    annetAreal: 0,
    datoer: {
      midlertidigBrukstillatelse: isoDatetime("2008-09-12"),
    },
    bruksenheter: [h0103],
  }),
  byggEndring({
    lopeNr: 0,
    boligAreal: 102,
    annetAreal: 0,
    datoer: { tattIBruk: isoDatetime("1998-06-18") },
    bruksenheter: [h0101, h0102],
  }),
]

const mockByggRapport: ByggRapport = {
  rapportKode: "BYG0011",
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
    bygning: {
      bygningsNr: "12345678",
      bygningstyper: ["111"],
    },
    adresse: {
      adresseKode: "1000",
      bruksenhetsNr: "H0101",
      adresseNavn: "Storgata",
      adresseNr: 1,
      utenBokstav: true,
    },
    matrikkelenhet: { gnr: 208, bnr: 12 },
    aktor: {
      etternavn: "Nordmann",
      fornavn: "Ola",
    },
    bygningsstatus: {
      naavaerende: ["TB"],
      tidligere: [],
      periodeFra: isoDatetime("2019-01-01"),
    },
    sokevindu: {
      nord: 6642200,
      ost: 597500,
      syd: 6642000,
      vest: 597300,
    },
    subrapporter: {
      inkluderEtasjer: true,
      inkluderBruksenheter: true,
      inkluderTiltakshavere: true,
      inkluderKontaktpersoner: true,
      inkluderHjemmelshavere: true,
      inkluderKulturminner: true,
    },
  },
  bygninger: [
    {
      bygningsnr: "12345678",
      matrikkelNr: "3201/208/12/0",
      endringer: [gjeldendeEndring, ...historiskeEndringer],
    },
  ],
}

export default mockByggRapport
