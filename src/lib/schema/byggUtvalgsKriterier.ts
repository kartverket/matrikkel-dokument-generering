import { z } from "@hono/zod-openapi"
import { bygningstypeSchema } from "./reports/BYG0011"

const matrikkelenhetSchema = z
  .object({
    gnr: z.number().nonnegative().optional(),
    bnr: z.number().nonnegative().optional(),
    fnr: z.number().nonnegative().nullable(),
    snr: z.number().nonnegative().nullable(),
  })
  .optional()
  .meta({ id: "Matrikkelenhet" })

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
          example: "12345678",
          description:
            "Bygningsnummeret til bygget som rapporten skal omfatte.",
        }),
        bygningstyper: z.array(bygningstypeSchema).optional().default([]),
        lopenr: z.number().optional(),
      })
      .optional(),
    adresse: z
      .object({
        adressekode: z.string().optional(),
        bruksenhetsnr: z.string().optional().meta({
          example: "H0101",
        }),
        adressenavn: z.string().optional(),
        nr: z.number().nonnegative().optional(),
        bokstav: z.string().optional(),
        tilleggsnavn: z.string().optional(),
      })
      .optional(),
    matrikkelenhet: matrikkelenhetSchema,
    hjemmelshaver: z
      .object({
        foedselsEllerOrgnr: z.string().optional(),
        etternavn: z.string().optional(),
        fornavn: z.string().optional(),
      })
      .optional(),
    bygningsstatus: z
      .object({
        naavaerende: z.array(z.string().optional()).optional().default([]),
        tidligere: z.array(z.string().optional()).optional().default([]),
        periodeFra: z.date().optional(),
        periodeTil: z.date().optional(),
      })
      .optional(),
    sokevindu: z
      .object({
        nedreVenstre: z.object({
          nord: z.number().optional(),
          ost: z.number().optional(),
        }),
        ovreHoeyre: z.object({
          nord: z.number().optional(),
          ost: z.number().optional(),
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
  .meta({ id: "Utvalgskriterier" })

export type ByggUtvalgsKriterier = z.infer<typeof byggUtvalgsKriterierSchema>
