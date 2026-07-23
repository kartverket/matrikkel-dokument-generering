import type {
  Bruksenhet,
  ByggEndringsDatoer,
  BygningsEndring,
} from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Byg0011Rapport as ByggRapport } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import type { BygningsStatusKode } from "../lib/schema/reports/bygg/koder/byggningsStatusKode.schema.ts"
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

function fordelArealMellomEtasjer(
  totaltAreal: number,
  arealIForsteEtasje: number,
) {
  const forsteEtasje = Math.min(totaltAreal, arealIForsteEtasje)

  return [forsteEtasje, totaltAreal - forsteEtasje] as const
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
    bruksenhetsTypeKode: "B",
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

const h0105 = bruksenhet({
  id: "H0105",
  antallRom: 69,
  boligAreal: 42,
})
const h0106 = bruksenhet({
  id: "H0106",
  antallRom: 69,
  boligAreal: 42,
})

const h0201 = bruksenhet({
  id: "H0201",
  antallRom: 2,
  boligAreal: 2,
})

function byggEndring({
  lopeNr,
  endringsKode,
  bygningsStatusKode,
  boligAreal,
  annetAreal,
  datoer,
  bruksenheter,
}: {
  lopeNr: number
  endringsKode?: EndringsKode
  bygningsStatusKode: BygningsStatusKode
  boligAreal: number
  annetAreal: number
  datoer: ByggEndringsDatoer
  bruksenheter: Bruksenhet[]
}): BygningsEndring {
  const bruttoBoligAreal = Math.ceil(boligAreal * 1.13)
  const bruttoAnnetAreal = Math.ceil(annetAreal * 1.2)
  const [boligArealForsteEtasje, boligArealAndreEtasje] =
    fordelArealMellomEtasjer(boligAreal, 80)
  const [annetArealForsteEtasje, annetArealAndreEtasje] =
    fordelArealMellomEtasjer(annetAreal, 10)
  const [bruttoBoligArealForsteEtasje, bruttoBoligArealAndreEtasje] =
    fordelArealMellomEtasjer(bruttoBoligAreal, 90)
  const [bruttoAnnetArealForsteEtasje, bruttoAnnetArealAndreEtasje] =
    fordelArealMellomEtasjer(bruttoAnnetAreal, 12)

  return {
    lopeNr,
    byggMetaEndring: {
      endringsKode,
      bygningsStatusKode,
      bygningsTypeKode: "111",
      antallBoenheter: 1,
      naringsgruppeKode: "X",
    },
    byggArealEndring: {
      bruksarealBolig: arealFordeling(boligAreal, annetAreal),
      bruttoarealBolig: arealFordeling(bruttoBoligAreal, bruttoAnnetAreal),
      bebygdAreal: 95,
    },
    etasjePlan: [
      {
        etasjeplanKode: "H",
        etasje: 1,
        antallBoenheter: 1,
        bruksareal: arealFordeling(
          boligArealForsteEtasje,
          annetArealForsteEtasje,
        ),
        bruttoareal: arealFordeling(
          bruttoBoligArealForsteEtasje,
          bruttoAnnetArealForsteEtasje,
        ),
      },
      {
        etasjeplanKode: "K",
        etasje: 2,
        antallBoenheter: 0,
        bruksareal: arealFordeling(
          boligArealAndreEtasje,
          annetArealAndreEtasje,
        ),
        bruttoareal: arealFordeling(
          bruttoBoligArealAndreEtasje,
          bruttoAnnetArealAndreEtasje,
        ),
      },
    ],
    byggKoordinatEndring: { nord: 6642100, ost: 597400 },
    byggDatoEndring: datoer,
    aktuellEier: {
      bruksenhetsNr: "H0101",
      eierforholdKode: "H",
      identifikasjonsNr: "12051978",
      erAvdoed: false,
      navn: "Ola Nordmann",
      adresse: "Belsetveien 114, 1348 Rykkinn",
      andel: "1/2",
    },
    tiltaksHaver: {
      bruksenhetsNr: "H0101",
      kontaktPersonKode: "T",
      identifikasjonsNr: "01019012345",
      navn: "Fredrik Nordmann",
      adresse: "Storgata 1, 0155 Oslo",
    },
    bruksenheter,
  }
}

const senestFerdigstilteEndring = byggEndring({
  lopeNr: 5,
  endringsKode: "P",
  bygningsStatusKode: "TB",
  boligAreal: 140,
  annetAreal: 35,
  datoer: {
    rammetillatelse: isoDatetime("2021-03-15"),
    igangsettingstillatelse: isoDatetime("2021-05-03"),
    tattIBruk: isoDatetime("2022-09-01"),
  },
  bruksenheter: [h0101, h0102, h0103, h0104, h0105, h0106, h0201],
})

const andreEndringer: BygningsEndring[] = [
  byggEndring({
    lopeNr: 4,
    endringsKode: "T",
    bygningsStatusKode: "FA",
    boligAreal: 121,
    annetAreal: 74,
    datoer: {
      rammetillatelse: isoDatetime("2019-02-12"),
      igangsettingstillatelse: isoDatetime("2019-05-06"),
      midlertidigBrukstillatelse: isoDatetime("2020-01-22"),
      ferdigattest: isoDatetime("2020-08-20"),
    },
    bruksenheter: [h0103],
  }),
  byggEndring({
    lopeNr: 3,
    endringsKode: "P",
    bygningsStatusKode: "IG",
    boligAreal: 121,
    annetAreal: 60,
    datoer: {
      rammetillatelse: isoDatetime("2018-02-01"),
      igangsettingstillatelse: isoDatetime("2018-06-15"),
    },
    bruksenheter: [h0103],
  }),
  byggEndring({
    lopeNr: 2,
    endringsKode: "U",
    bygningsStatusKode: "RA",
    boligAreal: 102,
    annetAreal: 60,
    datoer: { rammetillatelse: isoDatetime("2016-09-12") },
    bruksenheter: [h0104],
  }),
  byggEndring({
    lopeNr: 1,
    endringsKode: "O",
    bygningsStatusKode: "MB",
    boligAreal: 102,
    annetAreal: 0,
    datoer: {
      rammetillatelse: isoDatetime("2007-02-15"),
      igangsettingstillatelse: isoDatetime("2007-05-04"),
      midlertidigBrukstillatelse: isoDatetime("2008-09-12"),
    },
    bruksenheter: [h0103],
  }),
  byggEndring({
    lopeNr: 0,
    bygningsStatusKode: "TB",
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
      bygningsNr: "18 520 621",
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
      bygningsnr: "18 520 621",
      matrikkelNr: "3201/208/12/0",
      endringer: [senestFerdigstilteEndring, ...andreEndringer],
    },
  ],
}

export default mockByggRapport
