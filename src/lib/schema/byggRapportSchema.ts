import { z } from "@hono/zod-openapi"
import { rapportSchema } from "./rapportSchema"

const arealFordelingSchema = z
  .object({
    bolig: z.number(),
    annet: z.number(),
    totalt: z.number(),
  })
  .meta({ id: "ArealFordeling" })

const koordinatSchema = z
  .object({
    nord: z.number(),
    ost: z.number(),
  })
  .meta({ id: "Koordinat" })

const gyldighetsperiodeSchema = z
  .object({
    gyldigFra: z.number().nullable(),
    gyldigTil: z.number().nullable(),
  })
  .meta({ id: "Gyldighetsperiode" })

const egenregistrertSchema = z
  .object({
    data: z.string().min(1),
    erGjeldende: z.boolean(),
    gyldighetsperiode: gyldighetsperiodeSchema,
  })
  .meta({ id: "Egenregistrert" })

const egenregistrerteFelterSchema = z
  .object({
    byggeaar: z.number().nullable(),
    energikilder: z.array(egenregistrertSchema),
    oppvarming: z.array(egenregistrertSchema),
    vannforsyning: egenregistrertSchema.nullable(),
    avlop: egenregistrertSchema.nullable(),
  })
  .meta({ id: "EgenregistrerteFelter" })

const bygningstypeSchema = z
  .object({
    kode: z.number(),
    navn: z.string().min(1),
  })
  .meta({ id: "Bygningstype" })

const bygningsstatusSchema = z
  .object({
    kode: z.number(),
    kortkode: z.string().min(1),
    navn: z.string().min(1),
    bestaaende: z.boolean(),
  })
  .meta({ id: "Bygningsstatus" })

const tiltakshaverSchema = z
  .object({
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
  .meta({ id: "Tiltakshaver" })

const kontaktpersonSchema = z
  .object({
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
  .meta({ id: "Kontaktperson" })

const matrikkelenhetFullSchema = z
  .object({
    gnr: z.number(),
    bnr: z.number(),
    fnr: z.number().nullable(),
    snr: z.number().nullable(),
  })
  .meta({ id: "MatrikkelenhetFull" })

const matrikkelenhetGnrBnrSchema = z
  .object({
    gnr: z.number(),
    bnr: z.number(),
  })
  .meta({ id: "MatrikkelenhetGnrBnr" })

const hjemmelshaverSchema = z
  .object({
    eierIdent: z.string().min(1),
    navn: z.string().min(1),
    andelTeller: z.number().nullable(),
    andelNevner: z.number().nullable(),
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
    matrikkelenhet: matrikkelenhetFullSchema.nullable(),
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

const bruksenhetSchema = z
  .object({
    bruksenhetsnr: z.string().nullable(),
    type: z.string().min(1),
    matrikkelenhet: matrikkelenhetGnrBnrSchema,
    bruksareal: z.number(),
    antallRom: z.number(),
    kjokkentilgang: z.boolean().nullable(),
    antallBad: z.number(),
    antallWc: z.number(),
    adresse: z.string().nullable(),
    egenregistrert: egenregistrerteFelterSchema.nullable(),
  })
  .meta({ id: "Bruksenhet" })

const bygningsdatoerSchema = z
  .object({
    rammetillatelse: z.string().nullable(),
    igangsettingstillatelse: z.string().nullable(),
    midlertidigBrukstillatelse: z.string().nullable(),
    ferdigattest: z.string().nullable(),
    tattIBruk: z.string().nullable(),
    utgaattRevet: z.string().nullable(),
  })
  .meta({ id: "Bygningsdatoer" })

const bygningsetasjeSchema = z
  .object({
    etasjeplan: z.string().min(1),
    etasje: z.number(),
    antallBoenheter: z.number(),
    bruksareal: arealFordelingSchema,
    bruttoareal: arealFordelingSchema,
  })
  .meta({ id: "Bygningsetasje" })

const utvalgskriterierSchema = z
  .object({
    bestaaendeBygg: z.boolean(),
    utgaatteBygg: z.boolean(),
    bygninger: z.boolean(),
    bygningsendringer: z.boolean(),
    frededeBygninger: z.string().min(1),
    matrikkelenhet: matrikkelenhetGnrBnrSchema,
    subrapporter: z.object({
      etasjer: z.boolean(),
      bruksenheter: z.boolean(),
      tiltakshavere: z.boolean(),
      kontaktpersoner: z.boolean(),
      hjemmelshavere: z.boolean(),
      kulturminner: z.boolean(),
    }),
  })
  .meta({ id: "Utvalgskriterier" })

const bygningsendringSchema = z
  .object({
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
  .meta({ id: "Bygningsendring" })

const bygningerSchema = z
  .object({
    id: z.number(),
    bygningsnr: z.string().min(1),
    bygningstype: bygningstypeSchema,
    adresseverdig: z.boolean(),
    naeringsgruppe: z.string().min(1),
    matrikkelenhet: z.string().min(1),
    endringer: z.array(bygningsendringSchema),
  })
  .meta({ id: "Bygning" })

export const byggRapportSchema = rapportSchema
  .extend({
    rapportType: z.literal("BYG0011").meta({
      description: "Rapporttype. Må være `BYG0011`.",
    }),
    utvalgskriterier: utvalgskriterierSchema,
    bygninger: z.array(bygningerSchema),
  })
  .openapi("ByggRapport", {
    description: "Byggrapport som skal genereres til PDF.",
  })

export type ByggRapport = z.infer<typeof byggRapportSchema>
export type Etasjeplan = z.infer<typeof bygningsetasjeSchema>
export type Bygningsendring = z.infer<typeof bygningsendringSchema>
export type Bygning = z.infer<typeof bygningerSchema>
export type Kontaktperson = z.infer<typeof kontaktpersonSchema>
export type Bruksenhet = z.infer<typeof bruksenhetSchema>
export type Hjemmelshaver = z.infer<typeof hjemmelshaverSchema>
export type BygningsDatoerSchema = z.infer<typeof bygningsdatoerSchema>
