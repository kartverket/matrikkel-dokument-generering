import { z } from "@hono/zod-openapi"
import { kommuneSchema } from "./kommune.schema"

export const rapportMetadataSchema = z.object({
  kommune: kommuneSchema,
  koordinatsystem: z.string().min(1).meta({
    example: "EUREF89 UTM sone 32",
    description: "Koordinatsystemet som gjelder for alle koordinater.",
  }),
  generertTidspunkt: z.iso.datetime({ offset: true }).meta({
    description: "Tidspunkt for når rapporten ble generert.",
    example: "2026-07-17T00:00:00Z",
  }),
})

export type RapportMetadata = z.infer<typeof rapportMetadataSchema>
