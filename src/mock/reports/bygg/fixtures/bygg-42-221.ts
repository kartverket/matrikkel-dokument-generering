import type { ByggRapport } from "../../../types"

type Bygning = ByggRapport["bygninger"][number]
type Endring = Bygning["endringer"][number]
type Meta = NonNullable<Endring["byggMetaEndring"]>
type StatusKode = NonNullable<Meta["bygningsStatusKode"]>
type BygningstypeKode = NonNullable<Meta["bygningsTypeKode"]>
type EndringsKode = NonNullable<Meta["endringsKode"]>
type NaringsgruppeKode = NonNullable<Meta["naringsgruppeKode"]>
type Etasje = NonNullable<NonNullable<Endring["etasjePlan"]>[number]>
type EtasjeplanKode = Etasje["etasjeplanKode"]
type Bruksenhet = NonNullable<NonNullable<Endring["bruksenheter"]>[number]>
type Tiltakshaver = NonNullable<Endring["tiltaksHaver"]>
type Datoer = NonNullable<Endring["byggDatoEndring"]>

type EtasjeInput = readonly [
  etasjeplanKode: EtasjeplanKode,
  etasje: number,
  boligAreal: number,
  annetAreal: number,
]

type BruksenhetInput = {
  nr?: string
  type?: Bruksenhet["bruksenhetsTypeKode"]
  bruksAreal?: number
  antallRom?: number
  antallBad?: number
  antallWC?: number
  kjokkenTilgangKode?: Bruksenhet["kjokkenTilgangKode"]
  adresse?: string
}

type TiltakshaverInput = {
  identifikasjonsNr: string
  navn: string
  adresse: string
  bruksenhetsNr?: string
}

type EndringInput = {
  lopeNr: number
  endringsKode?: EndringsKode
  status: StatusKode
  bygningstype: BygningstypeKode
  naringsgruppe: NaringsgruppeKode
  boligAreal?: number
  annetAreal?: number
  nord: number
  ost: number
  datoer?: Partial<Record<keyof Datoer, string>>
  etasjer?: EtasjeInput[]
  bruksenheter?: BruksenhetInput[]
  tiltakshaver?: TiltakshaverInput
}

const MATRIKKEL_NR = "0301-42/221/0/0"
const OSLO_UNIVERSITETSSYKEHUS = {
  eierforholdKode: "H",
  identifikasjonsNr: "993467049",
  erAvdoed: false,
  navn: "OSLO UNIVERSITETSSYKEHUS HF",
  adresse: "Postboks 4956 Nydalen 0424 OSLO",
  andel: "1/1",
} as const

const OUS_TILTAKSHAVER: TiltakshaverInput = {
  identifikasjonsNr: "993467049",
  navn: "OSLO UNIVERSITETSSYKEHUS HF",
  adresse: "Postboks 4956 Nydalen 0424 OSLO",
}

const HELSE_SOR_OST: TiltakshaverInput = {
  identifikasjonsNr: "991324968",
  navn: "HELSE SØR-ØST RHF",
  adresse: "Postboks 404 2303 HAMAR",
}

function areal(boligAreal = 0, annetAreal = 0) {
  return {
    boligAreal,
    annetAreal,
    totaltAreal: boligAreal + annetAreal,
  }
}

function isoDate(value: string): string {
  return `${value}T00:00:00Z`
}

function datoer(values: EndringInput["datoer"]): Endring["byggDatoEndring"] {
  if (!values) return undefined

  return Object.fromEntries(
    Object.entries(values)
      .filter(
        (entry): entry is [string, string] => typeof entry[1] === "string",
      )
      .map(([key, value]) => [key, isoDate(value)]),
  ) as Datoer
}

