import { z } from "@hono/zod-openapi"

export const sefrakSchema = z.object({
  objektnr: z.string().optional(),
  objektnavn: z.string().optional(),
  kommunenr: z.string().optional(),
  registreringskretsnr: z.number().int().nonnegative().optional(),
  huslopenr: z.number().int().nonnegative().optional(),
}).meta({
  title: "SefrakIdentRapportInfo",
  description:
    "SEFRAK-identifikasjon med felter fra SefrakIdentRapportInfo-klassen.",
})
