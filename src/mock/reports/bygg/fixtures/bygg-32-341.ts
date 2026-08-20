import type { LegacyFixtureByggRapport } from "../../../types"

type Bygning = LegacyFixtureByggRapport["bygninger"][number]
type Endring = Bygning["endringer"][number]
type Etasje = NonNullable<NonNullable<Endring["etasjePlan"]>[number]>
type Bruksenhet = NonNullable<NonNullable<Endring["bruksenheter"]>[number]>
type Eier = NonNullable<Endring["aktuellEier"]>

const MATRIKKEL_NR = "0301-32/341/0/0"

function areal(boligAreal: number) {
  return {
    boligAreal,
    annetAreal: 0,
    totaltAreal: boligAreal,
  }
}

function etasje(
  etasjeplanKode: Etasje["etasjeplanKode"],
  etasjeNr: number,
  antallBoenheter: number,
  boligAreal: number,
): Etasje {
  return {
    etasjeplanKode,
    etasje: etasjeNr,
    antallBoenheter,
    bruksareal: areal(boligAreal),
    bruttoareal: areal(0),
  }
}

function bruksenhet(
  adresse: string,
  matrikkelNr: string,
  bruksAreal: number,
  antallRom: number,
  antallBad: number,
  antallWC: number,
  harKjokken: boolean,
): Bruksenhet {
  return {
    bruksenhetsNr: "H0101",
    bruksenhetsTypeKode: "B",
    bruksAreal,
    antallRom,
    antallBad,
    antallWC,
    kjokkenTilgangKode: harKjokken ? "1" : " ",
    adresse,
    matrikkelNr,
  }
}

function ekstraHjemmelshaver(lopeNr: number, aktuellEier: Eier): Endring {
  return {
    lopeNr,
    etasjePlan: [],
    aktuellEier,
    bruksenheter: [],
    kulturminner: [],
  }
}

const EKSPEDISJON_PATENT: Eier = {
  eierforholdKode: "H",
  erAvdoed: false,
  identifikasjonsNr: "148560",
  navn: "EKSPEDISJON PATENT",
  bruksenhetsNr: "H0101",
  adresse: "Vestlivegen 94 5264 GARNES",
  andel: "1/2",
}

const INGRESS_REFLEKSIV: Eier = {
  eierforholdKode: "H",
  erAvdoed: false,
  identifikasjonsNr: "048210",
  navn: "INGRESS REFLEKSIV",
  bruksenhetsNr: "H0101",
  adresse: "Strandavegen 34 6711 BRYGGJA",
  andel: "1/2",
}

const BILDE_SMART: Eier = {
  eierforholdKode: "H",
  erAvdoed: false,
  identifikasjonsNr: "648599",
  navn: "BILDE SMART",
  adresse: "Lusetervegen 136 2676 HEIDAL",
  andel: "1/2",
}

const SKIVE_SPESIFIKK: Eier = {
  eierforholdKode: "H",
  erAvdoed: true,
  identifikasjonsNr: "238673",
  navn: "SKIVE SPESIFIKK",
  andel: "1/2",
}