function bruksenhet(input: BruksenhetInput = {}): Bruksenhet {
  return {
    ...(input.nr ? { bruksenhetsNr: input.nr } : {}),
    bruksenhetsTypeKode: input.type ?? "U",
    bruksAreal: input.bruksAreal ?? 0,
    antallRom: input.antallRom ?? 0,
    antallBad: input.antallBad ?? 0,
    antallWC: input.antallWC ?? 0,
    kjokkenTilgangKode: input.kjokkenTilgangKode ?? " ",
    ...(input.adresse ? { adresse: input.adresse } : {}),
    matrikkelNr: MATRIKKEL_NR,
  }
}

function tiltakshaver(input: TiltakshaverInput): Tiltakshaver {
  return {
    kontaktPersonKode: "T",
    identifikasjonsNr: input.identifikasjonsNr,
    navn: input.navn,
    adresse: input.adresse,
    ...(input.bruksenhetsNr ? { bruksenhetsNr: input.bruksenhetsNr } : {}),
  }
}

function endring(input: EndringInput): Endring {
  const boligAreal = input.boligAreal ?? 0
  const annetAreal = input.annetAreal ?? 0
  const byggDatoEndring = datoer(input.datoer)

  return {
    lopeNr: input.lopeNr,
    byggMetaEndring: {
      ...(input.endringsKode ? { endringsKode: input.endringsKode } : {}),
      bygningsStatusKode: input.status,
      bygningsTypeKode: input.bygningstype,
      antallBoenheter: 0,
      naringsgruppeKode: input.naringsgruppe,
    },
    byggArealEndring: {
      bruksarealBolig: areal(boligAreal, annetAreal),
      bruttoarealBolig: areal(),
      bebygdAreal: 0,
    },
    etasjePlan: (input.etasjer ?? []).map(
      ([etasjeplanKode, etasje, etasjeBoligAreal, etasjeAnnetAreal]) => ({
        etasjeplanKode,
        etasje,
        antallBoenheter: 0,
        bruksareal: areal(etasjeBoligAreal, etasjeAnnetAreal),
        bruttoareal: areal(),
      }),
    ),
    byggKoordinatEndring: { nord: input.nord, ost: input.ost },
    ...(byggDatoEndring ? { byggDatoEndring } : {}),
    aktuellEier: OSLO_UNIVERSITETSSYKEHUS,
    ...(input.tiltakshaver
      ? { tiltaksHaver: tiltakshaver(input.tiltakshaver) }
      : {}),
    bruksenheter: (input.bruksenheter ?? [{}]).map(bruksenhet),
    kulturminner: [],
  }
}

function bygning(bygningsnr: string, endringer: Endring[]): Bygning {
  return { bygningsnr, matrikkelNr: MATRIKKEL_NR, endringer }
}

const bygg81174261 = bygning("81174261", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 16990,
    nord: 6647003,
    ost: 595695,
    datoer: {
      rammetillatelse: "1994-05-11",
      igangsettingstillatelse: "1996-05-06",
      tattIBruk: "1999-01-19",
    },
    etasjer: [
      ["H", 6, 0, 0],
      ["H", 5, 0, 625],
      ["H", 4, 0, 3506],
      ["H", 3, 0, 3685],
      ["H", 2, 0, 3624],
      ["H", 1, 0, 3224],
      ["U", 1, 0, 2326],
      ["U", 2, 0, 0],
    ],
  }),
  endring({
    lopeNr: 1,
    endringsKode: "T",
    status: "IG",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 3801,
    nord: 6647003,
    ost: 595695,
    datoer: {
      rammetillatelse: "1998-09-09",
      igangsettingstillatelse: "1999-01-25",
    },
    etasjer: [
      ["H", 5, 0, 545],
      ["H", 4, 0, 575],
      ["H", 3, 0, 736],
      ["H", 2, 0, 453],
      ["H", 1, 0, 763],
      ["U", 1, 0, 451],
      ["U", 2, 0, 278],
    ],
    tiltakshaver: {
      identifikasjonsNr: "658282",
      navn: "MOSKUS UKLAR",
      adresse: "Turistvegen 82B 9020 TROMSDALEN",
    },
  }),
  endring({
    lopeNr: 2,
    endringsKode: "P",
    status: "FA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 528,
    nord: 6647003,
    ost: 595695,
    datoer: {
      rammetillatelse: "2016-05-25",
      igangsettingstillatelse: "2016-07-07",
      ferdigattest: "2017-03-13",
    },
    etasjer: [["H", 5, 0, 528]],
  }),
  endring({
    lopeNr: 3,
    endringsKode: "P",
    status: "RA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 750,
    nord: 6647024.2,
    ost: 595701.4,
    datoer: { rammetillatelse: "2023-04-28" },
    etasjer: [["H", 5, 0, 750]],
    tiltakshaver: OUS_TILTAKSHAVER,
  }),
])

