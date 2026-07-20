import { z } from "@hono/zod-openapi"
import { rapportSchema } from "../../../core"
import { byggUtvalgsKriterierSchema } from "../shared/byggUtvalgskriterier.schema"
import { bygningstypeSchema } from "../shared/bygningstyper.schema"

const arealFordelingSchema = z
  .object({
    bolig: z.number().nonnegative(),
    annet: z.number().nonnegative(),
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
    kode: z.number().int().nonnegative(),
    kortkode: z.string().min(1),
    navn: z.string().min(1),
    bestaaende: z.boolean(),
  })
  .meta({ id: "Bygningsstatus" })

const personBasisShape = {
  eierIdent: z.string().min(1),
  navn: z.string().min(1),
  adresselinje1: z.string().min(1).nullable().optional(),
  adresselinje2: z.string().min(1).nullable().optional(),
  adresselinje3: z.string().min(1).nullable().optional(),
  land: z.string().min(1).nullable().optional(),
  statuskode: z.string().min(1).nullable().optional(),
  eierErUtgatt: z.boolean().optional().default(false),
}

const tiltakshaverSchema = z
  .object({
    ...personBasisShape,
    rolle: z.string().min(1),
    postnummeromradenr: z.string().min(1).nullable().optional(),
    postnummeromradenavn: z.string().min(1).nullable().optional(),
    bruksenhetsnr: z.string().min(1).nullable().optional(),
    datofra: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
    kategorikode: z.string().min(1).nullable().optional(),
    kontaktpersonKode: z.string().min(1).nullable().optional(),
  })
  .meta({ id: "Tiltakshaver" })

const kontaktpersonSchema = z
  .object({
    ...personBasisShape,
    rolle: z.string().min(1),
    postnummeromradenr: z.string().min(1).nullable().optional(),
    postnummeromradenavn: z.string().min(1).nullable().optional(),
    datofra: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
    kategorikode: z.string().min(1).nullable().optional(),
    kontaktpersonKode: z.string().min(1).nullable().optional(),
  })
  .meta({ id: "Kontaktperson" })

const hjemmelshaverSchema = z
  .object({
    ...personBasisShape,
    andelTeller: z.number().int().nonnegative().nullable(),
    andelNevner: z.number().int().nonnegative().nullable(),
    postnummer: z.string().min(1).nullable().optional(),
    poststed: z.string().min(1).nullable().optional(),
    datofra: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
    datotil: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
    kategorikode: z.string().min(1).nullable().optional(),
    harAndel: z.boolean().nullable(),
  })
  .meta({ id: "Hjemmelshaver" })

const kulturminneSchema = z
  .object({
    id: z.string().min(1),
    navn: z.string().min(1),
    status: z.string().min(1),
    kategori: z.string().min(1),
  })
  .meta({ id: "Kulturminne" })

const bruksenhetReferanseSchema = z
  .object({
    bruksenhetsnr: z.string().min(1).nullable().optional(),
  })
  .meta({
    id: "BruksenhetReferanse",
    description:
      "Referanse til en bruksenhet som berøres av en bygningsendring.",
  })

const bygningsdatoerSchema = z
  .object({
    rammetillatelse: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
    igangsettingstillatelse: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
    midlertidigBrukstillatelse: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
    ferdigattest: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
    tattIBruk: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
    utgaattRevet: z.iso
      .datetime()
      .optional()
      .meta({ example: "2026-07-17T00:00:00Z" }),
  })
  .meta({ id: "Bygningsdatoer" })

const bygningsetasjeSchema = z
  .object({
    etasjeplan: z.string().min(1),
    etasje: z.number().int().nonnegative(),
    antallBoenheter: z.number().int().nonnegative(),
    bruksareal: arealFordelingSchema,
    bruttoareal: arealFordelingSchema,
  })
  .meta({ id: "Bygningsetasje" })

const bygningsendringSchema = z
  .object({
    id: z.number().int().nonnegative(),
    lopenr: z.number().int().nonnegative(),
    endringskode: z.string().min(1).nullable().optional(),
    beskrivelse: z
      .string()
      .min(1)
      .nullable()
      .optional()
      .optional()
      .default(null),
    bygningsstatus: bygningsstatusSchema,
    antallBoenheter: z.number().int().nonnegative(),
    bruksareal: arealFordelingSchema,
    bruttoareal: arealFordelingSchema,
    bebygdAreal: z.number().nonnegative(),
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
    bebygdAreal: z.number().nonnegative(),
    bruksareal: arealFordelingSchema,
    koordinat: koordinatSchema,
    etasjeplan: z.array(bygningsetasjeSchema),
  })
  .meta({ id: "BruksenhetArealfordeling" })

const bruksenhetSchema = z
  .object({
    id: z.string().min(1),
    nummer: z.string().min(1).nullable().optional(),
    type: z.string().min(1).nullable().optional(),
    seksjon: z.string().min(1).nullable().optional(),
    adresse: z.string().min(1).nullable().optional(),
    etasje: z.string().min(1).nullable().optional(),
    antallRom: z.number().int().nonnegative(),
    kjokkentilgang: z.boolean().nullable(),
    antallBad: z.number().int().nonnegative(),
    antallWc: z.number().int().nonnegative(),
    arealfordeling: bruksenhetArealfordelingSchema,
    hjemmelshavere: z.array(hjemmelshaverSchema),
    kontaktpersoner: z.array(kontaktpersonSchema),
  })
  .meta({ id: "Bruksenhet" })

const bygningSchema = z
  .object({
    id: z.number().int().nonnegative(),
    bygningsnr: z.string().min(1),
    bygningstype: bygningstypeSchema,
    naeringsgruppe: z.string().min(1),
    matrikkelenhet: z.string().min(1),
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
