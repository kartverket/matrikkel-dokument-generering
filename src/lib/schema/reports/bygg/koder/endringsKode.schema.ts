import { z } from "@hono/zod-openapi"

// ref: BygningsendringsKodeId.java
export const endringsKodeSchema = z
  .union([
    z.literal(1), // Tilbygg
    z.literal(2), // Påbygg
    z.literal(3), // Underbygg
    z.literal(4), // Ombygging
    z.literal(5), // Ukjent
  ])
  .meta({
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