const bygg81174288 = bygning("81174288", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 4223,
    nord: 6647195,
    ost: 595785,
    datoer: {
      rammetillatelse: "1994-05-06",
      igangsettingstillatelse: "1994-12-21",
      tattIBruk: "1998-05-14",
    },
    etasjer: [
      ["H", 4, 0, 32],
      ["H", 3, 0, 218],
      ["H", 2, 0, 2034],
      ["H", 1, 0, 1523],
      ["U", 1, 0, 305],
      ["U", 2, 0, 79],
      ["K", 1, 0, 16],
      ["K", 2, 0, 16],
    ],
  }),
  endring({
    lopeNr: 1,
    endringsKode: "P",
    status: "TB",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 252,
    nord: 6647195,
    ost: 595785,
    datoer: {
      rammetillatelse: "2001-10-01",
      igangsettingstillatelse: "2003-02-28",
      tattIBruk: "2003-07-09",
    },
    etasjer: [["H", 2, 0, 252]],
  }),
])

const bygg81197326 = bygning("81197326", [
  endring({
    lopeNr: 0,
    status: "IG",
    bygningstype: "739",
    naringsgruppe: "Q",
    annetAreal: 17848,
    nord: 6646886,
    ost: 595850,
    datoer: {
      rammetillatelse: "1994-05-10",
      igangsettingstillatelse: "1994-12-21",
    },
    etasjer: [
      ["H", 6, 0, 86],
      ["H", 5, 0, 2044],
      ["H", 4, 0, 3472],
      ["H", 3, 0, 3768],
      ["H", 2, 0, 363],
      ["H", 1, 0, 4631],
      ["U", 1, 0, 3484],
    ],
    tiltakshaver: {
      identifikasjonsNr: "068572",
      navn: "BØR POSSESSIV",
      adresse: "Romsveien 134 3114 TØNSBERG",
      bruksenhetsNr: "H0101",
    },
  }),
])

