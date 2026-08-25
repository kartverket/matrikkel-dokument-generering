import { z } from "@hono/zod-openapi"

export const matrikkelnrRapportInfoSchema = z
  .object({
    kommunenummer: z.string().optional(),
    gnr: z.number().int().nonnegative().optional(),
    bnr: z.number().int().nonnegative().optional(),
    fnr: z.number().int().nonnegative().optional(),
    snr: z.number().int().nonnegative().optional(),
    matrikkelNummer: z.string().optional(),
    annenKommune: z.boolean().optional().meta({
      title: "Annen kommune",
      description:
        "AnnenKommune angir at matrikkelnr tilhører en annen kommune, og at kommunenummeret da bør vises.",
    }),
  })
  .optional()
