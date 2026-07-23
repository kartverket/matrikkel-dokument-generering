import { z } from "@hono/zod-openapi"

const bruksenhetsKoder = [
  "B", // Bolig
  "I", // Ikke-Godkjent Bolig
  "F", // Fritidsbolig
  "A", // Annet enn Bolig
  "U", // Unummerert Bruksenhet
  "X", // Ukjent
] as const

// ref: BruksenhetstypeKodeId.java
export const bruksenhetsKodeSchema = z.enum(bruksenhetsKoder).meta({
  id: "BruksenhetsTypeKode",
  description: `
  Hvilken type bruksenhet. 
  
  Koder:
  
  \`\`\`
    B: Bolig
    I: Ikke-Godkjent Bolig
    F: Fritidsbolig
    A: Annet enn Bolig
    U: Unummerert Bruksenhet
    X: Ukjent
  \`\`\`
    `,
})

export type BruksenhetsKode = z.infer<typeof bruksenhetsKodeSchema>