const bygg81197334 = bygning("81197334", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 67697,
    nord: 6647010,
    ost: 595759,
    datoer: {
      rammetillatelse: "1994-05-09",
      igangsettingstillatelse: "1994-12-21",
      tattIBruk: "1999-01-15",
    },
    etasjer: [
      ["H", 7, 0, 177],
      ["H", 6, 0, 7840],
      ["H", 5, 0, 10998],
      ["H", 4, 0, 11720],
      ["H", 3, 0, 11571],
      ["H", 2, 0, 9532],
      ["H", 1, 0, 11257],
      ["U", 1, 0, 4274],
      ["U", 2, 0, 209],
      ["K", 1, 0, 119],
    ],
    bruksenheter: [{ adresse: "16757 Sognsvannsveien 20" }],
  }),
  endring({
    lopeNr: 1,
    endringsKode: "T",
    status: "TB",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 5208,
    nord: 6647010,
    ost: 595759,
    datoer: {
      rammetillatelse: "1997-04-07",
      igangsettingstillatelse: "1997-04-07",
      tattIBruk: "2000-05-04",
    },
    etasjer: [
      ["H", 7, 0, 74],
      ["H", 6, 0, 815],
      ["H", 5, 0, 1051],
      ["H", 4, 0, 1051],
      ["H", 3, 0, 946],
      ["H", 2, 0, 348],
      ["H", 1, 0, 366],
      ["U", 1, 0, 229],
      ["U", 2, 0, 209],
      ["K", 1, 0, 119],
    ],
  }),
  endring({
    lopeNr: 2,
    endringsKode: "T",
    status: "IG",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 5281,
    nord: 6647010,
    ost: 595759,
    datoer: {
      rammetillatelse: "1998-07-28",
      igangsettingstillatelse: "1998-09-24",
    },
    etasjer: [
      ["H", 5, 0, 814],
      ["H", 4, 0, 922],
      ["H", 3, 0, 1135],
      ["H", 2, 0, 1031],
      ["H", 1, 0, 966],
      ["U", 1, 0, 167],
      ["U", 2, 0, 246],
    ],
    tiltakshaver: {
      identifikasjonsNr: "088383",
      navn: "LAGSPORT OPERATIV",
      adresse: "Sleipnesveien 85 8185 VÅGAHOLMEN",
      bruksenhetsNr: "H0101",
    },
  }),
  endring({
    lopeNr: 3,
    endringsKode: "T",
    status: "TB",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 2749,
    nord: 6647010,
    ost: 595759,
    datoer: {
      rammetillatelse: "2004-08-30",
      igangsettingstillatelse: "2005-02-16",
      tattIBruk: "2006-11-09",
    },
    etasjer: [
      ["H", 4, 0, 690],
      ["H", 3, 0, 648],
      ["H", 2, 0, 616],
      ["H", 1, 0, 795],
    ],
    bruksenheter: [{ adresse: "16757 Sognsvannsveien 20" }],
  }),
  endring({
    lopeNr: 4,
    endringsKode: "P",
    status: "BA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 916,
    nord: 6647010,
    ost: 595759,
    datoer: {
      rammetillatelse: "2007-11-08",
      utgaattRevet: "2011-07-03",
    },
    etasjer: [["H", 5, 0, 916]],
    tiltakshaver: {
      identifikasjonsNr: "318579",
      navn: "BILDEKORT KUNNSKAPSRIK PÅLITELIG POESI",
      adresse: "Østre Brekkevei 56 3294 STAVERN",
      bruksenhetsNr: "H0101",
    },
  }),
  endring({
    lopeNr: 5,
    endringsKode: "P",
    status: "BA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 967,
    nord: 6647125,
    ost: 595774.5,
    datoer: {
      rammetillatelse: "2011-06-14",
      utgaattRevet: "2015-09-25",
    },
    etasjer: [["H", 5, 0, 967]],
    tiltakshaver: {
      identifikasjonsNr: "208361",
      navn: "BEVER STOR LEDENDE PRODUKSJON",
      adresse: "Vestgårdvegen 24 7605 LEVANGER",
      bruksenhetsNr: "H0101",
    },
  }),
  endring({
    lopeNr: 6,
    endringsKode: "U",
    status: "FA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 34,
    nord: 6647010,
    ost: 595759,
    datoer: {
      rammetillatelse: "2013-04-12",
      ferdigattest: "2015-09-14",
    },
    etasjer: [["U", 1, 0, 34]],
  }),
  endring({
    lopeNr: 7,
    endringsKode: "P",
    status: "FA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 67,
    nord: 6647028.6,
    ost: 595738,
    datoer: {
      rammetillatelse: "2013-09-05",
      ferdigattest: "2023-04-27",
    },
    etasjer: [["H", 5, 0, 67]],
  }),
  endring({
    lopeNr: 8,
    endringsKode: "T",
    status: "FA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 30,
    nord: 6647138.9,
    ost: 595756.9,
    datoer: {
      igangsettingstillatelse: "2015-10-09",
      ferdigattest: "2023-11-09",
    },
    etasjer: [["H", 2, 0, 30]],
    bruksenheter: [{ adresse: "16757 Sognsvannsveien 20" }],
  }),
  endring({
    lopeNr: 9,
    endringsKode: "P",
    status: "FA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 485,
    nord: 6647147.3,
    ost: 595777.7,
    datoer: {
      rammetillatelse: "2017-04-24",
      igangsettingstillatelse: "2017-07-04",
      ferdigattest: "2019-01-07",
    },
    etasjer: [
      ["H", 6, 0, 485],
      ["H", 1, 0, 0],
    ],
    bruksenheter: [
      {
        nr: "H0101",
        type: "A",
        adresse: "16757 Sognsvannsveien 20",
      },
    ],
  }),
  endring({
    lopeNr: 10,
    endringsKode: "T",
    status: "FA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 960,
    nord: 6647035.7,
    ost: 595727.2,
    datoer: {
      rammetillatelse: "2022-06-28",
      igangsettingstillatelse: "2024-01-04",
      midlertidigBrukstillatelse: "2025-02-12",
      ferdigattest: "2025-04-14",
    },
    etasjer: [
      ["H", 6, 0, 160],
      ["H", 5, 0, 160],
      ["H", 4, 0, 160],
      ["H", 3, 0, 160],
      ["H", 2, 0, 160],
      ["H", 1, 0, 160],
    ],
    bruksenheter: [
      {
        nr: "H0101",
        type: "A",
        bruksAreal: 960,
        adresse: "16757 Sognsvannsveien 20",
      },
    ],
  }),
  endring({
    lopeNr: 11,
    endringsKode: "O",
    status: "IG",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: -3095,
    nord: 6647010,
    ost: 595759,
    datoer: {
      rammetillatelse: "2024-11-06",
      igangsettingstillatelse: "2025-07-11",
    },
    etasjer: [
      ["H", 4, 0, -910],
      ["H", 3, 0, -910],
      ["H", 2, 0, -910],
      ["H", 1, 0, -365],
    ],
    tiltakshaver: HELSE_SOR_OST,
  }),
])

