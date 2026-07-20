import { z } from "@hono/zod-openapi"
import { arealFordelingSchema } from "./areal.schema"
import { bygningsetasjeSchema } from "./bygningsetasje.schema"
import { koordinatSchema } from "./koordinat.schema"
import { hjemmelshaverSchema, kontaktpersonSchema } from "./person.schema"

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
    arealfordeling: z.object({
      bebygdAreal: z.number().nonnegative(),
      bruksareal: arealFordelingSchema,
      koordinat: koordinatSchema,
      etasjeplan: z.array(bygningsetasjeSchema),
    }),
    hjemmelshavere: z.array(hjemmelshaverSchema),
    kontaktpersoner: z.array(kontaktpersonSchema),
  })
  .meta({ id: "BYG0011Bruksenhet" })

export type Bruksenhet = z.infer<typeof bruksenhetSchema>
