import type { Bruksenhet } from "../lib/schema/reports/bygg/byg0011/bruksenhet.schema"
import type { Byg0011Rapport as ByggRapport } from "../lib/schema/reports/bygg/byg0011/byg0011.schema"
import type { BygningsEndring } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"

type Bygningsstatus = BygningsEndring["bygningsstatus"]
type Bygningsdatoer = BygningsEndring["datoer"]
type Hjemmelshaver = Bruksenhet["hjemmelshavere"][number]
type Kontaktperson = Bruksenhet["kontaktpersoner"][number]

const statuser = {
  RA: { kode: 1, kortkode: "RA", navn: "Rammetillatelse", bestaaende: false },
  IG: {
    kode: 2,
    kortkode: "IG",
    navn: "Igangsettingstillatelse",
    bestaaende: false,
  },
  MB: {
    kode: 3,
    kortkode: "MB",
    navn: "Midlertidig tillatelse",
    bestaaende: false,
  },
  TB: { kode: 4, kortkode: "TB", navn: "Tatt i bruk", bestaaende: true },
  FA: { kode: 5, kortkode: "FA", navn: "Ferdigattestert", bestaaende: true },
} satisfies Record<string, Bygningsstatus>

function datoer(overrides: Partial<Bygningsdatoer>): Bygningsdatoer {
  return {
    rammetillatelse: null,
    igangsettingstillatelse: null,
    midlertidigBrukstillatelse: null,
    ferdigattest: null,
    tattIBruk: null,
    utgaattRevet: null,
    ...overrides,
  }
}

function refBruksenhet(bruksenhetsnr: string) {
  return { bruksenhetsnr }
}

function isoDatetime(date: string) {
  return `${date}T00:00:00Z`
}

const olaNordmann: Hjemmelshaver = {
  eierIdent: "12051978",
  navn: "Ola Nordmann",
  andelTeller: 1,
  andelNevner: 2,
  adresselinje1: "Belsetveien 114",
  adresselinje2: null,
  adresselinje3: null,
  postnummer: "1348",
  poststed: "Rykkinn",
  land: "Norge",
  statuskode: "AKTIV",
  eierErUtgatt: false,
  datofra: isoDatetime("2019-01-10"),
  datotil: null,
  kategorikode: "FYSISK_PERSON",
  harAndel: true,
}

const kariNordmann: Hjemmelshaver = {
  ...olaNordmann,
  eierIdent: "03111980",
  navn: "Kari Nordmann",
}

const perHansen: Hjemmelshaver = {
  ...olaNordmann,
  eierIdent: "22071965",
  navn: "Per Hansen",
  andelNevner: 1,
}

const byggmesterBob: Kontaktperson = {
  rolle: "Kontaktperson",
  eierIdent: "987654321",
  navn: "Byggmester Bob AS",
  adresselinje1: "Håndverkerveien 5",
  adresselinje2: null,
  adresselinje3: null,
  postnummeromradenr: "0666",
  postnummeromradenavn: "Oslo",
  land: "Norge",
  datofra: isoDatetime("2019-05-01"),
  kategorikode: "JURIDISK_PERSON",
  kontaktpersonKode: "ANSVARLIG_SOKER",
  statuskode: "AKTIV",
  eierErUtgatt: false,
}

const gjeldendeEndring: BygningsEndring = {
  lopenr: 5,
  endringskode: null,
  beskrivelse: null,
  bygningsstatus: statuser.TB,
  antallBoenheter: 1,
  bruksareal: { bolig: 140, annet: 35, totalt: 175 },
  bruttoareal: { bolig: 158, annet: 44, totalt: 202 },
  bebygdAreal: 95,
  koordinat: { nord: 6642100, ost: 597400 },
  datoer: datoer({
    rammetillatelse: isoDatetime("2019-03-15"),
    igangsettingstillatelse: isoDatetime("2019-05-01"),
    ferdigattest: isoDatetime("2020-08-20"),
    tattIBruk: isoDatetime("2020-09-01"),
  }),

  bruksenheter: [refBruksenhet("H0101")],
  tiltakshavere: [
    {
      rolle: "Tiltakshaver",
      eierIdent: "01019012345",
      navn: "Fredrik Nordmann",
      adresselinje1: "Storgata 1",
      adresselinje2: null,
      adresselinje3: null,
      postnummeromradenr: "0155",
      postnummeromradenavn: "Oslo",
      land: "Norge",
      bruksenhetsnr: "H0101",
      datofra: isoDatetime("2019-03-15"),
      kategorikode: "FYSISK_PERSON",
      kontaktpersonKode: null,
      statuskode: "AKTIV",
      eierErUtgatt: false,
    },
  ],
  kulturminner: [
    {
      id: "KM-12345",
      navn: "Storgata 1",
      status: "Regulert",
      kategori: "SEFRAK-registrert bygning",
    },
  ],
}

