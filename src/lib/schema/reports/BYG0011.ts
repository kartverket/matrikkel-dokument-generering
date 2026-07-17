import { z } from "@hono/zod-openapi"
import { bygningstypeSchema } from "../bygningstypeSchema"
import { byggUtvalgsKriterierSchema } from "../byggUtvalgsKriterier"
import { rapportSchema } from "../rapportSchema"

const tekstSchema = z.string().min(1)
const valgfriTekstSchema = tekstSchema.nullable().optional()
const heltallSchema = z.number().int().nonnegative()
const arealSchema = z.number().nonnegative()
const datoSchema = z.iso.date()
const valgfriDatoSchema = datoSchema.nullable()

const arealFordelingSchema = z
  .object({
    bolig: arealSchema,
    annet: arealSchema,
  })
  .meta({
    id: "ArealFordeling",
    description:
      "Areal i kvadratmeter. Totalt areal beregnes som summen av bolig og annet.",
  })

const koordinatSchema = z
  .object({
    nord: z.number(),
    ost: z.number(),
  })
  .meta({ id: "Koordinat" })

const bygningsstatusSchema = z
  .object({
    kode: heltallSchema,
    kortkode: tekstSchema,
    navn: tekstSchema,
    bestaaende: z.boolean(),
  })
  .meta({ id: "Bygningsstatus" })

const personBasisShape = {
  eierIdent: tekstSchema,
  navn: tekstSchema,
  adresselinje1: valgfriTekstSchema,
  adresselinje2: valgfriTekstSchema,
  adresselinje3: valgfriTekstSchema,
  land: valgfriTekstSchema,
  statuskode: valgfriTekstSchema,
  eierErUtgatt: z.boolean().optional().default(false),
}

const tiltakshaverSchema = z
  .object({
    ...personBasisShape,
    rolle: tekstSchema,
    postnummeromradenr: valgfriTekstSchema,
    postnummeromradenavn: valgfriTekstSchema,
    bruksenhetsnr: valgfriTekstSchema,
    datofra: valgfriDatoSchema,
    kategorikode: valgfriTekstSchema,
    kontaktpersonKode: valgfriTekstSchema,
  })
  .meta({ id: "Tiltakshaver" })

const kontaktpersonSchema = z
  .object({
    ...personBasisShape,
    rolle: tekstSchema,
    postnummeromradenr: valgfriTekstSchema,
    postnummeromradenavn: valgfriTekstSchema,
    datofra: valgfriDatoSchema,
    kategorikode: valgfriTekstSchema,
    kontaktpersonKode: valgfriTekstSchema,
  })
  .meta({ id: "Kontaktperson" })

const hjemmelshaverSchema = z
  .object({
    ...personBasisShape,
    andelTeller: heltallSchema.nullable(),
    andelNevner: heltallSchema.nullable(),
    postnummer: valgfriTekstSchema,
    poststed: valgfriTekstSchema,
    datofra: valgfriDatoSchema,
    datotil: valgfriDatoSchema,
    kategorikode: valgfriTekstSchema,
    harAndel: z.boolean().nullable(),
  })
  .meta({ id: "Hjemmelshaver" })

const kulturminneSchema = z
  .object({
    id: tekstSchema,
    navn: tekstSchema,
    status: tekstSchema,
    kategori: tekstSchema,
  })
  .meta({ id: "Kulturminne" })

const bruksenhetReferanseSchema = z
  .object({
    bruksenhetsnr: valgfriTekstSchema,
  })
  .meta({
    id: "BruksenhetReferanse",
    description:
      "Referanse til en bruksenhet som berøres av en bygningsendring.",
  })

const bygningsdatoerSchema = z
  .object({
    rammetillatelse: valgfriDatoSchema,
    igangsettingstillatelse: valgfriDatoSchema,
    midlertidigBrukstillatelse: valgfriDatoSchema,
    ferdigattest: valgfriDatoSchema,
    tattIBruk: valgfriDatoSchema,
    utgaattRevet: valgfriDatoSchema,
  })
  .meta({ id: "Bygningsdatoer" })

