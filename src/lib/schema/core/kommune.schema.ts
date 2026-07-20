import { z } from "@hono/zod-openapi"

export const kommuneSchema = z
  .object({
    nr: z
      .string()
      .regex(/^\d{4}$/)
      .meta({ example: "0301", description: "Fire-sifret kommunenummer." }),
    navn: z.string().min(1).meta({ example: "Oslo" }),
  })
  .meta({ id: "Kommune" })

export type Kommune = z.infer<typeof kommuneSchema>
