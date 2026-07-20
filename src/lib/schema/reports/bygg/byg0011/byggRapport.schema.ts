import { z } from "@hono/zod-openapi"
import { rapportSchema } from "../../../core/rapport.schema"
import {
  valgfriListe,
  valgfriNummer,
  valgfriObjekt,
} from "../../shared/zodUtils.ts"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"
import { byggUtvalgskriterierSchema } from "../shared/byggUtvalgskriterier.schema.ts"
import { bruksenhetSchema } from "./bruksenhet.schema"
import { byggEndringSchema } from "./byggEndring.schema.ts"

const bygningSchema = z
  .object({
    bygningsnr: z.string().min(1).meta({
      example: "12 345 678",
    }),

    matrikkelenhetsNr: z.string().min(1).meta({
      title: "Matrikkelenhetsnummer",
      example: "12/345/0/67",
      description: "KommuneNr / GårdsNr / BruksNr / Festenr",
    }),
    etasjePlan: valgfriListe(
      valgfriObjekt({
        etasjeplan: z.string().min(1).meta({
          example: "Hovedetasje",
        }),
        etasje: z.number().int().nonnegative().meta({
          example: 1,
        }),
        antallBoenheter: valgfriNummer,
        bruksareal: arealFordelingSchema,
        bruttoareal: arealFordelingSchema,
      }),
    ),
    bruksenheter: z.array(bruksenhetSchema).optional().default([]),
    endringer: z.array(byggEndringSchema).optional().default([]),
  })
  .meta({ id: "BYG0011Bygning" })

export const byggRapportSchema = rapportSchema
  .extend({
    rapportType: z.literal("BYG0011").meta({ example: "BYG0011" }),
    utvalgskriterier: byggUtvalgskriterierSchema,
    bygninger: z.array(bygningSchema).optional().default([]),
  })
  .openapi("BYG0011", {
    title: "BYG0011",
  })

export type Bygning = z.infer<typeof bygningSchema>
export type EtasjePlan = z.infer<typeof etasjePlanSchema>
export type Byg0011Rapport = z.infer<typeof byggRapportSchema>