const bygningsetasjeSchema = z
  .object({
    etasjeplan: tekstSchema,
    etasje: heltallSchema,
    antallBoenheter: heltallSchema,
    bruksareal: arealFordelingSchema,
    bruttoareal: arealFordelingSchema,
  })
  .meta({ id: "Bygningsetasje" })

const bygningsendringSchema = z
  .object({
    id: heltallSchema,
    lopenr: heltallSchema,
    endringskode: valgfriTekstSchema,
    beskrivelse: valgfriTekstSchema.optional().default(null),
    bygningsstatus: bygningsstatusSchema,
    antallBoenheter: heltallSchema,
    bruksareal: arealFordelingSchema,
    bruttoareal: arealFordelingSchema,
    bebygdAreal: arealSchema,
    koordinat: koordinatSchema,
    datoer: bygningsdatoerSchema,
    etasjeplan: z.array(bygningsetasjeSchema),
    bruksenheter: z.array(bruksenhetReferanseSchema),
    tiltakshavere: z.array(tiltakshaverSchema).optional().default([]),
    kulturminner: z.array(kulturminneSchema).optional().default([]),
  })
  .meta({ id: "Bygningsendring" })

const bruksenhetArealfordelingSchema = z
  .object({
    bebygdAreal: arealSchema,
    bruksareal: arealFordelingSchema,
    koordinat: koordinatSchema,
    etasjeplan: z.array(bygningsetasjeSchema),
  })
  .meta({ id: "BruksenhetArealfordeling" })

const bruksenhetSchema = z
  .object({
    id: tekstSchema,
    nummer: valgfriTekstSchema,
    type: valgfriTekstSchema,
    seksjon: valgfriTekstSchema,
    adresse: valgfriTekstSchema,
    etasje: valgfriTekstSchema,
    antallRom: heltallSchema,
    kjokkentilgang: z.boolean().nullable(),
    antallBad: heltallSchema,
    antallWc: heltallSchema,
    arealfordeling: bruksenhetArealfordelingSchema,
    hjemmelshavere: z.array(hjemmelshaverSchema),
    kontaktpersoner: z.array(kontaktpersonSchema),
  })
  .meta({ id: "Bruksenhet" })

const bygningSchema = z
  .object({
    id: heltallSchema,
    bygningsnr: tekstSchema,
    bygningstype: bygningstypeSchema,
    naeringsgruppe: tekstSchema,
    matrikkelenhet: tekstSchema,
    bruksenheter: z.array(bruksenhetSchema),
    endringer: z.array(bygningsendringSchema).min(1),
  })
  .meta({ id: "Bygning" })

export const byggRapportSchema = rapportSchema
  .extend({
    rapportType: z.literal("BYG0011").meta({}),
    utvalgskriterier: byggUtvalgsKriterierSchema,
    bygninger: z.array(bygningSchema),
  })
  .openapi("ByggRapport", {
    description: "Datagrunnlag for rapporten BYG0011.",
  })

export type ByggRapport = z.infer<typeof byggRapportSchema>
export type Etasjeplan = z.infer<typeof bygningsetasjeSchema>
export type Bygningsendring = z.infer<typeof bygningsendringSchema>
export type Bygning = z.infer<typeof bygningSchema>
export type Kontaktperson = z.infer<typeof kontaktpersonSchema>
export type Tiltakshaver = z.infer<typeof tiltakshaverSchema>
export type Bruksenhet = z.infer<typeof bruksenhetSchema>
export type Hjemmelshaver = z.infer<typeof hjemmelshaverSchema>
export type Utvalgskriterier = z.infer<typeof byggUtvalgsKriterierSchema>
export type BygningsDatoerSchema = z.infer<typeof bygningsdatoerSchema>
