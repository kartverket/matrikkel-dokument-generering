import { z } from "@hono/zod-openapi"

const jaNei = ["Ja", "Nei"] as const

export const jaNeiEnum = z.enum(jaNei).meta({
  id: "JaNeiEnum",
  description: `Angir Ja/Nei-verdi.

Koder:

\`\`\`
Ja
Nei
\`\`\``,
  example: "Ja",
})

export type JaNeiEnumType = z.infer<typeof jaNeiEnum>
