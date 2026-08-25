import { z } from "@hono/zod-openapi"

const personStatusKoder = [
  " ",
  "B",
  "K",
  "U",
  "F",
  "D",
  "6",
  "R",
  "A",
  "9",
  "10",
  "M",
  "I",
  "IB",
] as const

// ref: PersonStatusKodeId.java
export const personStatusKodeSchema = z.enum(personStatusKoder).meta({
  id: "PersonStatusKode",
  description: `
Tilstander en person kan ha i Det Sentrale Folkeregister (DSF). Koder:

\`\`\`
<blank>: Ikke oppgitt
B: Bosatt
K: AktivPersonMedDnr
U: Utflyttet
F: Forsvunnet
D: Dod
6: Opphoert
R: Fodselsregistrert
A: Annulert
9: Uregistrert
10: Aktiv
M: Midlertidig
I: Inaktiv
IB: IkkeBosatt
\`\`\`
  `,
})

export type PersonStatusKode = z.infer<typeof personStatusKodeSchema>
