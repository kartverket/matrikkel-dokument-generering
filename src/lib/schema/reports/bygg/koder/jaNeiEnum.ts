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

export type JaNeiEnum = z.infer<typeof jaNeiEnum>
