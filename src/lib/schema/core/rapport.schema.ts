import { localeSchema } from "./locale.schema"
import { rapportMetadataSchema } from "./meta.schema"

export const rapportSchema = rapportMetadataSchema
  .extend({ locale: localeSchema })
  .openapi("Rapportgrunnlag", {
    description: "Felles datagrunnlag for alle rapporttyper.",
  })