const bygg81197342 = bygning("81197342", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 24670,
    nord: 6647022,
    ost: 595822,
    datoer: {
      rammetillatelse: "1994-05-09",
      igangsettingstillatelse: "1994-12-21",
      tattIBruk: "1999-01-15",
    },
    etasjer: [
      ["H", 5, 0, 2612],
      ["H", 4, 0, 5482],
      ["H", 3, 0, 5482],
      ["H", 2, 0, 5281],
      ["H", 1, 0, 4919],
      ["U", 1, 0, 894],
    ],
    bruksenheter: [{ adresse: "16757 Sognsvannsveien 20" }, {}],
  }),
  endring({
    lopeNr: 1,
    endringsKode: "T",
    status: "IG",
    bygningstype: "719",
    naringsgruppe: "Y",
    annetAreal: 3285,
    nord: 6647022,
    ost: 595822,
    datoer: {
      rammetillatelse: "1998-07-17",
      igangsettingstillatelse: "1998-11-05",
    },
    etasjer: [
      ["H", 4, 0, 999],
      ["H", 3, 0, 999],
      ["H", 2, 0, 966],
      ["H", 1, 0, 321],
    ],
    tiltakshaver: {
      identifikasjonsNr: "108904",
      navn: "SALVE BLAUT",
      adresse: "Asakveien 216 1923 SØRUM",
      bruksenhetsNr: "H0101",
    },
  }),
  endring({
    lopeNr: 2,
    endringsKode: "U",
    status: "FA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 57,
    nord: 6647022,
    ost: 595822,
    datoer: {
      igangsettingstillatelse: "2020-11-06",
      ferdigattest: "2022-02-24",
    },
    etasjer: [["U", 1, 0, 57]],
    bruksenheter: [{ adresse: "16757 Sognsvannsveien 20" }],
  }),
  endring({
    lopeNr: 3,
    endringsKode: "P",
    status: "RA",
    bygningstype: "719",
    naringsgruppe: "Q",
    boligAreal: 2313,
    nord: 6647123.4,
    ost: 595787.4,
    datoer: { rammetillatelse: "2022-02-11" },
    etasjer: [
      ["H", 6, 1238, 0],
      ["H", 5, 1075, 0],
    ],
    tiltakshaver: OUS_TILTAKSHAVER,
  }),
  endring({
    lopeNr: 4,
    endringsKode: "P",
    status: "MB",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 2577,
    nord: 6647038.5,
    ost: 595812.8,
    datoer: {
      rammetillatelse: "2023-03-25",
      igangsettingstillatelse: "2023-11-07",
      midlertidigBrukstillatelse: "2024-07-04",
    },
    etasjer: [["H", 5, 0, 2577]],
    tiltakshaver: OUS_TILTAKSHAVER,
  }),
  endring({
    lopeNr: 5,
    endringsKode: "T",
    status: "RA",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 38,
    nord: 6647153.8,
    ost: 595768.7,
    datoer: { rammetillatelse: "2024-10-03" },
    etasjer: [
      ["H", 2, 0, 18],
      ["H", 1, 0, 20],
    ],
    tiltakshaver: OUS_TILTAKSHAVER,
  }),
  endring({
    lopeNr: 6,
    endringsKode: "P",
    status: "IG",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 86,
    nord: 6647129,
    ost: 595810.9,
    datoer: {
      rammetillatelse: "2024-10-30",
      igangsettingstillatelse: "2025-05-02",
    },
    etasjer: [
      ["H", 4, 0, 43],
      ["H", 3, 0, 43],
    ],
    tiltakshaver: OUS_TILTAKSHAVER,
  }),
])

