import { z } from "@hono/zod-openapi"

export const bygningstypeSchema = z
  .object({
    kode: z.number().optional().meta({ example: 111 }),
    navn: z.string().optional().meta({ example: "Enebolig" }),
  })
  .meta({ id: "Bygningstype" })
