import { z } from "@hono/zod-openapi"

export const koordinatSchema = z.object({
  nord: z.number().meta({
    description: "Koordinatverdien for nord",
    example: 123456789,
  }),
  ost: z.number().meta({
    description: "Koordinatverdien for øst",
    example: 123456789,
  }),
})

export type Koordinat = z.infer<typeof koordinatSchema>