const bygg81211639 = bygning("81211639", [
  endring({
    lopeNr: 0,
    status: "GR",
    bygningstype: "239",
    naringsgruppe: "H",
    annetAreal: 2423,
    nord: 6646879.5,
    ost: 595732.2,
    datoer: {
      rammetillatelse: "1995-11-20",
      igangsettingstillatelse: "1997-04-16",
      ferdigattest: "1999-11-03",
      tattIBruk: "1999-10-07",
    },
    etasjer: [
      ["H", 1, 0, 21],
      ["U", 1, 0, 2402],
    ],
  }),
])

const bygg81690154 = bygning("81690154", [
  endring({
    lopeNr: 0,
    status: "GR",
    bygningstype: "511",
    naringsgruppe: "Q",
    annetAreal: 4764,
    nord: 6646807,
    ost: 595774,
    datoer: {
      rammetillatelse: "1997-09-10",
      igangsettingstillatelse: "1997-09-19",
      ferdigattest: "1999-01-15",
    },
    etasjer: [
      ["H", 4, 0, 921],
      ["H", 3, 0, 987],
      ["H", 2, 0, 958],
      ["H", 1, 0, 1196],
      ["K", 1, 0, 702],
    ],
  }),
  endring({
    lopeNr: 1,
    endringsKode: "T",
    status: "GR",
    bygningstype: "511",
    naringsgruppe: "Q",
    annetAreal: 1215,
    nord: 6646807,
    ost: 595774,
    datoer: {
      rammetillatelse: "2006-03-20",
      igangsettingstillatelse: "2007-08-14",
      ferdigattest: "2009-03-15",
      tattIBruk: "2008-07-11",
    },
    etasjer: [
      ["H", 4, 0, 227],
      ["H", 3, 0, 230],
      ["H", 2, 0, 231],
      ["H", 1, 0, 294],
      ["K", 1, 0, 233],
    ],
  }),
])

