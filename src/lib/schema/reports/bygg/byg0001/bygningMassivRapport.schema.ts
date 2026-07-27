import { z } from "@hono/zod-openapi"
import { rapportSchema } from "../../../core/rapport.schema"
import { valgfriListe } from "../../../core/utils/zodUtils.ts"
import { byggUtvalgskriterierSchema } from "../shared/byggUtvalgskriterier.schema.ts"
import { bygningMassivSchema } from "./bygningMassiv.schema.ts"

export const bygningMassivRapportSchema = rapportSchema
  .extend({
    rapportKode: z.literal("BYG0001").meta({
      description: "Rapportkoden for rapport: Bygning - Massiv",
      example: "BYG0001",
    }),
    utvalgskriterier: byggUtvalgskriterierSchema,
    bygninger: valgfriListe(bygningMassivSchema),
  })
  .meta({
    id: "BYG0001",
    title: "BYG0001: Bygning - Massiv",
    description:
      "Massivrapport for bygninger. Viser hver bygning med bruksenheter, bygningsendringer, " +
      "hjemmelshavere, tiltakshavere, kontaktpersoner og kulturminner.",
  })

export type Byg0001Rapport = z.infer<typeof bygningMassivRapportSchema>
