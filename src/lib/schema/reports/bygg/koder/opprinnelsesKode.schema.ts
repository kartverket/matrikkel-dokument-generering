import { z } from "@hono/zod-openapi"

// Placeholder until OpprinnelsesKodeId values are mapped.
export const opprinnelsesKodeSchema = z.string().min(1).meta({
  id: "OpprinnelsesKode",
  description:
    "Forelopig schema for opprinnelseskode. Oppdateres med eksplisitt kodeliste nar kodeverdiene er avklart.",
  example: "1",
})

export type OpprinnelsesKode = z.infer<typeof opprinnelsesKodeSchema>