const bygg81771197 = bygning("81771197", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "629",
    naringsgruppe: "P",
    annetAreal: 18816,
    nord: 6646788,
    ost: 595845,
    datoer: {
      rammetillatelse: "1994-05-10",
      igangsettingstillatelse: "1995-08-21",
      tattIBruk: "1999-05-20",
    },
    etasjer: [
      ["H", 5, 0, 71],
      ["H", 4, 0, 2778],
      ["H", 3, 0, 3139],
      ["H", 2, 0, 3125],
      ["H", 1, 0, 3129],
      ["U", 1, 0, 1366],
      ["U", 2, 0, 4158],
      ["K", 1, 0, 1050],
    ],
  }),
  endring({
    lopeNr: 1,
    endringsKode: "T",
    status: "RA",
    bygningstype: "629",
    naringsgruppe: "P",
    annetAreal: 216,
    nord: 6646776.5,
    ost: 595842.4,
    datoer: { rammetillatelse: "2023-02-13" },
    etasjer: [
      ["U", 1, 0, 108],
      ["U", 2, 0, 108],
    ],
    tiltakshaver: OUS_TILTAKSHAVER,
  }),
])

const bygg81771200 = bygning("81771200", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "629",
    naringsgruppe: "P",
    annetAreal: 7035,
    nord: 6646774,
    ost: 595909,
    datoer: {
      rammetillatelse: "1994-05-10",
      igangsettingstillatelse: "1995-08-21",
      tattIBruk: "1999-05-20",
    },
    etasjer: [
      ["H", 4, 0, 16],
      ["H", 3, 0, 575],
      ["H", 2, 0, 2049],
      ["H", 1, 0, 1800],
      ["U", 1, 0, 2595],
    ],
    bruksenheter: [
      {
        nr: "U0101",
        type: "A",
        adresse: "12199 Gaustadalléen 34",
      },
      {
        nr: "H0101",
        type: "A",
        adresse: "16757 Sognsvannsveien 10",
      },
    ],
  }),
])

const bygg81771219 = bygning("81771219", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: 19489,
    nord: 6646899,
    ost: 595803,
    datoer: {
      rammetillatelse: "1994-05-10",
      igangsettingstillatelse: "1995-08-21",
      tattIBruk: "1999-05-20",
    },
    etasjer: [
      ["H", 8, 0, 28],
      ["H", 7, 0, 30],
      ["H", 6, 0, 72],
      ["H", 5, 0, 2068],
      ["H", 4, 0, 3574],
      ["H", 3, 0, 3703],
      ["H", 2, 0, 633],
      ["H", 1, 0, 4555],
      ["U", 1, 0, 586],
      ["U", 2, 0, 4240],
    ],
  }),
  endring({
    lopeNr: 1,
    endringsKode: "O",
    status: "IG",
    bygningstype: "719",
    naringsgruppe: "Q",
    annetAreal: -416,
    nord: 6646899,
    ost: 595803,
    datoer: {
      rammetillatelse: "2023-09-14",
      igangsettingstillatelse: "2024-01-02",
    },
    etasjer: [
      ["H", 8, 0, -28],
      ["H", 7, 0, -30],
      ["H", 6, 0, -30],
      ["H", 5, 0, -12],
      ["H", 4, 0, -12],
      ["H", 3, 0, -12],
      ["H", 2, 0, -12],
      ["H", 1, 0, -280],
    ],
    tiltakshaver: HELSE_SOR_OST,
  }),
])

