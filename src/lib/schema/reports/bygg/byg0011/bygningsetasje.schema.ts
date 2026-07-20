import { z } from "@hono/zod-openapi"
import { arealFordelingSchema } from "./areal.schema"

export const bygningsetasjeSchema = z
  .object({
    etasjeplan: z.string().min(1),
    etasje: z.number().int().nonnegative(),
    antallBoenheter: z.number().int().nonnegative(),
    bruksareal: arealFordelingSchema,
    bruttoareal: arealFordelingSchema,
  })
  .meta({ id: "BYG0011Bygningsetasje" })

export type Bygningsetasje = z.infer<typeof bygningsetasjeSchema>
