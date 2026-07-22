import { z } from "@hono/zod-openapi"

const kjokkenTilgangKoder = [
  " ", // Ikke oppgitt
  "1", // Har eget kjøkken
  "2", // Har ikke adgang til kjøkken
  "3", // Har adgang til felles kjøkken
  "4", // Ukjent
] as const

// ref: KjokkentilgangKodeId.java
export const kjokkenTilgangKodeSchema = z.enum(kjokkenTilgangKoder).meta({
  id: "KjokkenTilgangKode",
  description: `Beskriver bruksenhetens tilgang til kjøkken.

Koder:

\`\`\`
<blank>: Ikke oppgitt
1: Har eget kjøkken
2: Har ikke adgang til kjøkken
3: Har adgang til felles kjøkken
4: Ukjent
\`\`\``,
})

export type KjokkenTilgangKode = z.infer<typeof kjokkenTilgangKodeSchema>
