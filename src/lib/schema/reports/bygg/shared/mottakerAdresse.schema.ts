import { z } from "@hono/zod-openapi"

// Schema for MottakerAdresse with direct fields and computed/getter fields.
export const mottakerAdresseSchema = z
  .object({
    // Direct class fields
    adresselinje1: z.string().optional(),
    adresselinje2: z.string().optional(),
    adresselinje3: z.string().optional(),

    // Mangler postnummeromrade og landKode her, ikke tatt med da disse var flere laf nøstet og usikker om trengs

    // Getter-based computed strings
    fullAdresse: z.string().optional(),
    adresse: z.string().optional(),
    adresseUtenPostnummeromrade: z.string().optional(),

    // Getter-based flags
    harFullstendigPostadresse: z.boolean().optional(),
    harInnhold: z.boolean().optional(),
    bareLandkodeId: z.boolean().optional(),
  })
  .meta({
    title: "MottakerAdresse",
    description:
      "Mottakeradresse med adresselinjer, postnummeromrade, landkode og beregnede adressefelt.",
  })
  .optional()
