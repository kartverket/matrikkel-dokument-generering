import { z } from "@hono/zod-openapi"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema"
import { nyEndretSlettetEnum } from "../koder/nyEndretSlettetEnum.ts"

export const bygningstatusHistorikkRapportInfoSchema = z
  .object({
    dato: z.iso.datetime({ offset: true }).nullable().optional(),
    regDato: z.iso.datetime({ offset: true }).nullable().optional(),
    nyEndretSlettet: nyEndretSlettetEnum.optional(),

    bygningstatusKode: byggningsStatusKodeSchema.optional().meta({
      description: "Bygningstatus som kodeverdi",
    }),
    datoSOSI: z.string().optional(),
    regDatoSOSI: z.string().optional(),
  })
  .meta({
    title: "BygningstatusHistorikkRapportInfo",
    description:
      "Historikk for bygningsstatus med felter fra klasse og getter-basert presentasjon.",
  })
  .optional()

export type BygningstatusHistorikkRapportInfo = NonNullable<
  z.infer<typeof bygningstatusHistorikkRapportInfoSchema>
>
