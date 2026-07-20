import { localeSchema } from "./locale.schema"
import { rapportMetadataSchema } from "./meta.schema"

export const rapportSchema = rapportMetadataSchema
  .extend({ locale: localeSchema })
  .openapi("Rapportgrunnlag", {
    title: "Rapport",
    description: "Felles datagrunnlag for alle rapporttyper.",
  })
