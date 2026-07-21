import { z } from "@hono/zod-openapi"

const kontaktPersonKoder = [
  "1", // Tiltakshaver
  "2", // Kontaktperson
] as const

// ref: KontaktpersonKodeId.java
export const kontaktPersonKodeSchema = z.enum(kontaktPersonKoder).meta({
  id: "KontaktPersonKode",
  description: `Rollen til tiltakshaver.

Koder:

\`\`\`
1: Tiltakshaver
2: Kontaktperson
\`\`\``,
})

export type KontaktPersonKode = z.infer<typeof kontaktPersonKodeSchema>
