import { z } from "@hono/zod-openapi"

const endringsKoder = [
  "1", // Tilbygg
  "2", // Påbygg
  "3", // Underbygg
  "4", // Ombygging
  "5", // Ukjent
] as const

// ref: BygningsendringsKodeId.java
export const endringsKodeSchema = z.enum(endringsKoder).meta({
  id: "EndringsKode",
  description: `Beskriver endring i bygning.

Koder:

\`\`\`
1: Tilbygg
2: Påbygg
3: Underbygg
4: Ombygging
5: Ukjent
\`\`\``,
})

export type EndringsKode = z.infer<typeof endringsKodeSchema>
