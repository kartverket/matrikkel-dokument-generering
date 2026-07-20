import { z } from "@hono/zod-openapi"

export const arealFordelingSchema = z
  .object({
    bolig: z.number().nonnegative().meta({
      example: 123.4,
    }),
    annet: z.number().nonnegative().meta({
      example: 123.4,
    }),
    totalt: z.number().nonnegative().meta({
      example: 123.4,
    }),
  })
  .meta({
    id: "BYG0011ArealFordeling",
    description: "Areal i kvadratmeter.",
  })
