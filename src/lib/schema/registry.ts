import { z } from "zod"

export const supportedReportTypes = ["BYG0011"] as const

export const rapportTypeSchema = z.enum(supportedReportTypes).meta({
  id: "RapportType",
  example: "BYG0011",
  description: "Rapportkode for rapporten som skal genereres.",
})

export type RapportType = z.infer<typeof rapportTypeSchema>
