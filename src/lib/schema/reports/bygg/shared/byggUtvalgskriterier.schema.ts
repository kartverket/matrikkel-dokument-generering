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
    adressekode: valgfriString.meta({ example: "1000" }),
    bruksenhetsnr: valgfriString.meta({ example: "H0101" }),
    adressenavn: valgfriString.meta({ example: "Storgata" }),
    nr: valgfriHeltall.meta({ example: 1, title: "Gatenummer" }),
    bokstav: valgfriString.meta({ example: "A" }),
    tilleggsnavn: valgfriString.meta({ example: "Solgløtt" }),
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
        "Brukes når tomten er festet, altså leid på lang tid, i stedet for eid som egen grunneiendom.",
    }),
    snr: valgfriHeltall.meta({
      title: "Seksjonsnummer",
      description:
        "Brukes når eiendommen er seksjonert, for eksempel en eierleilighet eller næringsseksjon i et sameie.",
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
    description: "Koordinater for søkevinduet som rapporten skal omfatte.",
  }),
  subrapporter: valgfriObjekt({
    inkluderEtasjer: valgfriBool,
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
