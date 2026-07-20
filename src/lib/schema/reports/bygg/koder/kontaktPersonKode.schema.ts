import { z } from "@hono/zod-openapi"

// ref: KontaktpersonKodeId.java
export const kontaktPersonKodeSchema = z
  .union([
    z.literal(1), // Tiltakshaver
    z.literal(2), // Kontaktperson
  ])
  .meta({
    id: "KontaktPersonKode",
    description:
      "Rollen til tiltakshaver. Koder: \n" +
      "1: Tiltakshaver \n" +
      "2: Kontaktperson \n",
  })

export type KontaktPersonKode = z.infer<typeof kontaktPersonKodeSchema>