const bygg81790930 = bygning("81790930", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "181",
    naringsgruppe: "Y",
    annetAreal: 316,
    nord: 6647211,
    ost: 595741,
    datoer: {
      rammetillatelse: "2005-03-30",
      igangsettingstillatelse: "2005-03-30",
      ferdigattest: "2005-03-30",
    },
    etasjer: [["H", 1, 0, 316]],
  }),
  endring({
    lopeNr: 1,
    endringsKode: "T",
    status: "IG",
    bygningstype: "181",
    naringsgruppe: "Y",
    annetAreal: 31,
    nord: 6647211,
    ost: 595741,
    datoer: {
      rammetillatelse: "2004-08-30",
      igangsettingstillatelse: "2005-02-16",
    },
    etasjer: [["U", 1, 0, 31]],
    tiltakshaver: {
      identifikasjonsNr: "579170",
      navn: "ASTRONOM EFFEKTIV",
      adresse: "Stokkøyveien 712 7178 STOKKØY",
    },
  }),
])

const bygg81826501 = bygning("81826501", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "181",
    naringsgruppe: "Y",
    nord: 6647242,
    ost: 595788,
    datoer: { tattIBruk: "1993-11-23" },
  }),
])

const bygg81848238 = bygning("81848238", [
  endring({
    lopeNr: 0,
    status: "TB",
    bygningstype: "181",
    naringsgruppe: "Y",
    nord: 6646919,
    ost: 595770,
    datoer: { tattIBruk: "1993-11-23" },
  }),
])

const bygg300621075 = bygning("300621075", [
  endring({
    lopeNr: 0,
    status: "GR",
    bygningstype: "739",
    naringsgruppe: "Q",
    boligAreal: 38,
    nord: 6647176,
    ost: 595717.9,
    datoer: {
      igangsettingstillatelse: "2017-03-31",
      midlertidigBrukstillatelse: "2018-06-05",
      ferdigattest: "2018-07-12",
    },
    etasjer: [["H", 1, 38, 0]],
    bruksenheter: [
      {
        nr: "H0101",
        type: "A",
        bruksAreal: 38,
        antallRom: 1,
        antallWC: 1,
      },
    ],
  }),
])

const bygg301432893 = bygning("301432893", [
  endring({
    lopeNr: 0,
    status: "IG",
    bygningstype: "719",
    naringsgruppe: "O",
    annetAreal: 95059,
    nord: 6646870.4,
    ost: 595739.9,
    datoer: {
      rammetillatelse: "2024-02-06",
      igangsettingstillatelse: "2025-06-04",
    },
    etasjer: [
      ["H", 14, 0, 145],
      ["H", 13, 0, 618],
      ["H", 12, 0, 2855],
      ["H", 11, 0, 4522],
      ["H", 10, 0, 5737],
      ["H", 9, 0, 5737],
      ["H", 8, 0, 5737],
      ["H", 7, 0, 5737],
      ["H", 6, 0, 5737],
      ["H", 5, 0, 5737],
      ["H", 4, 0, 7090],
      ["H", 3, 0, 7300],
      ["H", 2, 0, 6942],
      ["H", 1, 0, 9780],
      ["U", 1, 0, 11309],
      ["K", 1, 0, 9862],
      ["K", 2, 0, 214],
    ],
    tiltakshaver: HELSE_SOR_OST,
  }),
])

export function createBygg42221Report(): ByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "0301", kommuneNavn: "OSLO" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-13T10:02:00Z",
    },
    utvalgskriterier: {
      omfang: {
        inkluderBestaaendeBygg: true,
        inkluderUtgaatteBygg: true,
        inkluderBygninger: true,
        inkluderBygningsendringer: true,
        inkluderFrededeBygninger: true,
      },
      bygning: { bygningstyper: [] },
      adresse: { utenBokstav: null },
      matrikkelenhet: { gnr: 42, bnr: 221 },
      aktor: {},
      bygningsstatus: { naavaerende: [], tidligere: [] },
      sokevindu: {},
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
      bygg81174261,
      bygg81174288,
      bygg81197326,
      bygg81197334,
      bygg81197342,
      bygg81211639,
      bygg81690154,
      bygg81771197,
      bygg81771200,
      bygg81771219,
      bygg81790930,
      bygg81826501,
      bygg81848238,
      bygg300621075,
      bygg301432893,
    ],
  }
}
