import { z } from "@hono/zod-openapi"

const nyEndretSlettetEnums = [
  "N", // Ny
  "E", // Endret
  "S", // Slettet
] as const

export const nyEndretSlettetEnum = z.enum(nyEndretSlettetEnums).meta({
  id: "NyEndretSlettetKode",
  description: `Angir om informasjon er ny, endret eller slettet.

Koder:

\`\`\`
N: Ny
E: Endret
S: Slettet
\`\`\``,
  example: "N",
})

export type NyEndretSlettetEnum = z.infer<typeof nyEndretSlettetEnum>
