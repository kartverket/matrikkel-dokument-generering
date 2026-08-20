import type { LegacyFixtureByggRapport } from "../../../types"

type Bygning = LegacyFixtureByggRapport["bygninger"][number]
type Endring = Bygning["endringer"][number]
type Etasje = NonNullable<NonNullable<Endring["etasjePlan"]>[number]>
type Bruksenhet = NonNullable<NonNullable<Endring["bruksenheter"]>[number]>

const MATRIKKEL_NR = "3201-109/8/0/0"
const ADRESSE = "1305 Vensåsveien 6"

const HJEMMELSHAVER: NonNullable<Endring["aktuellEier"]> = {
  eierforholdKode: "H",
  erAvdoed: false,
  identifikasjonsNr: "318156",
  navn: "ETAT UKLAR",
  bruksenhetsNr: "H0101",
  adresse: "Raveien 571 3239 SANDEFJORD",
  andel: "1/1",
}

function areal() {
  return {
    boligAreal: 0,
    annetAreal: 0,
    totaltAreal: 0,
  }
}

function bruksenhet(
  bruksenhetsTypeKode: "U" | "B",
  bruksenhetsNr?: string,
): Bruksenhet {
  return {
    ...(bruksenhetsNr ? { bruksenhetsNr } : {}),
    bruksenhetsTypeKode,
    bruksAreal: 0,
    antallRom: 0,
    antallBad: 0,
    antallWC: 0,
    kjokkenTilgangKode: " ",
    adresse: ADRESSE,
    matrikkelNr: MATRIKKEL_NR,
  }
}

interface BygningInput {
  bygningsnr: string
  bygningsTypeKode: "181" | "111"
  antallBoenheter: number
  nord: number
  ost: number
  bruksenhet: Bruksenhet
  etasjePlan?: Etasje[]
  naringsgruppeKode?: "Y"
}

function bygning(input: BygningInput): Bygning {
  return {
    bygningsnr: input.bygningsnr,
    matrikkelNr: MATRIKKEL_NR,
    endringer: [
      {
        lopeNr: 0,
        byggMetaEndring: {
          bygningsStatusKode: "TB",
          bygningsTypeKode: input.bygningsTypeKode,
          antallBoenheter: input.antallBoenheter,
          ...(input.naringsgruppeKode
            ? { naringsgruppeKode: input.naringsgruppeKode }
            : {}),
        },
        byggArealEndring: {
          bruksarealBolig: areal(),
          bruttoarealBolig: areal(),
          bebygdAreal: 0,
        },
        etasjePlan: input.etasjePlan ?? [],
        byggKoordinatEndring: { nord: input.nord, ost: input.ost },
        aktuellEier: { ...HJEMMELSHAVER },
        bruksenheter: [input.bruksenhet],
        kulturminner: [],
      },
    ],
  }
}

export function createBygg1098Report(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "3201", kommuneNavn: "BÆRUM" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-09T07:34:00Z",
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
      matrikkelenhet: { gnr: 109, bnr: 8 },
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
      bygning({
        bygningsnr: "17361511",
        bygningsTypeKode: "181",
        antallBoenheter: 0,
        naringsgruppeKode: "Y",
        nord: 6649724,
        ost: 582079,
        bruksenhet: bruksenhet("U"),
      }),
      bygning({
        bygningsnr: "17361538",
        bygningsTypeKode: "181",
        antallBoenheter: 0,
        naringsgruppeKode: "Y",
        nord: 6649722,
        ost: 582064,
        bruksenhet: bruksenhet("U"),
      }),
      bygning({
        bygningsnr: "17362623",
        bygningsTypeKode: "111",
        antallBoenheter: 1,
        nord: 6649713,
        ost: 582088,
        etasjePlan: [
          {
            etasjeplanKode: "H",
            etasje: 1,
            antallBoenheter: 1,
            bruksareal: areal(),
            bruttoareal: areal(),
          },
        ],
        bruksenhet: bruksenhet("B", "H0101"),
      }),
    ],
  }
}
