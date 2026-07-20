import type { z } from "@hono/zod-openapi"
import { localeSchema } from "./locale.schema"
import { rapportMetadataSchema } from "./meta.schema"

export const rapportSchema = rapportMetadataSchema
  .extend({ locale: localeSchema })
  .openapi("Rapportgrunnlag", {
    description: "Felles datagrunnlag for alle rapporttyper.",
  })

export type RapportLocale = z.infer<typeof localeSchema>
export type { RapportMeta } from "./meta.schema"
