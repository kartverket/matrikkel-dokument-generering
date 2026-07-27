import { z } from "@hono/zod-openapi"

const avlopsKoder = [
  " ", // Ikke oppgitt
  "1", // Offentlig kloakk
  "2", // Privat kloakk
  "3", // Ingen kloakk
] as const

// ref: AvlopsKodeId.java
export const avlopsKodeSchema = z.enum(avlopsKoder).meta({
  id: "AvlopsKode",
  description: `Beskriver hvilken type avløp bygningen er tilknyttet.

Koder:

\`\`\`
<blank>: Ikke oppgitt
1: Offentlig kloakk
2: Privat kloakk
3: Ingen kloakk
\`\`\``,
})

export type AvlopsKode = z.infer<typeof avlopsKodeSchema>
