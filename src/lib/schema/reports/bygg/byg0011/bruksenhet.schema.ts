import { z } from "@hono/zod-openapi"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"
import { hjemmelshaverSchema, kontaktpersonSchema } from "./aktoer.schema.ts"

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

    // TODO - Fjerne, dette har vi ikke noe informasjon, og er ikke en del av dagens rapport.
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
    hjemmelshavere: z.array(hjemmelshaverSchema),
    kontaktpersoner: z.array(kontaktpersonSchema),
  })
  .meta({ id: "BYG0011Bruksenhet" })

export type Bruksenhet = z.infer<typeof bruksenhetSchema>
