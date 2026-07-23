import { z } from "@hono/zod-openapi"

const kontaktPersonKoder = [
  "T", // Tiltakshaver
  "K", // Kontaktperson
] as const

// ref: KontaktpersonKodeId.java
export const kontaktPersonKodeSchema = z.enum(kontaktPersonKoder).meta({
  id: "KontaktPersonKode",
  description: `Rollen til tiltakshaver.

Koder:

\`\`\`
T: Tiltakshaver
K: Kontaktperson
\`\`\``,
})

export type KontaktPersonKode = z.infer<typeof kontaktPersonKodeSchema>
