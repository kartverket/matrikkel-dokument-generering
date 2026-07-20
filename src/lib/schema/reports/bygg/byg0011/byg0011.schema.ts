import { z } from "@hono/zod-openapi"
import { rapportContextSchema } from "../../../core/rapport-context.schema"
import { byggUtvalgskriterierSchema } from "../shared/utvalgskriterier.schema"
import { bygningSchema } from "./schema/bygning.schema"

export const byg0011Schema = rapportContextSchema
  .extend({
    rapportType: z.literal("BYG0011").meta({ example: "BYG0011" }),
    utvalgskriterier: byggUtvalgskriterierSchema,
    bygninger: z.array(bygningSchema),
  })
  .openapi("BYG0011Rapport", {
    description: "Datagrunnlag for rapporten BYG0011.",
  })

export type Byg0011Rapport = z.infer<typeof byg0011Schema>
