import { z } from "@hono/zod-openapi"
import {
  valgfriBool,
  valgfriDato,
  valgfriHeltall,
  valgfriNummer,
  valgfriObjekt,
  valgfriString,
} from "../../shared/zodUtils.ts"
import { bygningsTypeSchema } from "./bygningsType.schema"

const bygningsstatuser = [
  "Rammetillatelse",
  "Igangsettingstillatelse",
  "Midlertidig brukstillatelse",
  "Ferdigattest",
  "Tatt i bruk",
  "Meldingssak registrer tiltak",
  "Meldingssak tiltak fullført",
  "Tiltak unntatt fra byggesaksbehandling",
  "Bygning revet/brent",
  "Bygging avlyst",
  "Bygning flyttet",
  "Bygningsnummer utgått",
  "Fritatt for søknadsplikt",
] as const

// Felles utvalgskriterier for all bygg rapporter (BYGXXXX)
export const byggUtvalgskriterierSchema = valgfriObjekt({
  omfang: z.object({
    inkluderBestaaendeBygg: valgfriBool.meta({
      description: "Skal rapporten inkludere bestående bygg?",
    }),
    inkluderUtgaatteBygg: valgfriBool.meta({
      description: "Skal rapporten inkludere utgåtte bygg?",
    }),
    inkluderBygninger: valgfriBool.meta({
      description: "Skal rapporten inkludere bygninger?",
    }),
    inkluderBygningsendringer: valgfriBool.meta({
      description: "Skal rapporten inkludere bygningsendringer?",
    }),
    inkluderFrededeBygninger: valgfriBool.meta({
      description: "Skal rapporten inkludere fredede bygninger?",
    }),
  }),
  bygning: valgfriObjekt({
    bygningsnr: valgfriString.meta({
      example: "123456789",
      description: "Bygningsnummeret til bygget som rapporten skal omfatte.",
    }),
    bygningstyper: z
      .array(bygningsTypeSchema)
      .optional()
      .default([])
      .meta({ example: [{ kode: "111" }] }),
    lopenr: valgfriHeltall.meta({ example: 1 }),
  }),
  adresse: valgfriObjekt({
    adresseKode: valgfriString.meta({
      example: "1000",
      description:
        "Adressekode (tidligere gatekode) er et nummer som entydig identifiserer adresserbare\n" +
        "gater, veger, stier, plasser og områder som er ført i matrikkelen.",
    }),
    adresseNavn: valgfriString.meta({
      example: "Storgata",
      description:
        "Adressenavn er definert i matrikkelforskriften § 2 bokstav e som navn på gate, veg, sti,\n" +
        "plass eller område, brukt som del av den offisielle adressen. Et adressenavn skal være\n" +
        "entydig innenfor samme kommune. To gater kan således ikke ha samme navn i samme\n" +
        "kommune. Dersom to eller flere kommuner har et felles adresseringsområde skal navnet\n" +
        "være entydig innenfor alle de aktuelle kommunene. Dersom navnet er på flere enn 22\n" +
        "posisjoner, skal det i tillegg tildeles en offisiell forkortelse for navnet. Nærmere regler om\n" +
        "tildeling av adressenavn framgår av matrikkelforskriften § 51.",
    }),
    adresseNr: valgfriHeltall.meta({
      example: 1,
      description:
        "Adressenummer er definert i matrikkelforskriften § 2 bokstav f, som et nummer og en\n" +
        "eventuell bokstav som entydig identifiserer matrikkelenheter, anlegg, bygninger eller\n" +
        "innganger til bygninger innenfor en adresserbar gate, veg, sti, plass eller område.\n" +
        "Adressenummeret kan peke til områder, plasser og objekter hvor det ikke finnes noe bygg.",
    }),
    adresseTilleggsNavn: valgfriString.meta({
      example: "Solgløtt",
      description:
        "Etter matrikkelforskriften § 54 er det åpnet for at vegadresser kan ha et tilleggsnavn,\n" +
        "adressetilleggsnavn, som inngår i den offisielle adressen. Bakgrunnen for dette er et ønske\n" +
        "om å kunne ta vare på bruksnavn av kulturhistorisk verdi, slik at disse kan komme i vanlig\n" +
        "bruk som en del av den offisielle adressen. Dersom matrikkeladresser ikke har et\n" +
        "adressetilleggsnavn kan de tildeles matrikkeladressenavn.",
    }),

    adresseBokstav: valgfriString.meta({
      example: "A",
      description:
        "En eventuell bokstav etter adressenummeret. Eksempel: A i «Storgata 15A",
    }),

    bruksenhetsNr: valgfriString.meta({
      example: "H0101",
      description:
        "Nummeret som identifiserer en bestemt leilighet eller annen bruksenhet når flere enheter har samme gateadresse" +
        "Eksempelvis betyr H0203 normalt hovedetasje, etasje 2, bruksenhet 03.",
    }),

    utenBokstav: z
      .boolean()
      .nullable()
      .optional()
      .default(null)
      .meta({
        description:
          "Betyr at søket skal omfatte adresser som bare har nummer, uten bokstav.\n" +
          "true: Bare adresser uten bokstav, for eksempel Storgata 15" +
          "false: Bare adresser med bokstav, for eksempel Storgata 15A" +
          "null: Både adresser med og uten bokstav tas med" +
          "Eksempel: «Storgata 15», men ikke «Storgata 15A».",
      }),
  }),
  matrikkelenhet: valgfriObjekt({
    gnr: valgfriHeltall.meta({
      title: "Gårdsnummer",
      description: "Nummeret på et større geografisk område innen kommunen.",
    }),
    bnr: valgfriHeltall.meta({
      title: "Bruksnummer",
      description: "Nummeret på den enkelte eiendommen innenfor gårdsnummeret.",
    }),
    fnr: valgfriHeltall.meta({
      title: "Festenummer",
      description:
        "Nummeret brukes når tomten er festet, altså leid på lang tid, i stedet for eid som egen grunneiendom.",
    }),
    snr: valgfriHeltall.meta({
      title: "Seksjonsnummer",
      description:
        "Nummeret brukes når eiendommen er seksjonert, for eksempel en eierleilighet eller næringsseksjon i et sameie.",
    }),
  }),
  hjemmelshaver: valgfriObjekt({
    foedselsEllerOrgnr: valgfriString.meta({ example: "999999999" }),
    etternavn: valgfriString.meta({ example: "Nordmann" }),
    fornavn: valgfriString.meta({ example: "Ola" }),
  }),
  bygningsstatus: valgfriObjekt({
    naavaerende: z
      .array(z.string())
      .optional()
      .default([])
      .meta({ example: bygningsstatuser }),
    tidligere: z
      .array(z.string())
      .optional()
      .default([])
      .meta({ example: bygningsstatuser }),
    periodeFra: valgfriDato.meta({ example: "2019-01-01T00:00:00Z" }),
    periodeTil: valgfriDato.meta({ example: "2026-07-17T00:00:00Z" }),
  }),
  sokevindu: valgfriObjekt({
    nord: valgfriNummer.meta({ example: 6642000 }),
    ost: valgfriNummer.meta({ example: 597300 }),
    vest: valgfriNummer.meta({ example: 597500 }),
    syd: valgfriNummer.meta({ example: 6642200 }),
  }).meta({
    description:
      "Koordinater for søkevinduet som rapporten skal omfatte. Oppgis i format av valgt koordinatSystemKode.",
  }),
  subrapporter: valgfriObjekt({
    inkluderEtasjer: valgfriBool.meta({
      description: "Skal rapporten inneholde etasjer?",
    }),
    inkluderBruksenheter: valgfriBool,
    inkluderTiltakshavere: valgfriBool,
    inkluderKontaktpersoner: valgfriBool,
    inkluderHjemmelshavere: valgfriBool,
    inkluderKulturminner: valgfriBool,
  }),
}).meta({
  id: "ByggUtvalgskriterier",
  example: {
    omfang: {
      inkluderBestaaendeBygg: true,
      inkluderUtgaatteBygg: false,
      inkluderBygninger: true,
      inkluderBygningsendringer: true,
      inkluderFrededeBygninger: true,
    },
    bygning: {
      bygningsnr: "123456789",
      bygningstyper: [{ kode: "111" }],
      lopenr: 1,
    },
    adresse: {
      adressekode: "1000",
      bruksenhetsnr: "H0101",
      adressenavn: "Storgata",
      nr: 1,
      bokstav: "A",
      utenBokstav: false,
      tilleggsnavn: "Solgløtt",
    },
    matrikkelenhet: { gnr: 208, bnr: 12, fnr: null, snr: null },
    hjemmelshaver: {
      foedselsEllerOrgnr: "999999999",
      etternavn: "Nordmann",
      fornavn: "Ola",
    },
    bygningsstatus: {
      naavaerende: ["Tatt i bruk"],
      tidligere: ["Rammetillatelse"],
      periodeFra: "2019-01-01T00:00:00Z",
      periodeTil: "2026-07-17T00:00:00Z",
    },
    sokevindu: {
      nord: 6642000,
      ost: 597300,
      vest: 597500,
      syd: 6642200,
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
})

export type ByggUtvalgskriterier = z.infer<typeof byggUtvalgskriterierSchema>
