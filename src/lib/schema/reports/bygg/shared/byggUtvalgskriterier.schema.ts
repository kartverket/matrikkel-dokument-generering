import { z } from "@hono/zod-openapi"
import { bygningstypeSchema } from "./bygningstyper.schema"

const valgfriNummer = z
  .number()
  .nonnegative()
  .nullable()
  .optional()
  .default(null)
const valgfriBool = z.boolean().nullable().optional().default(false)
const valgfriString = z.string().nullable().optional().default(null)

const matrikkelenhetSchema = z
  .object({
    gnr: valgfriNummer.meta({ example: 208 }),
    bnr: valgfriNummer.meta({ example: 12 }),
    fnr: valgfriNummer.meta({ example: null }),
    snr: valgfriNummer.meta({ example: null }),
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
      })
      .optional(),
    bygning: z
      .object({
        bygningsnr: valgfriString.meta({
          example: "123456789",
          description:
            "Bygningsnummeret til bygget som rapporten skal omfatte.",
        }),
        bygningstyper: z
          .array(bygningstypeSchema)
          .optional()
          .default([])
          .meta({ example: [{ kode: 111, navn: "Enebolig" }] }),
        lopenr: valgfriNummer.meta({ example: 1 }),
      })
      .optional(),
    adresse: z
      .object({
        adressekode: valgfriString.meta({ example: "1000" }),
        bruksenhetsnr: valgfriString.meta({
          example: "H0101",
        }),
        adressenavn: z
          .string()
          .nullable()
          .optional()
          .default(null)
          .meta({ example: "Storgata" }),
        nr: valgfriNummer.meta({ example: 1 }),
        bokstav: valgfriString.meta({ example: "A" }),
        utenBokstav: valgfriBool.meta({ example: false }),
        tilleggsnavn: valgfriString.meta({ example: "Solgløtt" }),
      })
      .nullable()
      .optional()
      .default(null),
    matrikkelenhet: matrikkelenhetSchema,
    hjemmelshaver: z
      .object({
        foedselsEllerOrgnr: valgfriString.meta({ example: "999999999" }),
        etternavn: valgfriString.meta({ example: "Nordmann" }),
        fornavn: valgfriString.meta({ example: "Ola" }),
      })
      .nullable()
      .optional()
      .default(null),
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
        periodeFra: z.iso
          .datetime()
          .optional()
          .meta({ example: "2019-01-01T00:00:00Z" }),
        periodeTil: z.iso
          .datetime()
          .optional()
          .meta({ example: "2026-07-17T00:00:00Z" }),
      })
      .nullable()
      .optional()
      .default(null),
    sokevindu: z
      .object({
        nord: valgfriNummer.meta({ example: 6642000 }),
        ost: valgfriNummer.meta({ example: 597300 }),
        vest: valgfriNummer.meta({ example: 597300 }),
        syd: valgfriNummer.meta({ example: 6642000 }),
      })
      .nullable()
      .optional()
      .default(null)
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
      .nullable()
      .optional()
      .default(null),
  })
  .meta({
    id: "Utvalgskriterier",
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
        periodeFra: "2019-01-01T00:00:00Z",
        periodeTil: "2026-07-17T00:00:00Z",
      },
      sokevindu: {
        nedreVenstre: { nord: 6642000, ost: 597300 },
        ovreHoeyre: { nord: 6642200, ost: 597500 },
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

export type ByggUtvalgsKriterier = z.infer<typeof byggUtvalgsKriterierSchema>
