import { z } from "@hono/zod-openapi"
import { rapportKodeSchema } from "../registry.ts"
import { koordinatSystemKodeSchema } from "../reports/shared/koordinatSystem.schema.ts"

export const rapportMetadataSchema = z.object({
  rapportKode: rapportKodeSchema,
  kommune: z.object({
    kommuneNr: z
      .string()
      .meta({ example: "0301", description: "Fire-sifret kommunenummer." }),
    kommuneNavn: z.string().min(1).meta({ example: "Oslo" }),
  }),
  koordinatSystemKode: koordinatSystemKodeSchema,
  generertTidspunkt: z.iso.datetime({ offset: true }).meta({
    description: "Tidspunkt for når rapporten ble generert.",
    example: "2026-07-17T00:00:00Z",
  }),
})

export type RapportMeta = z.infer<typeof rapportMetadataSchema>
