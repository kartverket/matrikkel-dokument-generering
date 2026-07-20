import { z } from "@hono/zod-openapi"
import { bygningstypeSchema } from "./bygningstype.schema"

const matrikkelenhetSchema = z
  .object({
    gnr: z.number().int().nonnegative().optional().meta({ example: 208 }),
    bnr: z.number().int().nonnegative().optional().meta({ example: 12 }),
    fnr: z
      .number()
      .int()
      .nonnegative()
      .nullable()
      .optional()
      .meta({ example: null }),
    snr: z
      .number()
      .int()
      .nonnegative()
      .nullable()
      .optional()
      .meta({ example: null }),
  })
  .optional()
  .meta({ id: "ByggMatrikkelenhetKriterium" })

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

export const byggUtvalgskriterierSchema = z
  .object({
    omfang: z
      .object({
        inkluderBestaaendeBygg: z.boolean().optional().default(false).meta({
          description: "Skal rapporten inkludere bestående bygg?",
        }),
        inkluderUtgaatteBygg: z.boolean().optional().default(false).meta({
          description: "Skal rapporten inkludere utgåtte bygg?",
        }),
        inkluderBygninger: z.boolean().optional().default(false).meta({
          description: "Skal rapporten inkludere bygninger?",
        }),
        inkluderBygningsendringer: z.boolean().optional().default(false).meta({
          description: "Skal rapporten inkludere bygningsendringer?",
        }),
        inkluderFrededeBygninger: z.boolean().optional().default(false).meta({
          description: "Skal rapporten inkludere fredede bygninger?",
        }),
      })
      .optional(),
    bygning: z
      .object({
        bygningsnr: z.string().optional().meta({
          example: "123456789",
          description:
            "Bygningsnummeret til bygget som rapporten skal omfatte.",
        }),
        bygningstyper: z
          .array(bygningstypeSchema)
          .optional()
          .default([])
          .meta({ example: [{ kode: 111, navn: "Enebolig" }] }),
        lopenr: z.number().int().nonnegative().optional().meta({ example: 1 }),
      })
      .optional(),
    adresse: z
      .object({
        adressekode: z.string().optional().meta({ example: "1000" }),
        bruksenhetsnr: z.string().optional().meta({ example: "H0101" }),
        adressenavn: z.string().optional().meta({ example: "Storgata" }),
        nr: z.number().int().nonnegative().optional().meta({ example: 1 }),
        bokstav: z.string().optional().meta({ example: "A" }),
        utenBokstav: z.boolean().optional(),
        tilleggsnavn: z.string().optional().meta({ example: "Solgløtt" }),
      })
      .optional(),
    matrikkelenhet: matrikkelenhetSchema,
    hjemmelshaver: z
      .object({
        foedselsEllerOrgnr: z
          .string()
          .optional()
          .meta({ example: "999999999" }),
        etternavn: z.string().optional().meta({ example: "Nordmann" }),
        fornavn: z.string().optional().meta({ example: "Ola" }),
      })
      .optional(),
    bygningsstatus: z
      .object({
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
        periodeFra: z.iso
          .datetime({ offset: true })
          .optional()
          .meta({ example: "2019-01-01T00:00:00Z" }),
        periodeTil: z.iso
          .datetime({ offset: true })
          .optional()
          .meta({ example: "2026-07-17T00:00:00Z" }),
      })
      .optional(),
    sokevindu: z
      .object({
        nord: z.number().meta({ example: 6642000 }),
        ost: z.number().meta({ example: 597300 }),
        vest: z.number().meta({ example: 597500 }),
        syd: z.number().meta({ example: 6642200 }),
      })
      .optional()
      .meta({
        description: "Koordinater for søkevinduet som rapporten skal omfatte.",
      }),
    subrapporter: z
      .object({
        inkluderEtasjer: z.boolean().optional().default(false),
        inkluderBruksenheter: z.boolean().optional().default(false),
        inkluderTiltakshavere: z.boolean().optional().default(false),
        inkluderKontaktpersoner: z.boolean().optional().default(false),
        inkluderHjemmelshavere: z.boolean().optional().default(false),
        inkluderKulturminner: z.boolean().optional().default(false),
      })
      .optional(),
  })
  .meta({
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
        bygningstyper: [{ kode: "111", navn: "Enebolig" }],
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
