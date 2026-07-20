import { z } from "@hono/zod-openapi"
import { bygningstypeSchema } from "../shared/bygningstype.schema"
import { bruksenhetSchema } from "./bruksenhet.schema"
import { bygningsendringSchema } from "./bygningsendring.schema"

export const bygningSchema = z
  .object({
    id: z.number().int().nonnegative(),
    bygningsnr: z.string().min(1),
    bygningstype: bygningstypeSchema,
    naeringsgruppe: z.string().min(1),
    matrikkelenhet: z.string().min(1).meta({
      example: "12/345/0/67",
    }),
    bruksenheter: z.array(bruksenhetSchema),
    endringer: z.array(bygningsendringSchema).min(1),
  })
  .meta({ id: "BYG0011Bygning" })

export type Bygning = z.infer<typeof bygningSchema>
