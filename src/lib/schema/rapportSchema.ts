import { z } from "zod"

export const rapportLocaleSchema = z.enum(["nb", "nn"])

const kommuneSchema = z.object({
  nr: z.string().min(1),
  navn: z.string().min(1),
})

export const rapportSchema = z.object({
  rapportType: z.string().min(1),
  tittel: z.string().min(1, "Title is required"),
  kommune: kommuneSchema,
  koordinatsystem: z.string().min(1),
  locale: rapportLocaleSchema,
  generertTidspunkt: z.string().min(1),
})

export type Rapport = z.infer<typeof rapportSchema>
export type RapportLocale = z.infer<typeof rapportLocaleSchema>
