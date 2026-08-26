import { z } from "@hono/zod-openapi"
import { eierforholdKodeSchema } from "../koder/eierforholdKode.schema"
import { enumRapportInfoSchema } from "./enumRapportInfo.schema.ts"
import { matrikkelnrRapportInfoSchema } from "./matrikkelnrRapportInfo.schema.ts"
import { personInfoSupportBaseSchema } from "./personInfoSupport.schema.ts"

const personEierforholdRapportInfoSchema = personInfoSupportBaseSchema.extend({
  eierforholdKode: eierforholdKodeSchema.optional(),
  andelsNummer: z.number().int().nonnegative().optional(),
  datoTil: z.iso.datetime({ offset: true }).nullable().optional(),
  datoFra: z.iso.datetime({ offset: true }).nullable().optional(),

  harAndel: z.boolean().optional(),
  teller: z.number().int().nonnegative().optional(),
  nevner: z.number().int().nonnegative().optional(),
  eierforholdKodeEnum: enumRapportInfoSchema.optional(),
})

export type PersonEierforholdRapportInfo = NonNullable<
  z.infer<typeof personEierforholdRapportInfoSchema>
>

// Tar ikke med nøstet MatrikkelenhetEierforholdRapportInfo
const matrikkelenhetEierforholdRapportInfoSchema = z.object({
  selveierskap: z.boolean().optional(),
  personEierforhold: z.array(personEierforholdRapportInfoSchema).optional(),
  matrikkelnrRapportInfo: matrikkelnrRapportInfoSchema.optional(),
  eierforholdKode: eierforholdKodeSchema.optional(),
  datoFra: z.iso.datetime({ offset: true }).optional(),
  arealtype: z.string().optional(),

  matrikkelenhet: z.string().optional().meta({
    description: "Matrikkelnummer med kommunenummer",
  }),
  harAndel: z.boolean().optional(),
  teller: z.number().int().nonnegative().optional(),
  nevner: z.number().int().nonnegative().optional(),
  eierforholdKodeEnum: enumRapportInfoSchema.optional(),
})

export type MatrikkelenhetEierforholdRapportInfo = NonNullable<
  z.infer<typeof matrikkelenhetEierforholdRapportInfoSchema>
>

export const eierforholdSchema = z
  .object({
    matrikkelenhetEiereInfos: z
      .array(matrikkelenhetEierforholdRapportInfoSchema)
      .optional(),
    personEiereInfos: z.array(personEierforholdRapportInfoSchema).optional(),
  })
  .meta({
    title: "EierforholdRapportInfo",
    description:
      "Eierforhold med matrikkelenhetseiere og personeiere, inkludert felter fra klasse og getter-basert presentasjon.",
  })

export type Hjemmelshaver = z.infer<typeof eierforholdSchema>
