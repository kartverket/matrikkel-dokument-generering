import { z } from "@hono/zod-openapi"
import { kontaktPersonKodeSchema } from "../koder/kontaktPersonKode.schema"
import { personInfoSupportBaseSchema } from "./personInfoSupport.schema.ts"

export const kontaktpersonSchema = personInfoSupportBaseSchema.extend({
    datofra: z.iso.datetime({ offset: true }).optional(),
    nyEndretSlettet: z.string().optional().meta({
      description: "N=Ny, E=Endret, S=Slettet.",
      example: "N",
    }),

    // Getter-baserte felter pa KontaktpersonRapportInfo
    kontaktpersonKode: kontaktPersonKodeSchema.optional().meta({
        description: "Rolle som kodeverdi"
    }),
    rolle: z.string().optional().meta({
        description: "Rolle som tekst"
    }),
    harDatofra: z.boolean().optional(), // Mulig vi ikke trenger denne, da den utledes fra om "datofra" er null
    datofraSOSI: z.string().optional().meta({
        description: "Kontaktpersonens fra-dato som tekst (sosi)"
    }),

  })
  .meta({
    title: "KontaktpersonRapportInfo",
    description:
      "Kontaktperson med personinformasjon, inkludert felter fra klasse og getter-basert presentasjon.",
  })
  .optional()

export type Kontaktperson = NonNullable<z.infer<typeof kontaktpersonSchema>>
export type TiltaksHaver = Kontaktperson    // Legacy kopabilitet
