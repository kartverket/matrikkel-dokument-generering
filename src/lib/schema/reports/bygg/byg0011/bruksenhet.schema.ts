import { z } from "@hono/zod-openapi"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"

// TODO - Gjennomgå feltene
// TODO - Differansiere i typedefinisjonen mellom bruksenhet-payloaden vi får inn, og den vi selv bruker
export const bruksenhetSchema = z
  .object({
    id: z.string().min(1),
    nummer: z.string().min(1).nullable().optional(),
    type: z.string().min(1).nullable().optional(),
    seksjon: z.string().min(1).nullable().optional(),
    adresse: z.string().min(1).nullable().optional(),
    etasje: z.string().min(1).nullable().optional(),
    antallRom: z.number().int().nonnegative(),
    kjokkentilgang: z.boolean().nullable(),
    antallBad: z.number().int().nonnegative(),
    antallWc: z.number().int().nonnegative(),

    // TODO - Fjerne, dette har vi ikke noe informasjon om knyttet opp mot en bruksenhet. Vi har kun informasjon om arealfordeling på bygg og etasje- nivå.
    arealfordeling: z.object({
      bebygdAreal: z.number().nonnegative(),
      bruksareal: arealFordelingSchema,
      etasjeplan: z.array(
        z.object({
          etasjeplan: z.string().min(1).meta({
            example: "Hovedetasje",
          }),
          etasje: z.number().int().nonnegative().meta({
            example: 1,
          }),
          antallBoenheter: z.number().int().nonnegative(),
          bruksareal: arealFordelingSchema,
          bruttoareal: arealFordelingSchema,
        }),
      ),
    }),
  })
  .meta({ id: "BYG0011Bruksenhet" })

export type Bruksenhet = z.infer<typeof bruksenhetSchema>