const bygg80087713: Bygning = {
  bygningsnr: "80087713",
  matrikkelNr: MATRIKKEL_NR,
  endringer: [
    {
      lopeNr: 0,
      byggMetaEndring: {
        bygningsStatusKode: "TB",
        bygningsTypeKode: "121",
        antallBoenheter: 1,
        naringsgruppeKode: "X",
      },
      byggArealEndring: {
        bruksarealBolig: areal(169),
        bruttoarealBolig: areal(0),
        bebygdAreal: 0,
      },
      etasjePlan: [
        etasje("H", 2, 0, 53),
        etasje("H", 1, 1, 63),
        etasje("K", 1, 0, 53),
      ],
      byggKoordinatEndring: { nord: 6645987, ost: 593530 },
      byggDatoEndring: {
        rammetillatelse: "1935-07-01T00:00:00Z",
        tattIBruk: "1936-12-01T00:00:00Z",
      },
      aktuellEier: { ...EKSPEDISJON_PATENT },
      bruksenheter: [
        bruksenhet(
          "12574 Hagan terrasse 15 B",
          "0301-32/341/0/2",
          0,
          0,
          0,
          0,
          false,
        ),
      ],
      kulturminner: [],
    },
    ekstraHjemmelshaver(0, { ...INGRESS_REFLEKSIV }),
    {
      lopeNr: 1,
      byggMetaEndring: {
        endringsKode: "T",
        bygningsStatusKode: "IG",
        bygningsTypeKode: "121",
        antallBoenheter: 0,
        naringsgruppeKode: "X",
      },
      byggArealEndring: {
        bruksarealBolig: areal(42),
        bruttoarealBolig: areal(0),
        bebygdAreal: 0,
      },
      etasjePlan: [etasje("H", 1, 0, 21), etasje("K", 1, 0, 21)],
      byggKoordinatEndring: { nord: 6645987, ost: 593530 },
      byggDatoEndring: {
        rammetillatelse: "2004-03-30T00:00:00Z",
        igangsettingstillatelse: "2004-03-30T00:00:00Z",
      },
      tiltaksHaver: {
        kontaktPersonKode: "T",
        identifikasjonsNr: "058132",
        navn: "ANBEFALING ALVORLIG",
        bruksenhetsNr: "H0101",
        adresse: "Sømveien 33G 0493 OSLO",
      },
      bruksenheter: [
        bruksenhet(
          "12574 Hagan terrasse 15 B",
          MATRIKKEL_NR,
          42,
          1,
          1,
          1,
          true,
        ),
      ],
      kulturminner: [],
    },
  ],
}

const bygg80087721: Bygning = {
  bygningsnr: "80087721",
  matrikkelNr: MATRIKKEL_NR,
  endringer: [
    {
      lopeNr: 0,
      byggMetaEndring: {
        bygningsStatusKode: "TB",
        bygningsTypeKode: "121",
        antallBoenheter: 1,
        naringsgruppeKode: "X",
      },
      byggArealEndring: {
        bruksarealBolig: areal(197),
        bruttoarealBolig: areal(0),
        bebygdAreal: 1,
      },
      etasjePlan: [
        etasje("H", 2, 0, 54),
        etasje("H", 1, 1, 54),
        etasje("K", 1, 0, 89),
      ],
      byggKoordinatEndring: { nord: 6645984, ost: 593522 },
      byggDatoEndring: {
        rammetillatelse: "1935-07-01T00:00:00Z",
        tattIBruk: "1936-12-01T00:00:00Z",
      },
      aktuellEier: { ...BILDE_SMART },
      bruksenheter: [
        bruksenhet(
          "12574 Hagan terrasse 15 A",
          "0301-32/341/0/1",
          197,
          6,
          2,
          3,
          true,
        ),
      ],
      kulturminner: [],
    },
    ekstraHjemmelshaver(0, { ...SKIVE_SPESIFIKK }),
    {
      lopeNr: 1,
      byggMetaEndring: {
        endringsKode: "T",
        bygningsStatusKode: "TB",
        bygningsTypeKode: "121",
        antallBoenheter: 0,
        naringsgruppeKode: "X",
      },
      byggArealEndring: {
        bruksarealBolig: areal(36),
        bruttoarealBolig: areal(0),
        bebygdAreal: 1,
      },
      etasjePlan: [etasje("H", 1, 0, 36)],
      byggKoordinatEndring: { nord: 6645984, ost: 593522 },
      byggDatoEndring: {
        rammetillatelse: "2006-12-22T00:00:00Z",
        igangsettingstillatelse: "2006-12-22T00:00:00Z",
        tattIBruk: "2007-03-29T00:00:00Z",
      },
      aktuellEier: { ...BILDE_SMART },
      bruksenheter: [
        bruksenhet(
          "12574 Hagan terrasse 15 A",
          "0301-32/341/0/1",
          36,
          2,
          1,
          1,
          true,
        ),
      ],
      kulturminner: [],
    },
    ekstraHjemmelshaver(1, { ...SKIVE_SPESIFIKK }),
  ],
}

export function createBygg32341Report(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "0301", kommuneNavn: "OSLO" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-09T09:09:00Z",
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
      matrikkelenhet: { gnr: 32, bnr: 341 },
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
    bygninger: [bygg80087713, bygg80087721],
  }
}
