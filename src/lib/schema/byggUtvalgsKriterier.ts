import { z } from "@hono/zod-openapi"
import { bygningstypeSchema } from "./bygningstypeSchema"

const matrikkelenhetSchema = z
  .object({
    gnr: z.number().nonnegative().optional().meta({ example: 208 }),
    bnr: z.number().nonnegative().optional().meta({ example: 12 }),
    fnr: z.number().nonnegative().nullable().meta({ example: null }),
    snr: z.number().nonnegative().nullable().meta({ example: null }),
  })
  .optional()
  .meta({ id: "Matrikkelenhet" })

const byggningsStatuser = [
  "Rammetillatelse",
  "Igangsettingstillatelse",
  "Midlertidig brukstillatelse",
  "Ferdigattest",
  "Tatt i bruk",
  "Meldingssak registrer tiltak",
  "Meldingssak tiltak fullført",
  "Tiltak unntatt fra byggesalsbehandling",
  "Bygning revert/brent",
  "Bygging avlyst",
  "Bygning flyttet",
  "Byggningsnummer utgått",
  "Fritatt for søknadsplikt",
]

export const byggUtvalgsKriterierSchema = z
  .object({
    omfang: z
      .object({
        bestaaendeBygg: z.boolean().optional().default(false).meta({
          description: "Skal rapporten inkludere bestående bygg?",
        }),
        utgaatteBygg: z.boolean().optional().default(false).meta({
          description: "Skal rapporten inkludere utgåtte bygg?",
        }),
        bygninger: z.boolean().optional().default(false).meta({
          description: "Skal rapporten inkludere bygninger?",
        }),
        bygningsendringer: z.boolean().optional().default(false).meta({
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
        lopenr: z.number().optional().meta({ example: 1 }),
      })
      .optional(),
    adresse: z
      .object({
        adressekode: z.string().optional().meta({ example: "1000" }),
        bruksenhetsnr: z.string().optional().meta({
          example: "H0101",
        }),
        adressenavn: z.string().optional().meta({ example: "Storgata" }),
        nr: z.number().nonnegative().optional().meta({ example: 1 }),
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
          .meta({ example: byggningsStatuser }),
        tidligere: z
          .array(z.string())
          .optional()
          .default([])
          .meta({ example: byggningsStatuser }),
        periodeFra: z.iso.date().optional().meta({ example: "2019-01-01" }),
        periodeTil: z.iso.date().optional().meta({ example: "2026-07-17" }),
      })
      .optional(),
    sokevindu: z
      .object({
        nedreVenstre: z.object({
          nord: z.number().optional().meta({ example: 6642000 }),
          ost: z.number().optional().meta({ example: 597300 }),
        }),
        ovreHoeyre: z.object({
          nord: z.number().optional().meta({ example: 6642200 }),
          ost: z.number().optional().meta({ example: 597500 }),
        }),
      })
      .optional(),
    subrapporter: z
      .object({
        etasjer: z.boolean().optional().default(false),
        bruksenheter: z.boolean().optional().default(false),
        tiltakshavere: z.boolean().optional().default(false),
        kontaktpersoner: z.boolean().optional().default(false),
        hjemmelshavere: z.boolean().optional().default(false),
        kulturminner: z.boolean().optional().default(false),
      })
      .optional(),
  })
  .meta({
    id: "Utvalgskriterier",
    example: {
      omfang: {
        bestaaendeBygg: true,
        utgaatteBygg: false,
        bygninger: true,
        bygningsendringer: true,
        inkluderFrededeBygninger: true,
      },
      bygning: {
        bygningsnr: "123456789",
        bygningstyper: [{ kode: 111, navn: "Enebolig" }],
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
        periodeFra: "2019-01-01",
        periodeTil: "2026-07-17",
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
  })

export type ByggUtvalgsKriterier = z.infer<typeof byggUtvalgsKriterierSchema>
