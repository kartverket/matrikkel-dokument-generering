import { z } from "@hono/zod-openapi"
import { koordinatSystemKodeSchema } from "../../../core/koder/koordinatSystemKode.schema.ts"
import { kodeSchemaOgTekst } from "../../../core/utils/zodUtils.ts"
import { posisjonskvalitetSchema } from "./posisjonskvalitet.schema.ts"

export const representasjonspunktSchema = z
  .object({
    koordinatsystemKode: kodeSchemaOgTekst(koordinatSystemKodeSchema),
    originalKoordinatsystemKode: kodeSchemaOgTekst(koordinatSystemKodeSchema),
    kvalitet: posisjonskvalitetSchema.optional(),

    koordinatkvalitetKode: z.string().optional(), // TODO: Fiks kodeverdi for denne?

    stedfestingVerifisert: z.boolean().optional(),

    nord: z.number().optional(),
    ost: z.number().optional(),
    hoyde: z.number().optional(),
  })
  .meta({
    title: "Representasjonspunkt",
    description:
      "Koordinat som representerer et objekt i kartet, med koordinatsystem, posisjon og kvalitet.",
  })
  .optional()

export type Representasjonspunkt = NonNullable<
  z.infer<typeof representasjonspunktSchema>
>
