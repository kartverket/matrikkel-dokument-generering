import { z } from "@hono/zod-openapi"
import { bygningstypeSchema } from "../shared/bygningstype.schema"
import { bruksenhetSchema } from "./bruksenhet.schema"
import { bygningsendringSchema } from "./bygningsendring.schema"

export const bygningSchema = z
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

export type Bygning = z.infer<typeof bygningSchema>
