import { z } from "@hono/zod-openapi"

export const bygningstypeSchema = z
  .object({
    kode: z.number().int().nonnegative().meta({ example: 111 }),
    navn: z.string().min(1).meta({ example: "Enebolig" }),
  })
  .meta({ id: "ByggBygningstype" })

export type Bygningstype = z.infer<typeof bygningstypeSchema>
