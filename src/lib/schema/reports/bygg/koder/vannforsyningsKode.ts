import { z } from "@hono/zod-openapi"

const vannforsyningsKoder = [
  " ", // Ikke oppgitt
  "1", // TilknyttetOffVannverk
  "2", // TilknyttetPrivatVannverk
  "3", // AnnenPrivatInnlagt
  "4", // AnnenPrivatIkkeInnlagt
] as const

// ref: VannforsyningsKodeId.java
export const vannforsyningsKodeSchema = z.enum(vannforsyningsKoder).meta({
  id: "VannforsyningsKode",
  description: `
Koder:

\`\`\`
<blank>: Ikke oppgitt
1: TilknyttetOffVannverk
2: TilknyttetPrivatVannverk
3: AnnenPrivatInnlagt
4: AnnenPrivatIkkeInnlagt
\`\`\`
  `,
})

export type VannforsyningsKode = z.infer<typeof vannforsyningsKodeSchema>