const historiskeEndringer: BygningsEndring[] = [
  {
    ...gjeldendeEndring,
    lopenr: 4,
    endringskode: "Tilbygg",
    bygningsstatus: statuser.FA,
    bruksareal: { bolig: 121, annet: 74, totalt: 195 },
    datoer: datoer({
      rammetillatelse: isoDatetime("2016-09-12"),
      igangsettingstillatelse: isoDatetime("2017-03-06"),
      ferdigattest: isoDatetime("2020-01-22"),
    }),
    bruksenheter: [refBruksenhet("H0103")],
  },
  {
    ...gjeldendeEndring,
    lopenr: 3,
    endringskode: "Påbygg",
    bygningsstatus: statuser.IG,
    bruksareal: { bolig: 121, annet: 60, totalt: 181 },
    datoer: datoer({
      rammetillatelse: isoDatetime("2016-09-12"),
      igangsettingstillatelse: isoDatetime("2017-03-06"),
    }),
    bruksenheter: [refBruksenhet("H0103")],
  },
  {
    ...gjeldendeEndring,
    lopenr: 2,
    endringskode: "Underbygg",
    bygningsstatus: statuser.RA,
    bruksareal: { bolig: 102, annet: 60, totalt: 162 },
    datoer: datoer({ rammetillatelse: isoDatetime("2016-09-12") }),
    bruksenheter: [refBruksenhet("H0104")],
  },
  {
    ...gjeldendeEndring,
    lopenr: 1,
    endringskode: "Ombygging",
    beskrivelse: "Midlertidig tillatelse er gitt.",
    bygningsstatus: statuser.MB,
    bruksareal: { bolig: 102, annet: 0, totalt: 102 },
    datoer: datoer({
      midlertidigBrukstillatelse: isoDatetime("2008-09-12"),
    }),
    bruksenheter: [refBruksenhet("H0103")],
  },
  {
    ...gjeldendeEndring,
    lopenr: 0,
    bygningsstatus: statuser.TB,
    bruksareal: { bolig: 102, annet: 0, totalt: 102 },
    datoer: datoer({ tattIBruk: isoDatetime("1998-06-18") }),
    bruksenheter: [refBruksenhet("H0101"), refBruksenhet("H0102")],
  },
]

