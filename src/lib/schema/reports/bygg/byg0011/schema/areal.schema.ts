import { z } from "@hono/zod-openapi"

export const arealFordelingSchema = z
  .object({
    bolig: z.number().nonnegative(),
    annet: z.number().nonnegative(),
  })
  .meta({
    id: "BYG0011ArealFordeling",
    description:
      "Areal i kvadratmeter. Totalt areal beregnes som summen av bolig og annet.",
  })

export type ArealFordeling = z.infer<typeof arealFordelingSchema>
