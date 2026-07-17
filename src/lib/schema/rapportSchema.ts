import { z } from "@hono/zod-openapi"

const rapportTypes = ["BYG0011"] as const

const kommuneSchema = z
  .object({
    nr: z
      .string()
      .regex(/^\d{4}$/)
      .meta({ example: "0301", description: "Fire-sifret kommunenummer." }),
    navn: z.string().min(1).meta({ example: "Oslo" }),
  })
  .meta({ id: "Kommune" })

const localeSchema = z.enum(["nb", "nn"]).meta({
  id: "Locale",
  description: `
  Språk / målform for dokumentet. Støttede språk:  <br/>
  - Bokmål (\`nb\`)
  - Nynorsk (\`nn\`).
  `,
})

export const rapportTypeSchema = z.enum(rapportTypes).meta({
  id: "RapportType",
  example: "BYG0011",
  description:
    "Rapportkode. Koden bestemmer blant annet rapporttittel og oppsett.",
})

export const rapportSchema = z
  .object({
    rapportType: rapportTypeSchema,
    kommune: kommuneSchema,
    koordinatsystem: z.string().min(1).meta({
      example: "EUREF89 UTM sone 32",
      description: "Koordinatsystemet som gjelder for alle koordinater.",
    }),
    locale: localeSchema,
    generertTidspunkt: z.date().meta({
      description: "Tidspunkt for når rapporten ble generert.",
    }),
  })
  .openapi("Rapportgrunnlag", {
    description: "Felles datagrunnlag for alle rapporttyper.",
  })

export const rapportMetadataSchema = rapportSchema.pick({
  rapportType: true,
  kommune: true,
  koordinatsystem: true,
  generertTidspunkt: true,
})

export type RapportMeta = z.infer<typeof rapportMetadataSchema>
export type RapportLocale = z.infer<typeof localeSchema>
export type RapportType = z.infer<typeof rapportTypeSchema>
