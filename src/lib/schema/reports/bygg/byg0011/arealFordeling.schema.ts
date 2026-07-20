import { z } from "@hono/zod-openapi"
import { valgfriNummer } from "../../../core/common"

const arealKvadratmeter = valgfriNummer.meta({
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

export type ArealFordeling = z.infer<typeof arealFordelingSchema>
