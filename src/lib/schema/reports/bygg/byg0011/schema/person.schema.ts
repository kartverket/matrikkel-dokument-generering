import { z } from "@hono/zod-openapi"

const valgfriTekstSchema = z.string().min(1).nullable().optional()
const valgfriDatoSchema = z.iso.datetime({ offset: true }).nullable().optional()

const personBasisShape = {
  eierIdent: z.string().min(1),
  navn: z.string().min(1),
  adresselinje1: valgfriTekstSchema,
  adresselinje2: valgfriTekstSchema,
  adresselinje3: valgfriTekstSchema,
  land: valgfriTekstSchema,
  statuskode: valgfriTekstSchema,
  eierErUtgatt: z.boolean().optional().default(false),
}

export const tiltakshaverSchema = z
  .object({
    ...personBasisShape,
    rolle: z.string().min(1),
    postnummeromradenr: valgfriTekstSchema,
    postnummeromradenavn: valgfriTekstSchema,
    bruksenhetsnr: valgfriTekstSchema,
    datofra: valgfriDatoSchema,
    kategorikode: valgfriTekstSchema,
    kontaktpersonKode: valgfriTekstSchema,
  })
  .meta({ id: "BYG0011Tiltakshaver" })

export const kontaktpersonSchema = z
  .object({
    ...personBasisShape,
    rolle: z.string().min(1),
    postnummeromradenr: valgfriTekstSchema,
    postnummeromradenavn: valgfriTekstSchema,
    datofra: valgfriDatoSchema,
    kategorikode: valgfriTekstSchema,
    kontaktpersonKode: valgfriTekstSchema,
  })
  .meta({ id: "BYG0011Kontaktperson" })

export const hjemmelshaverSchema = z
  .object({
    ...personBasisShape,
    andelTeller: z.number().int().nonnegative().nullable(),
    andelNevner: z.number().int().nonnegative().nullable(),
    postnummer: valgfriTekstSchema,
    poststed: valgfriTekstSchema,
    datofra: valgfriDatoSchema,
    datotil: valgfriDatoSchema,
    kategorikode: valgfriTekstSchema,
    harAndel: z.boolean().nullable(),
  })
  .meta({ id: "BYG0011Hjemmelshaver" })

export type Tiltakshaver = z.infer<typeof tiltakshaverSchema>
export type Kontaktperson = z.infer<typeof kontaktpersonSchema>
export type Hjemmelshaver = z.infer<typeof hjemmelshaverSchema>
