import { z } from "@hono/zod-openapi"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema"

export const bygningstatusHistorikkRapportInfoSchema = z
  .object({
    // Direkte felter pa klassen.
    dato: z.iso.datetime({ offset: true }).nullable().optional(),
    regDato: z.iso.datetime({ offset: true }).nullable().optional(),
    nyEndretSlettet: z.string().optional().meta({
      description: "N=Ny, E=Endret, S=Slettet.",
      example: "N",
    }),

    // Getter-baserte felter.
    bygningstatus: z.string().optional().meta({
      description: "Bygnngstatus som tekst",
    }),
    bygningstatusKode: byggningsStatusKodeSchema.optional().meta({
      description: "Bygningstatus som kodeverdi",
    }),
    harRegDato: z.boolean().optional(),
    harDato: z.boolean().optional(),
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
