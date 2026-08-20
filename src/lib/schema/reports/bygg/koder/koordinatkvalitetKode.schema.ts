import { z } from "@hono/zod-openapi"

// Placeholder until KoordinatkvalitetKodeId values are mapped.
export const koordinatkvalitetKodeSchema = z.string().min(1).meta({
  id: "KoordinatkvalitetKode",
  description:
    "Forelopig schema for koordinatkvalitetkode. Oppdateres med eksplisitt kodeliste nar kodeverdiene er avklart.",
  example: "2",
})

export type KoordinatkvalitetKode = z.infer<typeof koordinatkvalitetKodeSchema>
