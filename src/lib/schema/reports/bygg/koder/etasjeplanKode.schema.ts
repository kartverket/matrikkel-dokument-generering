import { z } from "@hono/zod-openapi"

const etasjeplanKoder = [
  "0", // Ikke oppgitt
  "1", // Hovedetasje
  "2", // Kjelleretasje
  "3", // Loft
  "4", // Underetasje
] as const

// ref: EtasjeplanKodeId.java
export const etasjeplanKodeSchema = z.enum(etasjeplanKoder).meta({
  id: "EtasjeplanKode",
  description: `Viser om etasjeplanet er en hovedetasje, kjelleretasje, et loft eller en underetasje.

Koder:

\`\`\`
0: Ikke oppgitt
1: Hovedetasje
2: Kjelleretasje
3: Loft
4: Underetasje
\`\`\``,
})

export type EtasjeplanKode = z.infer<typeof etasjeplanKodeSchema>
