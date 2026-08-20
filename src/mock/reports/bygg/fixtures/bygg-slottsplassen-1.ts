import type { LegacyFixtureByggRapport } from "../../../types"

type Bygning = LegacyFixtureByggRapport["bygninger"][number]
type Etasje = NonNullable<
  NonNullable<Bygning["endringer"][number]["etasjePlan"]>[number]
>

const MATRIKKEL_NR = "0301-209/25/0/0"

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

const bygg81416001: Bygning = {
  bygningsnr: "81416001",
  matrikkelNr: MATRIKKEL_NR,
  endringer: [
    {
      lopeNr: 0,
      byggMetaEndring: {
        bygningsStatusKode: "TB",
        bygningsTypeKode: "311",
        antallBoenheter: 0,
        naringsgruppeKode: "O",
      },
      byggArealEndring: {
        bruksarealBolig: areal(15862),
        bruttoarealBolig: areal(0),
        bebygdAreal: 0,
      },
      etasjePlan: [
        etasje("H", 5, 2307),
        etasje("H", 4, 2383),
        etasje("H", 3, 3045),
        etasje("H", 2, 3239),
        etasje("H", 1, 2285),
        etasje("U", 1, 2603),
      ],
      byggKoordinatEndring: { nord: 6643438, ost: 596593 },
      byggDatoEndring: {
        igangsettingstillatelse: "1901-01-01T00:00:00Z",
        tattIBruk: "1993-11-23T00:00:00Z",
      },
      aktuellEier: {
        eierforholdKode: "H",
        erAvdoed: true,
        identifikasjonsNr: "199287",
        navn: "BØLGE MINKENDE",
        andel: "1/1",
      },
      bruksenheter: [
        {
          bruksenhetsTypeKode: "U",
          bruksAreal: 0,
          antallRom: 0,
          antallBad: 0,
          antallWC: 0,
          kjokkenTilgangKode: " ",
          adresse: "21608 Slottsplassen 1",
          matrikkelNr: MATRIKKEL_NR,
        },
      ],
      kulturminner: [],
    },
  ],
}

export function createByggSlottsplassen1Report(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "0301", kommuneNavn: "OSLO" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-24T08:31:00Z",
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
        adresseNavn: "Slottsplassen",
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
    bygninger: [bygg81416001],
  }
}
