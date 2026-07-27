import { z } from "@hono/zod-openapi"

const vannforsyningsKoder = [
  " ", // Ikke oppgitt
  "1", // Tilknyttet offentlig vannverk
  "2", // Tilknyttet privat vannverk
  "3", // Annen privat med innlagt vann
  "4", // Annen privat uten innlagt vann
] as const

// ref: VannforsyningsKodeId.java
export const vannforsyningsKodeSchema = z.enum(vannforsyningsKoder).meta({
  id: "VannforsyningsKode",
  description: `Beskriver hvilken type vannforsyning bygningen er tilknyttet.

Koder:

\`\`\`
<blank>: Ikke oppgitt
1: Tilknyttet offentlig vannverk
2: Tilknyttet privat vannverk
3: Annen privat med innlagt vann
4: Annen privat uten innlagt vann
\`\`\``,
})

export type VannforsyningsKode = z.infer<typeof vannforsyningsKodeSchema>
