import { z } from "@hono/zod-openapi"
import { rapportSchema } from "../../../core/rapport.schema"
import { bygningstypeSchema } from "../shared/bygningstype.schema"
import { byggUtvalgskriterierSchema } from "../shared/utvalgskriterier.schema"
import { bruksenhetSchema } from "./bruksenhet.schema"
import { bygningsendringSchema } from "./bygningsendring.schema"

const bygningSchema = z
  .object({
    bygningsnr: z.string().min(1).meta({
      example: "12 345 678",
    }),
    bygningstype: bygningstypeSchema,
    naeringsgruppe: z.string().optional().meta({
      example: "Bolig",
    }),
    matrikkelenhet: z.string().min(1).meta({
      example: "12/345/0/67",
    }),
    bruksenheter: z.array(bruksenhetSchema),
    endringer: z.array(bygningsendringSchema).optional().default([]),
  })
  .meta({ id: "BYG0011Bygning" })

export const byg0011Schema = rapportSchema
  .extend({
    rapportType: z.literal("BYG0011").meta({ example: "BYG0011" }),
    utvalgskriterier: byggUtvalgskriterierSchema,
    bygninger: z.array(bygningSchema),
  })
  .openapi("BYG0011Rapport", {
    description: "Datagrunnlag for rapporten BYG0011.",
  })

export type Byg0011Rapport = z.infer<typeof byg0011Schema>
export type Bygning = z.infer<typeof bygningSchema>
