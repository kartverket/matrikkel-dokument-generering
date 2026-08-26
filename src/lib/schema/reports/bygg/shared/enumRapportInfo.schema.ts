import { z } from "@hono/zod-openapi"
import { nyEndretSlettetEnum } from "../koder/nyEndretSlettetEnum.ts"

export const enumRapportInfoSchema = z
  .object({
    kode: z.string().optional(),
    kodeverdi: z.string().optional(),
    beskrivelse: z.string().nullable().optional(),
    nyEndretSlettet: nyEndretSlettetEnum.optional(),
  })
  .meta({
    title: "EnumRapportInfo",
  })
  .optional()

export type EnumRapportInfo = NonNullable<z.infer<typeof enumRapportInfoSchema>>
