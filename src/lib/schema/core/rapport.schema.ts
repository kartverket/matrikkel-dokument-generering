import { localeSchema } from "./locale.schema"
import { rapportMetadataSchema } from "./meta.schema"

export const rapportSchema = rapportMetadataSchema
  .extend({ locale: localeSchema })
  .openapi("Rapportgrunnlag", {
    title: "Rapport",
    description: "Felles schema for alle type rapporter.",
  })
