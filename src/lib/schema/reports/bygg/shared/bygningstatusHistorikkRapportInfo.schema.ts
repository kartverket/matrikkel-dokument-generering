import { z } from "@hono/zod-openapi"
import { kodeSchemaOgTekst } from "../../../core/utils/zodUtils.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema"
import { nyEndretSlettetEnum } from "../koder/nyEndretSlettetEnum.ts"

export const bygningstatusHistorikkRapportInfoSchema = z
  .object({
    dato: z.iso.datetime({ offset: true }).nullable().optional(),
    regDato: z.iso.datetime({ offset: true }).nullable().optional(),
    nyEndretSlettet: nyEndretSlettetEnum.optional(),

    bygningstatusKode: kodeSchemaOgTekst(byggningsStatusKodeSchema),
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
