import { z } from "@hono/zod-openapi"

const endringsKoder = [
  "T", // Tilbygg
  "P", // Påbygg
  "U", // Underbygg
  "O", // Ombygging
  "X", // Ukjent
] as const

// ref: BygningsendringsKodeId.java
export const endringsKodeSchema = z.enum(endringsKoder).meta({
  id: "EndringsKode",
  description: `Beskriver endring i bygning.

Koder:

\`\`\`
T: Tilbygg
P: Påbygg
U: Underbygg
O: Ombygging
X: Ukjent
\`\`\``,
})

export type EndringsKode = z.infer<typeof endringsKodeSchema>
