import { z } from "@hono/zod-openapi"

export const posisjonskvalitetSchema = z
  .object({
    malemetode: z.string().optional(), // TODO: Fiks kodeverdi for denne?
    noyaktighet: z.number().int().optional(),
  })
  .meta({
    title: "Posisjonskvalitet",
    description:
      "Beskrivelse av kvaliteten pa stedfestingen (målemetode og nøyaktighet).",
  })
  .optional()

export type Posisjonskvalitet = NonNullable<
  z.infer<typeof posisjonskvalitetSchema>
>
