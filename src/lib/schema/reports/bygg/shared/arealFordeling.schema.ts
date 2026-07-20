import { z } from "@hono/zod-openapi"
import { valgfriNummer } from "../../shared/zodUtils.ts"

export const arealFordelingSchema = z
  .object({
    boligAreal: valgfriNummer.meta({
      description: "Areal som er registrert brukt til boligformål",
      example: 123.4,
    }),
    annetAreal: valgfriNummer.meta({
      description:
        "Areal brukt til andre formål, for eksempel hotell, kontor, butikk",
      example: 10,
    }),
    totaltAreal: valgfriNummer.meta({
      description: "Summen av Bolig + Annet",
      example: 133.4,
    }),
  })
  .meta({
    id: "ArealFordeling",
    description: "Alle verdier oppgitt i kvadratmeter.",
  })

export type ArealFordeling = z.infer<typeof arealFordelingSchema>
