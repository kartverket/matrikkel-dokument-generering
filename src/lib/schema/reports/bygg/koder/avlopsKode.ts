import { z } from "@hono/zod-openapi"

const avlopsKoder = [
  " ", // Ikke oppgitt
  "1", // OffentligKloakk
  "2", // PrivatKloakk
  "3", // IngenKloakk
] as const

// ref: AvlopsKodeId.java
export const avlopsKodeSchema = z.enum(avlopsKoder).meta({
  id: "AvlopsKode",
  description: `
Koder:

\`\`\`
<blank>: Ikke oppgitt
1: OffentligKloakk
2: PrivatKloakk
3: IngenKloakk
\`\`\`
  `,
})

export type AvlopsKode = z.infer<typeof avlopsKodeSchema>
