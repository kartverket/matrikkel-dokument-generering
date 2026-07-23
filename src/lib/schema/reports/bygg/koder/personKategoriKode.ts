import { z } from "@hono/zod-openapi"

const personKategoriKoder = [
  " ", // Ikke oppgitt
  "A", // Aksjeselskap
  "B", // Boligbyggelag Borettslag
  "D", // Ansvarlig Selskap
  "E", // Enkeltperson
  "F", // Fylkeskommunen
  "G", // Annen Eiendom
  "K", // Kommunen
  "L", // Legat Stiftelse O.L
  "R", // Bruksretthaver
  "S", // Staten
  "W", // Utenlandsk
  "X", // Annen Eiertype
  "I", // Ikke tilgjengelig
] as const

// ref: PersonKategoriKodeId.java
export const personKategoriKodeSchema = z.enum(personKategoriKoder).meta({
  id: "PersonKategoriKode",
  description: `
Kategorien til personen. Koder:

\`\`\`
<blank>: Ikke oppgitt
A: Aksjeselskap
B: Boligbyggelag Borettslag
D: Ansvarlig Selskap
E: Enkeltperson
F: Fylkeskommunen
G: Annen Eiendom
K: Kommunen
L: Legat Stiftelse O.L
R: Bruksretthaver
S: Staten
W: Utenlandsk
X: Annen Eiertype
I: Ikke tilgjengelig
\`\`\`
  `,
})

export type PersonKategoriKode = z.infer<typeof personKategoriKodeSchema>
