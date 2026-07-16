import type {
  Bruksenhet,
  ByggRapport,
  Bygningsendring,
} from "../lib/schema/byggRapportSchema"

type Bygningsstatus = Bygningsendring["bygningsstatus"]
type Bygningsdatoer = Bygningsendring["datoer"]
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
  datofra: "2019-01-10",
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
  datofra: "2019-05-01",
  kategorikode: "JURIDISK_PERSON",
  kontaktpersonKode: "ANSVARLIG_SOKER",
  statuskode: "AKTIV",
  eierErUtgatt: false,
}

const gjeldendeEndring: Bygningsendring = {
  id: 1001,
  lopenr: 5,
  endringskode: null,
  beskrivelse: null,
  bygningsstatus: statuser.TB,
  antallBoenheter: 1,
  bruksareal: { bolig: 140, annet: 35 },
  bruttoareal: { bolig: 158, annet: 44 },
  bebygdAreal: 95,
  koordinat: { nord: 6642100, ost: 597400 },
  datoer: datoer({
    rammetillatelse: "2019-03-15",
    igangsettingstillatelse: "2019-05-01",
    ferdigattest: "2020-08-20",
    tattIBruk: "2020-09-01",
  }),
  etasjeplan: [
    {
      etasjeplan: "Hovedetasje",
      etasje: 1,
      antallBoenheter: 1,
      bruksareal: { bolig: 80, annet: 10 },
      bruttoareal: { bolig: 90, annet: 12 },
    },
    {
      etasjeplan: "Annenetasje",
      etasje: 2,
      antallBoenheter: 0,
      bruksareal: { bolig: 60, annet: 10 },
      bruttoareal: { bolig: 68, annet: 12 },
    },
  ],
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
      datofra: "2019-03-15",
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

const historiskeEndringer: Bygningsendring[] = [
  {
    ...gjeldendeEndring,
    id: 1002,
    lopenr: 4,
    endringskode: "Tilbygg",
    bygningsstatus: statuser.FA,
    bruksareal: { bolig: 121, annet: 74 },
    datoer: datoer({
      rammetillatelse: "2016-09-12",
      igangsettingstillatelse: "2017-03-06",
      ferdigattest: "2020-01-22",
    }),
    bruksenheter: [refBruksenhet("H0103")],
  },
  {
    ...gjeldendeEndring,
    id: 1003,
    lopenr: 3,
    endringskode: "Påbygg",
    bygningsstatus: statuser.IG,
    bruksareal: { bolig: 121, annet: 60 },
    datoer: datoer({
      rammetillatelse: "2016-09-12",
      igangsettingstillatelse: "2017-03-06",
    }),
    bruksenheter: [refBruksenhet("H0103")],
  },
  {
    ...gjeldendeEndring,
    id: 1004,
    lopenr: 2,
    endringskode: "Underbygg",
    bygningsstatus: statuser.RA,
    bruksareal: { bolig: 102, annet: 60 },
    datoer: datoer({ rammetillatelse: "2016-09-12" }),
    bruksenheter: [refBruksenhet("H0104")],
  },
  {
    ...gjeldendeEndring,
    id: 1005,
    lopenr: 1,
    endringskode: "Ombygging",
    beskrivelse: "Midlertidig tillatelse er gitt.",
    bygningsstatus: statuser.MB,
    bruksareal: { bolig: 102, annet: 0 },
    datoer: datoer({ midlertidigBrukstillatelse: "2008-09-12" }),
    bruksenheter: [refBruksenhet("H0103")],
  },
  {
    ...gjeldendeEndring,
    id: 1006,
    lopenr: 0,
    bygningsstatus: statuser.TB,
    bruksareal: { bolig: 102, annet: 0 },
    datoer: datoer({ tattIBruk: "1998-06-18" }),
    bruksenheter: [refBruksenhet("H0101"), refBruksenhet("H0102")],
  },
]

const mockByggRapport: ByggRapport = {
  rapportType: "BYG0011",
  kommune: { nr: "3201", navn: "Bærum" },
  koordinatsystem: "EUREF89 UTM sone 32",
  locale: "nb",
  utvalgskriterier: {
    omfang: {
      bestaaendeBygg: true,
      utgaatteBygg: false,
      bygninger: true,
      bygningsendringer: true,
      frededeBygninger: "Inkluder",
    },
    bygning: {
      bygningsnr: "12345678",
      bygningstyper: [{ kode: 111, navn: "Enebolig" }],
      lopenr: null,
    },
    adresse: {
      adressekode: "1000",
      bruksenhetsnr: "H0101",
      adressenavn: "Storgata",
      nr: 1,
      bokstav: null,
      utenBokstav: true,
      tilleggsnavn: null,
    },
    matrikkelenhet: { gnr: 208, bnr: 12, fnr: null, snr: null },
    hjemmelshaver: {
      foedselsEllerOrgnr: null,
      etternavn: "Nordmann",
      fornavn: "Ola",
    },
    bygningsstatus: {
      naavaerende: ["Tatt i bruk"],
      tidligere: [],
      periodeFra: "2019-01-01",
      periodeTil: null,
    },
    sokevindu: {
      nedreVenstre: { nord: 6642000, ost: 597300 },
      ovreHoeyre: { nord: 6642200, ost: 597500 },
    },
    subrapporter: {
      etasjer: true,
      bruksenheter: true,
      tiltakshavere: true,
      kontaktpersoner: true,
      hjemmelshavere: true,
      kulturminner: true,
    },
  },
  bygninger: [
    {
      id: 1,
      bygningsnr: "12345678",
      bygningstype: { kode: 111, navn: "Enebolig" },
      naeringsgruppe: "Bolig",
      matrikkelenhet: "208/12",
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
            bruksareal: { bolig: 74, annet: 0 },
            koordinat: { nord: 6642100, ost: 597400 },
            etasjeplan: [
              {
                etasjeplan: "Hovedetasje",
                etasje: 1,
                antallBoenheter: 1,
                bruksareal: { bolig: 74, annet: 0 },
                bruttoareal: { bolig: 80, annet: 0 },
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
            bruksareal: { bolig: 28, annet: 0 },
            koordinat: { nord: 6642100, ost: 597400 },
            etasjeplan: [
              {
                etasjeplan: "Loft",
                etasje: 1,
                antallBoenheter: 1,
                bruksareal: { bolig: 28, annet: 0 },
                bruttoareal: { bolig: 31, annet: 0 },
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
            bruksareal: { bolig: 40, annet: 0 },
            koordinat: { nord: 6644118, ost: 254384 },
            etasjeplan: [
              {
                etasjeplan: "Kjeller",
                etasje: 1,
                antallBoenheter: 1,
                bruksareal: { bolig: 40, annet: 0 },
                bruttoareal: { bolig: 44, annet: 0 },
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
