import { z } from "@hono/zod-openapi"
import {
  bygningstypeSchema,
  heltallSchema,
  koordinatSchema,
  matrikkelenhetSchema,
  tekstSchema,
} from "./commonSchemas"

export const utvalgskriterierSchema = z
  .object({
    omfang: z.object({
      bestaaendeBygg: z.boolean().optional().default(false),
      utgaatteBygg: z.boolean().optional().default(false),
      bygninger: z.boolean().optional().default(false),
      bygningsendringer: z.boolean().optional().default(false),
      inkluderFrededeBygninger: z.boolean().optional().default(false),
    }),
    bygning: z.object({
      bygningsnr: z.string().optional(),
      bygningstyper: z.array(bygningstypeSchema).optional().default([]),
      lopenr: z.number().optional(),
    }),
    adresse: z.object({
      adressekode: z.string().optional(),
      bruksenhetsnr: z.string().optional().meta({
        example: "H0101",
      }),
      adressenavn: z.string().optional(),
      nr: heltallSchema.nullable(),
      bokstav: z.string().optional(),
      utenBokstav: z.boolean(),
      tilleggsnavn: z.string().optional(),
    }),
    matrikkelenhet: matrikkelenhetSchema,
    hjemmelshaver: z.object({
      foedselsEllerOrgnr: z.string().optional(),
      etternavn: z.string().optional(),
      fornavn: z.string().optional(),
    }),
    bygningsstatus: z.object({
      naavaerende: z.array(tekstSchema),
      tidligere: z.array(tekstSchema),
      periodeFra: z.string().optional(),
      periodeTil: z.string().optional(),
    }),
    sokevindu: z
      .object({
        nedreVenstre: koordinatSchema,
        ovreHoeyre: koordinatSchema,
      })
      .optional(),
    subrapporter: z.object({
      etasjer: z.boolean().optional().default(false),
      bruksenheter: z.boolean().optional().default(false),
      tiltakshavere: z.boolean().optional().default(false),
      kontaktpersoner: z.boolean().optional().default(false),
      hjemmelshavere: z.boolean().optional().default(false),
      kulturminner: z.boolean().optional().default(false),
    }),
  })
  .meta({ id: "Utvalgskriterier" })

export type Utvalgskriterier = z.infer<typeof utvalgskriterierSchema>
