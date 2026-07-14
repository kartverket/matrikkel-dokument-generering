import { z } from "zod"
import { type EpsgCode, koordinatsystemSchema } from "../map/koordinatsystem"

const kommuneSchema = z.object({
  nr: z.string().min(1),
  navn: z.string().min(1),
})

const localeSchema = z.enum(["nb", "nn"]) //Bokmål og nynorsk

export const rapportSchema = z.object({
  rapportType: z.string().min(1),
  tittel: z.string().min(1, "Title is required"),
  kommune: kommuneSchema,
  koordinatsystem: koordinatsystemSchema,
  locale: localeSchema,
  generertTidspunkt: z.string().min(1),
})

export type Rapport = z.infer<typeof rapportSchema>
export type RapportLocale = z.infer<typeof localeSchema>
export type { EpsgCode }
