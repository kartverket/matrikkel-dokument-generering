import { z } from "@hono/zod-openapi"
import { rapportTypeSchema } from "../registry"
import { kommuneSchema } from "./kommune.schema"

export const rapportMetadataSchema = z.object({
  rapportType: rapportTypeSchema,
  kommune: kommuneSchema,
  koordinatsystem: z.string().min(1).meta({
    example: "EUREF89 UTM sone 32",
    description: "Koordinatsystemet som gjelder for alle koordinater.",
  }),
  generertTidspunkt: z.iso.datetime({ offset: true }).meta({
    description: "Tidspunkt for når rapporten ble generert.",
  }),
})

export type RapportMeta = z.infer<typeof rapportMetadataSchema>
