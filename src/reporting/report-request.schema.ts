import { z } from "@hono/zod-openapi"
import { reportDefinitions } from "./registry.ts"

export type RapportType = (typeof reportDefinitions)[number]["code"]

type RegisteredReportSchema = (typeof reportDefinitions)[number]["schema"]

const reportTypes = reportDefinitions.map(({ code }) => code) as [
  RapportType,
  ...RapportType[],
]

const reportSchemas = reportDefinitions.map(({ schema }) => schema) as [
  RegisteredReportSchema,
  ...RegisteredReportSchema[],
]

export const rapportTypeSchema = z.enum(reportTypes).meta({
  id: "RapportType",
  example: "BYG0011",
  description: "Rapportkode for rapporten som skal genereres.",
})

export const reportRequestSchema = z
  .discriminatedUnion("rapportType", reportSchemas)
  .openapi("RapportRequest", {
    description:
      "Datagrunnlag for en støttet Matrikkelen-rapport. Payloaden velges ut fra rapportType.",
  })

export type ReportRequestInput = z.input<typeof reportRequestSchema>
export type ReportRequest = z.output<typeof reportRequestSchema>
