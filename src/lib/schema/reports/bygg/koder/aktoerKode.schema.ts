import { z } from "@hono/zod-openapi"

const aktoerKoder = [
  "0", // Ikke oppgitt
  "1", // Aksjeselskap
  "2", // Boligbyggelag Borettslag
  "3", // Ansvarlig Selskap
  "4", // Enkeltperson
  "5", // Fylkeskommunen
  "6", // Annen Eiendom
  "7", // Kommunen
  "8", // Legat Stiftelse O.L
  "9", // Bruksretthaver
  "10", // Staten
  "11", // Utenlandsk
  "12", // Annen Eiertype
] as const

// ref: PersonKategoriKodeId.java
export const aktoerKodeSchema = z.enum(aktoerKoder).meta({
  id: "AktoerKode",
  description:
    "Rollen til aktøren. Koder: \n" +
    "0: Ikke oppgitt \n" +
    "1: Aksjeselskap \n" +
    "2: Boligbyggelag Borettslag \n" +
    "3: Ansvarlig Selskap \n" +
    "4: Enkeltperson \n" +
    "5: Fylkeskommunen \n" +
    "6: Annen Eiendom \n" +
    "7: Kommunen \n" +
    "8: Legat Stiftelse O.L \n" +
    "9: Bruksretthaver \n" +
    "10: Staten \n" +
    "11: Utenlandsk \n" +
    "12: Annen Eiertype \n",
})

export type AktoerKode = z.infer<typeof aktoerKodeSchema>