const mockByggRapport: ByggRapport = {
  rapportType: "BYG0011",
  kommune: { nr: "3201", navn: "Bærum" },
  koordinatsystem: "EUREF89 UTM sone 32",
  locale: "nb",
  generertTidspunkt: "2026-07-17T10:00:00Z",
  utvalgskriterier: {
    omfang: {
      inkluderBestaaendeBygg: true,
      inkluderUtgaatteBygg: false,
      inkluderBygninger: true,
      inkluderBygningsendringer: true,
      inkluderFrededeBygninger: true,
    },
    bygning: {
      bygningsnr: "12345678",
      bygningstyper: [{ kode: "111" }],
    },
    adresse: {
      adressekode: "1000",
      bruksenhetsnr: "H0101",
      adressenavn: "Storgata",
      nr: 1,
      utenBokstav: true,
    },
    matrikkelenhet: { gnr: 208, bnr: 12 },
    hjemmelshaver: {
      etternavn: "Nordmann",
      fornavn: "Ola",
    },
    bygningsstatus: {
      naavaerende: ["Tatt i bruk"],
      tidligere: [],
      periodeFra: isoDatetime("2019-01-01"),
    },
    sokevindu: {
      nord: 6642000,
      ost: 597300,
      syd: 6642200,
      vest: 597500,
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
      bygningsType: { kode: "111" },
      naeringsgruppe: "Bolig",
      antallBoenheter: 1,
      bruksArealBolig: { bolig: 140, annet: 35, totalt: 175 },
      bruttoArealBolig: { bolig: 158, annet: 44, totalt: 202 },
      matrikkelenhet: "208/12",
      etasjePlan: [
        {
          etasjeplan: "Hovedetasje",
          etasje: 1,
          antallBoenheter: 1,
          bruksareal: { bolig: 80, annet: 10, totalt: 90 },
          bruttoareal: { bolig: 90, annet: 12, totalt: 102 },
        },
        {
          etasjeplan: "Annenetasje",
          etasje: 2,
          antallBoenheter: 0,
          bruksareal: { bolig: 60, annet: 10, totalt: 70 },
          bruttoareal: { bolig: 68, annet: 12, totalt: 80 },
        },
      ],
      bruksenheter: [
        {
          id: "H0101",
          nummer: "H0101",
          type: "Bolig",
          seksjon: "Seksjon 3201-94/309/0/1",
          adresse: "Belsetveien 114 H0101, 1348 Rykkinn",
          etasje: "Hovedetasje (H01)",
          antallRom: 3,
          kjokkentilgang: true,
          antallBad: 1,
          antallWc: 1,
          arealfordeling: {
            bebygdAreal: 74,
            bruksareal: { bolig: 74, annet: 0, totalt: 74 },
            koordinat: { nord: 6642100, ost: 597400 },
            etasjeplan: [
              {
                etasjeplan: "Hovedetasje",
                etasje: 1,
                antallBoenheter: 1,
                bruksareal: { bolig: 74, annet: 0, totalt: 74 },
                bruttoareal: { bolig: 80, annet: 0, totalt: 80 },
              },
            ],
          },
          hjemmelshavere: [olaNordmann, kariNordmann],
          kontaktpersoner: [byggmesterBob],
        },
        {
          id: "H0102",
          nummer: "H0102",
          type: "Bolig",
          seksjon: "Seksjon 3201-94/309/0/2",
          adresse: "Belsetveien 114 H0102, 1348 Rykkinn",
          etasje: "Loft (L01)",
          antallRom: 2,
          kjokkentilgang: true,
          antallBad: 1,
          antallWc: 1,
          arealfordeling: {
            bebygdAreal: 28,
            bruksareal: { bolig: 28, annet: 0, totalt: 28 },
            koordinat: { nord: 6642100, ost: 597400 },
            etasjeplan: [
              {
                etasjeplan: "Loft",
                etasje: 1,
                antallBoenheter: 1,
                bruksareal: { bolig: 28, annet: 0, totalt: 28 },
                bruttoareal: { bolig: 31, annet: 0, totalt: 31 },
              },
            ],
          },
          hjemmelshavere: [perHansen],
          kontaktpersoner: [],
        },
        {
          id: "H0103",
          nummer: "H0103",
          type: "Bolig",
          seksjon: "Seksjon 3201-94/309/0/3",
          adresse: "Belsetveien 114 H0103, 1348 Rykkinn",
          etasje: "Kjeller (K01)",
          antallRom: 2,
          kjokkentilgang: true,
          antallBad: 1,
          antallWc: 1,
          arealfordeling: {
            bebygdAreal: 40,
            bruksareal: { bolig: 40, annet: 0, totalt: 40 },
            koordinat: { nord: 6644118, ost: 254384 },
            etasjeplan: [
              {
                etasjeplan: "Kjeller",
                etasje: 1,
                antallBoenheter: 1,
                bruksareal: { bolig: 40, annet: 0, totalt: 40 },
                bruttoareal: { bolig: 44, annet: 0, totalt: 44 },
              },
            ],
          },
          hjemmelshavere: [
            {
              ...olaNordmann,
              andelNevner: 1,
            },
          ],
          kontaktpersoner: [],
        },
      ],
      endringer: [gjeldendeEndring, ...historiskeEndringer],
    },
  ],
}

export default mockByggRapport
