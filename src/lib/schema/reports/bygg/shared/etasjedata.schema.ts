import { z } from "@hono/zod-openapi"

export const etasjedataSchema = z
  .object({
    antallBoenheter: z.number().int().optional(),
    bruksarealTilBolig: z.number().optional(),
    bruksarealTilAnnet: z.number().optional(),
    bruksarealTotalt: z.number().optional(),
    alternativtAreal: z.number().optional(),
    alternativtAreal2: z.number().optional(),
    bruttoarealTilBolig: z.number().optional(),
    bruttoarealTilAnnet: z.number().optional(),
    bruttoarealTotalt: z.number().optional(),
  })
  .meta({
    title: "Etasjedata",
    description:
      "Sumfelt for etasjeinformasjon pa bygning, inkludert areal- og boenhetssummer.",
  })
  .optional()
