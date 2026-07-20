import { z } from "@hono/zod-openapi"

export const kommuneSchema = z.object({
  kommuneNr: z
    .string()
    .meta({ example: "0301", description: "Fire-sifret kommunenummer." }),
  kommuneNavn: z.string().min(1).meta({ example: "Oslo" }),
})

export type Kommune = z.infer<typeof kommuneSchema>
