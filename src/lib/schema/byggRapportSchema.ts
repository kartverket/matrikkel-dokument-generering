import { z } from "zod"
import { rapportSchema } from "./rapportSchema"

const arealFordelingSchema = z.object({
  bolig: z.number(),
  annet: z.number(),
  totalt: z.number(),
})

const koordinatSchema = z.object({
  nord: z.number(),
  ost: z.number(),
})

const gyldighetsperiodeSchema = z.object({
  gyldigFra: z.number().nullable(),
  gyldigTil: z.number().nullable(),
})

const egenregistrertSchema = z.object({
  data: z.string().min(1),
  erGjeldende: z.boolean(),
  gyldighetsperiode: gyldighetsperiodeSchema,
})

const egenregistrerteFelterSchema = z.object({
  byggeaar: z.number().nullable(),
  vannforsyning: egenregistrertSchema.nullable(),
  avlop: egenregistrertSchema.nullable(),
  energikilder: z.array(egenregistrertSchema),
  oppvarming: z.array(egenregistrertSchema),
})

const bygningstypeSchema = z.object({
  kode: z.number(),
  navn: z.string().min(1),
})

const bygningsstatusSchema = z.object({
  kode: z.number(),
  kortkode: z.string().min(1),
  navn: z.string().min(1),
  bestaaende: z.boolean(),
})

const byggPersonSchema = z.object({
  rolle: z.string().min(1),
  fnrOrgnr: z.string().min(1),
  navn: z.string().min(1),
  bruksenhet: z.string().nullable(),
  adresse: z.string().nullable(),
})

const tiltakshaverSchema = byggPersonSchema

const kontaktpersonSchema = z.object({
  rolle: z.string().min(1),
  eierIdent: z.string().min(1),
  navn: z.string().min(1),
  adresselinje1: z.string().nullable(),
  adresselinje2: z.string().nullable(),
  adresselinje3: z.string().nullable(),
  postnummeromradenr: z.string().nullable(),
  postnummeromradenavn: z.string().nullable(),
  land: z.string().nullable(),
  bruksenhetsnr: z.string().nullable(),
  datofra: z.string().nullable(),
  datofraSOSI: z.string().nullable(),
  harDatofra: z.boolean().optional().default(false),
  kategorikode: z.string().nullable(),
  kontaktpersonKode: z.string().nullable(),
  statuskode: z.string().nullable(),
  eierErUtgatt: z.boolean().optional().default(false),
})

const hjemmelshaverSchema = z.object({
  eierIdent: z.string().min(1),
  navn: z.string().min(1),
  eierforhold: z.string().min(1),
  adresselinje1: z.string().nullable(),
  adresselinje2: z.string().nullable(),
  adresselinje3: z.string().nullable(),
  postnummer: z.string().nullable(),
  poststed: z.string().nullable(),
  land: z.string().nullable(),
  statuskode: z.string().nullable(),
  eierErUtgatt: z.boolean().optional().default(false),
  datofra: z.string().nullable(),
  datotil: z.string().nullable(),
  kategorikode: z.string().nullable(),
  bruksenhetsnr: z.string().nullable(),
  harAndel: z.boolean().nullable(),
  erSelveier: z.boolean().nullable(),
  matrikkelenhet: z.object({
    gnr: z.number(),
    bnr: z.number(),
    fnr: z.number().nullable(),
    snr: z.number().nullable(),
  }).nullable()
})

const kulturminneSchema = z.object({
  id: z.string().min(1),
  navn: z.string().min(1),
  status: z.string().min(1),
  kategori: z.string().min(1),
})

const bruksenhetSchema = z.object({
  bruksenhetsnr: z.string().nullable(),
  type: z.string().min(1),
  matrikkelenhet: z.object({
    gnr: z.number(),
    bnr: z.number(),
  }),
  bruksareal: z.number(),
  antallRom: z.number(),
  kjokkentilgang: z.boolean().nullable(),
  antallBad: z.number(),
  antallWc: z.number(),
  adresse: z.string().nullable(),
  egenregistrert: egenregistrerteFelterSchema.nullable(),
})

const bygningsdatoerSchema = z.object({
  rammetillatelse: z.string().nullable(),
  igangsettingstillatelse: z.string().nullable(),
  midlertidigBrukstillatelse: z.string().nullable(),
  ferdigattest: z.string().nullable(),
  tattIBruk: z.string().nullable(),
  utgaattRevet: z.string().nullable(),
})

const bygningsetasjeSchema = z.object({
  etasjeplan: z.string().min(1),
  etasje: z.number(),
  antallBoenheter: z.number(),
  bruksareal: arealFordelingSchema,
  bruttoareal: arealFordelingSchema,
})

const utvalgskriterierSchema = z.object({
  bestaaendeBygg: z.boolean(),
  utgaatteBygg: z.boolean(),
  bygninger: z.boolean(),
  bygningsendringer: z.boolean(),
  frededeBygninger: z.string().min(1),
  matrikkelenhet: z.object({
    gnr: z.number(),
    bnr: z.number(),
  }),
  subrapporter: z.object({
    etasjer: z.boolean(),
    bruksenheter: z.boolean(),
    tiltakshavere: z.boolean(),
    kontaktpersoner: z.boolean(),
    hjemmelshavere: z.boolean(),
    kulturminner: z.boolean(),
  }),
})

const bygningsendringSchema = z.object({
  id: z.number(),
  bygningId: z.number(),
  lopenr: z.number(),
  endringskode: z.string().nullable(),
  bygningsstatus: bygningsstatusSchema,
  antallBoenheter: z.number(),
  bruksareal: arealFordelingSchema,
  bruttoareal: arealFordelingSchema,
  bebygdAreal: z.number(),
  koordinat: koordinatSchema,
  datoer: bygningsdatoerSchema,
  etasjeplan: z.array(bygningsetasjeSchema),
  bruksenheter: z.array(bruksenhetSchema),
  tiltakshavere: z.array(tiltakshaverSchema).optional().default([]),
  kontaktpersoner: z.array(kontaktpersonSchema).optional().default([]),
  hjemmelshavere: z.array(hjemmelshaverSchema),
  kulturminner: z.array(kulturminneSchema).optional().default([]),
})

const bygningerSchema = z.object({
  id: z.number(),
  bygningsnr: z.string().min(1),
  bygningstype: bygningstypeSchema,
  adresseverdig: z.boolean(),
  naeringsgruppe: z.string().min(1),
  matrikkelenhet: z.string().min(1),
  endringer: z.array(bygningsendringSchema),
})

export const byggRapportSchema = rapportSchema.extend({
  rapportType: z.literal("BYG0011"),
  utvalgskriterier: utvalgskriterierSchema,
  bygninger: z.array(bygningerSchema),
})

export type ByggRapport = z.infer<typeof byggRapportSchema>
export type Etasjeplan = z.infer<typeof bygningsetasjeSchema>
export type Bygningsendring = z.infer<typeof bygningsendringSchema>
export type Kontaktperson = z.infer<typeof kontaktpersonSchema>
export type Bruksenhet = z.infer<typeof bruksenhetSchema>
export type Hjemmelshaver = z.infer<typeof hjemmelshaverSchema>
