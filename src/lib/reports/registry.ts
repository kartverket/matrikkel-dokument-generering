import type { z } from "@hono/zod-openapi"
import type { ComponentType } from "react"
import type { RenderedDocument } from "../../Document.tsx"
import { renderDocument } from "../../Document.tsx"
import { Byg0001Document } from "../../documents/Byg0001Document.tsx"
import { Byg0011Document } from "../../documents/Byg0011Document.tsx"
import type { Rapport } from "../schema/core/rapport.schema.ts"
import { bygningMassivRapportSchema } from "../schema/reports/bygg/byg0001/bygningMassivRapport.schema.ts"
import { byggRapportSchema } from "../schema/reports/bygg/byg0011/byggRapport.schema.ts"

type ReportEntry<S extends z.ZodType> = {
  schema: S
  summary: string
  Component: ComponentType<{ rapport: z.infer<S> }>
  render: (data: z.infer<S>, css: string) => RenderedDocument
}

function defineReport<S extends z.ZodType>({
  schema,
  summary,
  Component,
}: {
  schema: S
  summary: string
  Component: ComponentType<{ rapport: z.infer<S> }>
}): ReportEntry<S> {
  return {
    schema,
    summary,
    Component,
    render: (data, css) =>
      renderDocument(
        Component as ComponentType<{ rapport: Rapport }>,
        data as Rapport,
        css,
      ),
  }
}

export const reportRegistry = {
  BYG0011: defineReport({
    schema: byggRapportSchema,
    summary: "Generer PDF-rapport for BYG0011",
    Component: Byg0011Document,
  }),
  BYG0001: defineReport({
    schema: bygningMassivRapportSchema,
    summary: "Generer PDF-rapport for BYG0001",
    Component: Byg0001Document,
  }),
} as const
