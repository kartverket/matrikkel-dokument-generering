import { z } from "@hono/zod-openapi"
import { rapportSchema } from "../../../core/rapport.schema"
import { valgfriListe } from "../../../core/utils/zodUtils.ts"
import { byggUtvalgskriterierSchema } from "../shared/byggUtvalgskriterier.schema.ts"
import { byggEndringSchema } from "./byggEndring.schema.ts"

const bygningSchema = z.object({
  bygningsnr: z.string().min(1).meta({
    title: "Bygningsnummer",
    description:
      "En entydig identifikasjon av bygningen som er unik på landsbasis og tildeles automatisk.",
    example: "12 345 678",
  }),

  matrikkelNr: z.string().min(1).meta({
    title: "Matrikkelnummer",
    example: "12/345/0/67",
    description: "KommuneNr / GårdsNr / BruksNr / Festenr",
  }),

  endringer: valgfriListe(byggEndringSchema),
})

export const byggRapportSchema = rapportSchema
  .extend({
    utvalgskriterier: byggUtvalgskriterierSchema,
    bygninger: valgfriListe(bygningSchema),
  })
  .meta({
    id: "BYG0011",
    title: "BYG0011 - Byggrapport",
  })

export type Bygning = z.infer<typeof bygningSchema>
export type Byg0011Rapport = z.infer<typeof byggRapportSchema>
