import { z } from "@hono/zod-openapi"
import { rapportKodeSchema } from "./koder/rapportKode.schema.ts"
import { localeSchema } from "./locale.schema"
import { rapportMetadataSchema } from "./meta.schema"

export const rapportSchema = z
  .object()
  .extend({ rapportKode: rapportKodeSchema })
  .extend({ locale: localeSchema })
  .extend({ metadata: rapportMetadataSchema })

  .openapi("Rapportgrunnlag", {
    title: "Rapport",
    description: "Felles schema for alle type rapporter.",
  })

export type Rapport = z.infer<typeof rapportSchema>
