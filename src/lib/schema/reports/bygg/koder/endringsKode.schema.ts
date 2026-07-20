import { z } from "@hono/zod-openapi"

// ref: BygningsendringsKodeId.java
export const endringsKodeSchema = z
  .union([
    z.literal(1), // Tilbygg
    z.literal(2), // Påbygg
    z.literal(3), // Underbygg
    z.literal(4), // Ombygging
    z.literal(5), // Ukjent
  ])
  .meta({
    id: "EndringsKode",
    description:
      "Beskriver endring i bygning. Koder: \n" +
      "1: Tilbygg \n" +
      "2: Påbygg \n" +
      "3: Underbygg \n" +
      "4: Ombygging \n" +
      "5: Ukjent \n",
  })
