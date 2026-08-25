import { z } from "@hono/zod-openapi"

export const enumRapportInfoSchema = z
  .object({
    kode: z.string().optional(),
    kodeverdi: z.string().optional(),
    beskrivelse: z.string().nullable().optional(),
    nyEndretSlettet: z.string().optional().meta({
      description: "N=Ny, E=Endret, S=Slettet.",
      example: "N",
    }),
  })
  .meta({
    title: "EnumRapportInfo",
  })
  .optional()
