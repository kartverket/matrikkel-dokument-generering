import { z } from "@hono/zod-openapi"
import { matrikkelnrRapportInfoSchema } from "./matrikkelnrRapportInfo.schema.ts"

export const adresseIdentRapportInfoSchema = z
  .object({
    matrikkelnrRapportInfo: matrikkelnrRapportInfoSchema.optional(),
    adresseNavn: z.string().optional(),
    bokstav: z.string().optional(),
    nummer: z.number().int().nonnegative().optional(),
    undernummer: z.string().optional(),

    erVegadresse: z.boolean().optional(),
    adressekodeGardsnr: z.number().int().nonnegative().optional().meta({
      description:
        "Adressekode for vegadesser og gårdsnr for matrikkeladresser",
    }),
    nrBruksnr: z.number().int().nonnegative().optional().meta({
      description: "Nummer for vegadesser eller bruksnr for matrikkeladresser",
    }),
    bokstavFestenr: z.string().optional().meta({
      description: "Bokstav for vegadesser og festenr for matrikkeladresser",
    }),
    undernr: z.string().optional().meta({
      description: "Null for vegadesser og undernr for matrikkeladresser",
    }),
    adresseAsString: z.string().optional(),
    adresseAsStringUtenAdressekode: z.string().optional(),
  })
  .meta({
    title: "AdresseIdentRapportInfo",
    description:
      "Adresseidentifikasjon for vegadresse eller matrikkeladresse, inkludert felt fra klasse og getter-avledet visning.",
  })
  .optional()

export type AdresseIdentRapportInfo = NonNullable<
  z.infer<typeof adresseIdentRapportInfoSchema>
>
