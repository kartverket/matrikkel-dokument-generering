import { z } from "@hono/zod-openapi"

const kommuneSchema = z
  .object({
    nr: z.string().min(1).meta({ example: "0301" }),
    navn: z.string().min(1).meta({ example: "Oslo" }),
  })
  .meta({ id: "Kommune" })

const localeSchema = z.enum(["nb", "nn"]).meta({
  id: "Locale",
  description: "Målform for dokumentet – bokmål (`nb`) eller nynorsk (`nn`).",
})

export const rapportSchema = z
  .object({
    rapportType: z.string().min(1),
    tittel: z.string().min(1, "Title is required"),
    kommune: kommuneSchema,
    koordinatsystem: z.string().min(1).meta({ example: "EUREF89 UTM sone 32" }),
    locale: localeSchema,
    generertTidspunkt: z
      .string()
      .min(1)
      .meta({ example: "2026-07-10T12:00:00Z" }),
  })
  .openapi("Rapport")

export type Rapport = z.infer<typeof rapportSchema>
export type RapportLocale = z.infer<typeof localeSchema>
