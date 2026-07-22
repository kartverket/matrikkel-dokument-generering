import { z } from "@hono/zod-openapi"

const bruksenhetsKoder = [
  "0", // Bolig
  "1", // Ikke-Godkjent Bolig
  "2", // Fritidsbolig
  "3", // Annet enn Bolig
  "4", // Unummerert Bruksenhet
  "5", // Ukjent
] as const

// ref: BruksenhetstypeKodeId.java
export const bruksenhetsKodeSchema = z.enum(bruksenhetsKoder).meta({
  id: "BruksenhetsTypeKode",
  description: `
  Hvilken type bruksenhet. 
  
  Koder:
  
  \`\`\`
    "0: Bolig
    "1: Ikke-Godkjent Bolig
    "2: Fritidsbolig
    "3: Annet enn Bolig
    "4: Unummerert Bruksenhet
    "5: Ukjent
  \`\`\`
    `,
})

export type BruksenhetsKode = z.infer<typeof bruksenhetsKodeSchema>
