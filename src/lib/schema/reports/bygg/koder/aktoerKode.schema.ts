import { z } from "@hono/zod-openapi"

// ref: PersonKategoriKodeId.java
export const aktoerKodeSchema = z
  .union([
    z.literal(0), // Ikke oppgitt
    z.literal(1), // Aksjeselskap
    z.literal(2), // Boligbyggelag Borettslag
    z.literal(3), // Ansvarlig Selskap
    z.literal(4), // Enkeltperson
    z.literal(5), // Fylkeskommunen
    z.literal(6), // Annen Eiendom
    z.literal(7), // Kommunen
    z.literal(8), // Legat Stiftelse O.L
    z.literal(9), // Bruksretthaver
    z.literal(10), // Staten
    z.literal(11), // Utenlandsk
    z.literal(12), // Annen Eiertype
  ])
  .meta({
    id: "AktørKode",
    description:
      "Rollen til aktøren. Koder: \n" +
      "0: Ikke opgitt \n" +
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
