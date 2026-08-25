import { z } from "@hono/zod-openapi"
import { personStatusKodeSchema } from "../koder/personStatusKode.schema.ts"
import { mottakerAdresseSchema } from "./mottakerAdresse.schema.ts"

export const personInfoSupportBaseSchema = z
  .object({
    // Direkte felter pa PersonInfoSupport
    eierident: z.string().optional().meta({
      description: "Eiers ident (person- eller org.nr) som tekst",
    }),
    navn: z.string().optional(),
    kategoriKode: z.string().optional(),
    fortrolig: z.boolean().optional(),
    personStatusKode: personStatusKodeSchema.optional(),
    personStatus: z.string().optional(),
    eierUtgatt: z.boolean().optional(),
    bruksenhetsnummer: z.string().optional().meta({
      description: "Bruksenhetsnummer på hjemmelshavers adresse",
    }),
    postadresse: mottakerAdresseSchema.optional(),
    postnummerOmradenummer: z.number().int().nonnegative().optional(),
    postnummerOmradenavn: z.string().optional(),
    land: z.string().optional().meta({
      description: "Adressens land, hvis land er gitt og ulikt Norge",
    }),
    eierAdresse: z.string().optional(),
    eierAdresselinje1: z.string().optional(),
    eierAdresselinje2: z.string().optional(),
    eierAdresselinje3: z.string().optional(),
    eierAdresselinje4: z.string().optional(),

    // Getter-baserte felter pa PersonInfoSupport
    eierErUtgatt: z.boolean().optional(),
    adresselinje1: z.string().optional(),
    adresselinje2: z.string().optional(),
    adresselinje3: z.string().optional(),
    adresselinjer: z.array(z.string()).optional(),
  })
  .meta({
    title: "PersonInfoSupport",
    description:
      "Felles personfelter brukt av rapportobjekter som arver PersonInfoSupport.",
  })
