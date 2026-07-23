import { z } from "@hono/zod-openapi"

const etasjeplanKoder = [
  " ", // Ikke oppgitt
  "H", // Hovedetasje
  "K", // Kjelleretasje
  "L", // Loft
  "U", // Underetasje
] as const

// ref: EtasjeplanKodeId.java
export const etasjeplanKodeSchema = z.enum(etasjeplanKoder).meta({
  id: "EtasjeplanKode",
  description: `Viser om etasjeplanet er en hovedetasje, kjelleretasje, et loft eller en underetasje.

Koder:

\`\`\`
<blank>: Ikke oppgitt
H: Hovedetasje
K: Kjelleretasje
L: Loft
U: Underetasje
\`\`\``,
})

export type EtasjeplanKode = z.infer<typeof etasjeplanKodeSchema>
