import type { z } from "@hono/zod-openapi"
import { localeSchema } from "./locale.schema"
import { rapportMetadataSchema } from "./meta.schema"

export const rapportContextSchema = rapportMetadataSchema
  .extend({ locale: localeSchema })
  .openapi("Rapportgrunnlag", {
    description: "Felles datagrunnlag for alle rapporttyper.",
  })

export type RapportContext = z.infer<typeof rapportContextSchema>
