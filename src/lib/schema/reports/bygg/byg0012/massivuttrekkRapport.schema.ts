import { z } from "@hono/zod-openapi"
import { rapportSchema } from "../../../core/rapport.schema"
import { valgfriListe } from "../../../core/utils/zodUtils.ts"
import { byggUtvalgskriterierSchema } from "../shared/byggUtvalgskriterier.schema.ts"
import { massivuttrekkByggSchema } from "./massivuttrekkBygg.schema.ts"

export const massivuttrekkRapportSchema = rapportSchema
  .extend({
    rapportKode: z.literal("BYG0012").meta({
      description: "Rapportkoden for massivuttrekk bygg.",
      example: "BYG0012",
    }),
    utvalgskriterier: byggUtvalgskriterierSchema,
    bygg: valgfriListe(massivuttrekkByggSchema),
  })
  .meta({
    id: "BYG0012",
    title: "BYG0012 - Massivuttrekk bygg",
    description: `Massivuttrekk av bygg med tilhørende bruksenheter og etasjer. 
      Hvilke opplysninger som kan utleveres avhenger av hjemmel: enkelte felter kan utleveres etter 
      matrikkelloven paragraf 13, resten kun etter søknad.`,
  })

export type Byg0012Rapport = z.infer<typeof massivuttrekkRapportSchema>
