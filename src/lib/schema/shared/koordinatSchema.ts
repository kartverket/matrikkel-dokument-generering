import { z } from "@hono/zod-openapi"

export const koordinatSchema = z
  .object({
    nord: z.number(),
    ost: z.number(),
  })
  .meta({ id: "Koordinat" })
