import { z } from "@hono/zod-openapi"
import { eierforholdKodeSchema } from "../koder/eierforholdKode.schema"
import { enumRapportInfoSchema } from "./enumRapportInfo.schema.ts"
import { matrikkelnrRapportInfoSchema } from "./matrikkelnrRapportInfo.schema.ts"
import { personInfoSupportBaseSchema } from "./personInfoSupport.schema.ts"

const personEierforholdRapportInfoSchema = personInfoSupportBaseSchema.extend({
  // Felter pa PersonEierforholdRapportInfo
  eierforholdKode: eierforholdKodeSchema.optional(),
  andelsNummer: z.number().int().nonnegative().optional(),
  datoTil: z.iso.datetime({ offset: true }).nullable().optional(),
  datoFra: z.iso.datetime({ offset: true }).nullable().optional(),

  // Getter-felter pa PersonEierforholdRapportInfo
  harAndel: z.boolean().optional(),
  teller: z.number().int().nonnegative().optional(),
  nevner: z.number().int().nonnegative().optional(),
  eierforholdKodeEnum: enumRapportInfoSchema.optional(),
})

// Tar ikke med nøstet MatrikkelenhetEierforholdRapportInfo
const matrikkelenhetEierforholdRapportInfoSchema = z.object({
    // Felter pa MatrikkelenhetEierforholdRapportInfo
    selveierskap: z.boolean().optional(),
    personEierforhold: z.array(personEierforholdRapportInfoSchema).optional(),
    matrikkelnrRapportInfo: matrikkelnrRapportInfoSchema.optional(),
    eierforholdKode: eierforholdKodeSchema.optional(),
    datoFra: z.iso.datetime({ offset: true }).nullable().optional(),
    arealtype: z.string().optional(),

    // Getter-felter
    matrikkelenhet: z.string().optional().meta({
      description: "Matrikkelnummer med kommunenummer"
    }),
    harAndel: z.boolean().optional(),
    teller: z.number().int().nonnegative().optional(),
    nevner: z.number().int().nonnegative().optional(),
    harPersonEierforhold: z.boolean().optional(),
    eierforholdKodeEnum: enumRapportInfoSchema.optional(),
  })


export const eierforholdSchema = z
  .object({
    // Felter pa EierforholdRapportInfo
    matrikkelenhetEiereInfos: z
      .array(matrikkelenhetEierforholdRapportInfoSchema)
      .optional(),
    personEiereInfos: z.array(personEierforholdRapportInfoSchema).optional(),

    // Getter-felter pa EierforholdRapportInfo
    harEiere: z.boolean().optional(), // Denne er false om begge listene er tomme
  })
  .meta({
    title: "EierforholdRapportInfo",
    description:
      "Eierforhold med matrikkelenhetseiere og personeiere, inkludert felter fra klasse og getter-basert presentasjon.",
  })


export type Hjemmelshaver = z.infer<typeof eierforholdSchema>
export type AktuellEier = Hjemmelshaver // Legacy kompabilitet