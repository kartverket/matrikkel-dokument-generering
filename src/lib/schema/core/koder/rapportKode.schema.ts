import { z } from "zod"

export const supportedReportTypes = ["BYG0011"] as const

export const rapportKodeSchema = z.enum(supportedReportTypes).meta({
  example: "BYG0011",
  description: "Rapportkode for rapporten som skal genereres.",
})

export type RapportKode = z.infer<typeof rapportKodeSchema>
