import { z } from "@hono/zod-openapi"

const arealKvadratmeter = z
  .number()
  .nonnegative()
  .nullable()
  .optional()
  .default(null)
  .meta({
    description: "Areal i kvadratmeter.",
    example: 123.4,
  })

export const arealFordelingSchema = z
  .object({
    bolig: arealKvadratmeter,
    annet: arealKvadratmeter,
    totalt: arealKvadratmeter,
  })
  .meta({
    id: "BYG0011ArealFordeling",
    description: "Areal i kvadratmeter.",
  })
