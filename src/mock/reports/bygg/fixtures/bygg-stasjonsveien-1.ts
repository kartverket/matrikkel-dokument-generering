import type { LegacyFixtureByggRapport } from "../../../types"

type Bygning = LegacyFixtureByggRapport["bygninger"][number]
type Endring = Bygning["endringer"][number]
type Etasje = NonNullable<NonNullable<Endring["etasjePlan"]>[number]>
type Bruksenhet = NonNullable<NonNullable<Endring["bruksenheter"]>[number]>
type AktuellEier = NonNullable<Endring["aktuellEier"]>

const SKOLE_MATRIKKEL_NR = "0301-35/12/0/0"
const GARASJE_MATRIKKEL_NR = "0301-35/684/0/0"

const OSLO_KOMMUNE: AktuellEier = {
  eierforholdKode: "H",
  erAvdoed: false,
  identifikasjonsNr: "958935420",
  navn: "OSLO KOMMUNE",
  adresse: "Postboks 2500 Vika 37 OSLO",
  andel: "1/1",
}

const OSLOBYGG: AktuellEier = {
  eierforholdKode: "KE",
  erAvdoed: false,
  identifikasjonsNr: "924599545",
  navn: "OSLOBYGG KF",
  adresse: "Postboks 6391 Etterstad 604 OSLO",
}

function areal(annetAreal: number) {
  return {
    boligAreal: 0,
    annetAreal,
    totaltAreal: annetAreal,
  }
}

function etasje(
  etasjeplanKode: Etasje["etasjeplanKode"],
  etasjeNr: number,
  annetAreal: number,
): Etasje {
  return {
    etasjeplanKode,
    etasje: etasjeNr,
    antallBoenheter: 0,
    bruksareal: areal(annetAreal),
    bruttoareal: areal(0),
  }
}

function unummerertBruksenhet(
  matrikkelNr: string,
  adresse?: string,
): Bruksenhet {
  return {
    bruksenhetsTypeKode: "U",
    bruksAreal: 0,
    antallRom: 0,
    antallBad: 0,
    antallWC: 0,
    kjokkenTilgangKode: " ",
    ...(adresse ? { adresse } : {}),
    matrikkelNr,
  }
}

function ownerOnlyEndring(aktuellEier: AktuellEier): Endring {
  return {
    lopeNr: 0,
    etasjePlan: [],
    aktuellEier: { ...aktuellEier },
    bruksenheter: [],
    kulturminner: [],
  }
}

function fellesarealEier(bnr: number): AktuellEier {
  return {
    eierforholdKode: "H",
    erAvdoed: false,
    navn: `Matrikkelenhet 0301 - 35 / ${bnr}`,
    adresse: "Fellesareal",
    andel: "1/3",
  }
}

const bygg80100590: Bygning = {
  bygningsnr: "80100590",
  matrikkelNr: SKOLE_MATRIKKEL_NR,
  endringer: [
    {
      lopeNr: 0,
      byggMetaEndring: {
        bygningsStatusKode: "TB",
        bygningsTypeKode: "613",
        antallBoenheter: 0,
        naringsgruppeKode: "P",
      },
      byggArealEndring: {
        bruksarealBolig: areal(6757),
        bruttoarealBolig: areal(0),
        bebygdAreal: 0,
      },
      etasjePlan: [
        etasje("H", 3, 1490),
        etasje("H", 2, 1860),
        etasje("H", 1, 1822),
        etasje("U", 1, 1585),
      ],
      byggKoordinatEndring: { nord: 6647216, ost: 594528 },
      byggDatoEndring: {
        rammetillatelse: "1939-09-01T00:00:00Z",
        tattIBruk: "1940-09-01T00:00:00Z",
      },
      aktuellEier: { ...OSLO_KOMMUNE },
      bruksenheter: [
        unummerertBruksenhet(SKOLE_MATRIKKEL_NR, "16952 Stasjonsveien 1"),
        unummerertBruksenhet(SKOLE_MATRIKKEL_NR),
      ],
      kulturminner: [],
    },
    ownerOnlyEndring(OSLOBYGG),
  ],
}

const bygg80100604: Bygning = {
  bygningsnr: "80100604",
  matrikkelNr: SKOLE_MATRIKKEL_NR,
  endringer: [
    {
      lopeNr: 0,
      byggMetaEndring: {
        bygningsStatusKode: "TB",
        bygningsTypeKode: "619",
        antallBoenheter: 0,
        naringsgruppeKode: "P",
      },
      byggArealEndring: {
        bruksarealBolig: areal(588),
        bruttoarealBolig: areal(0),
        bebygdAreal: 7,
      },
      etasjePlan: [
        etasje("H", 3, 115),
        etasje("H", 2, 204),
        etasje("H", 1, 207),
        etasje("K", 1, 62),
      ],
      byggKoordinatEndring: { nord: 6647233, ost: 594560 },
      byggDatoEndring: {
        igangsettingstillatelse: "1909-01-01T00:00:00Z",
        tattIBruk: "1909-12-01T00:00:00Z",
      },
      sefrakId: "0301-4601-3",
      aktuellEier: { ...OSLO_KOMMUNE },
      bruksenheter: [
        unummerertBruksenhet(SKOLE_MATRIKKEL_NR, "16952 Stasjonsveien 1"),
      ],
      kulturminner: [],
    },
    ownerOnlyEndring(OSLOBYGG),
  ],
}

function garasje(
  bygningsnr: string,
  etasjeplanKode: Etasje["etasjeplanKode"],
  nord: number,
  ost: number,
  tattIBruk: string,
): Bygning {
  const eiere = [1073, 1074, 1075].map(fellesarealEier)

  return {
    bygningsnr,
    matrikkelNr: GARASJE_MATRIKKEL_NR,
    endringer: [
      {
        lopeNr: 0,
        byggMetaEndring: {
          bygningsStatusKode: "TB",
          bygningsTypeKode: "181",
          antallBoenheter: 0,
          naringsgruppeKode: "Y",
        },
        byggArealEndring: {
          bruksarealBolig: areal(46),
          bruttoarealBolig: areal(0),
          bebygdAreal: 0,
        },
        etasjePlan: [etasje(etasjeplanKode, 1, 46)],
        byggKoordinatEndring: { nord, ost },
        byggDatoEndring: {
          igangsettingstillatelse: "1984-09-03T00:00:00Z",
          tattIBruk: `${tattIBruk}T00:00:00Z`,
        },
        aktuellEier: eiere[0],
        bruksenheter: [
          unummerertBruksenhet(GARASJE_MATRIKKEL_NR, "16952 Stasjonsveien 1 B"),
        ],
        kulturminner: [],
      },
      ...eiere.slice(1).map(ownerOnlyEndring),
    ],
  }
}

export function createByggStasjonsveien1Report(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "0301", kommuneNavn: "OSLO" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-24T10:53:00Z",
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
      adresse: {
        adresseNavn: "Stasjonsveien",
        adresseNr: 1,
        utenBokstav: null,
      },
      matrikkelenhet: {},
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
      bygg80100590,
      bygg80100604,
      garasje("80951361", "U", 6647175, 594460, "1984-09-15"),
      garasje("80951388", "H", 6647178, 594473, "1984-09-10"),
    ],
  }
}
