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
    vannforsyning: z.object(egenregistrertSchema.shape).nullable(),
    avlop: z.object(egenregistrertSchema.shape).nullable(),
  })
  .meta({ id: "EgenregistrerteFelter" })

const bygningstypeSchema = z
  .object({
    kode: z.number(),
    navn: z.string().min(1),
  })
  .meta({ id: "Bygningstype" })

const valgfriTekstSchema = z.string().nullable()

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
    matrikkelenhet: z.object(matrikkelenhetFullSchema.shape).nullable(),
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

export const bruksenhetSchema = z
  .object({
    bruksenhetsnr: z.string().nullable(),
    type: z.string().min(1),
    matrikkelenhet: matrikkelenhetFullSchema,
    etasjeplankode: z.enum(["H", "L", "U", "K"]).nullable(),
    etasjenummer: z.number().nullable(),
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
    omfang: z.object({
      bestaaendeBygg: z.boolean(),
      utgaatteBygg: z.boolean(),
      bygninger: z.boolean(),
      bygningsendringer: z.boolean(),
      frededeBygninger: z.string().min(1),
    }),
    bygning: z.object({
      bygningsnr: valgfriTekstSchema,
      bygningstyper: z.array(bygningstypeSchema),
      lopenr: z.number().nullable(),
    }),
    adresse: z.object({
      adressekode: valgfriTekstSchema,
      bruksenhetsnr: valgfriTekstSchema,
      adressenavn: valgfriTekstSchema,
      nr: z.number().nullable(),
      bokstav: valgfriTekstSchema,
      utenBokstav: z.boolean(),
      tilleggsnavn: valgfriTekstSchema,
    }),
    matrikkelenhet: matrikkelenhetFullSchema,
    hjemmelshaver: z.object({
      foedselsEllerOrgnr: valgfriTekstSchema,
      etternavn: valgfriTekstSchema,
      fornavn: valgfriTekstSchema,
    }),
    bygningsstatus: z.object({
      naavaerende: z.array(z.string()),
      tidligere: z.array(z.string()),
      periodeFra: valgfriTekstSchema,
      periodeTil: valgfriTekstSchema,
    }),
    sokevindu: z.object({
      nedreVenstre: koordinatSchema,
      ovreHoeyre: koordinatSchema,
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
  .meta({ id: "Utvalgskriterier" })

const bygningsendringSchema = z
  .object({
    id: z.number(),
    bygningId: z.number(),
    lopenr: z.number(),
    endringskode: z.string().nullable(),
    beskrivelse: z.string().nullable().optional().default(null),
    bygningsstatus: bygningsstatusSchema,
    antallBoenheter: z.number(),
    bruksareal: arealFordelingSchema,
    bruttoareal: arealFordelingSchema,
    bebygdAreal: z.number(),
    koordinat: koordinatSchema,
    koordinatsystem: z.string().min(1),
    datoer: bygningsdatoerSchema,
    etasjeplan: z.array(bygningsetasjeSchema),
    bruksenheter: z.array(bruksenhetSchema),
    tiltakshavere: z.array(tiltakshaverSchema).optional().default([]),
    kulturminner: z.array(kulturminneSchema).optional().default([]),
  })
  .meta({ id: "Bygningsendring" })

const bruksenhetArealfordelingSchema = z
  .object({
    bebygdAreal: z.number(),
    bruksareal: arealFordelingSchema,
    koordinat: koordinatSchema,
    etasjeplan: z.array(bygningsetasjeSchema),
  })
  .meta({ id: "BruksenhetArealfordeling" })

const bruksenhetEndringDetaljSchema = z
  .object({
    id: z.string().min(1),
    bygningId: z.string().min(1),
    lopenr: z.string().min(1),
    tittel: z.string().min(1),
    status: z.string().min(1),
    bygningsstatus: z.string().min(1),
    bygningsstatuskode: z.string().min(1),
    bygningsstatusKortkode: z.string().min(1),
    bestaaende: z.string().min(1),
    endringskode: z.string().min(1),
    beskrivelse: z.string().min(1),
    bygningstype: z.string().min(1),
    antallBoenheter: z.string().min(1),
    bruksareal: z.string().min(1),
    bruttoareal: z.string().min(1),
    bebygdAreal: z.string().min(1),
    rammetillatelse: z.string().min(1),
    igangsettingstillatelse: z.string().min(1),
    midlertidigBrukstillatelse: z.string().min(1),
    ferdigattest: z.string().min(1),
    tattIBruk: z.string().min(1),
    utgaattRevet: z.string().min(1),
    koordinater: z.string().min(1),
    etasjer: z.array(
      z.object({
        etasjeplan: z.string().min(1),
        etasje: z.string().min(1),
        antallBoenheter: z.string().min(1),
        bruksarealBolig: z.string().min(1),
        bruksarealAnnet: z.string().min(1),
        bruksarealTotalt: z.string().min(1),
        bruttoarealBolig: z.string().min(1),
        bruttoarealAnnet: z.string().min(1),
        bruttoarealTotalt: z.string().min(1),
      }),
    ),
    kulturminner: z.array(kulturminneSchema),
  })
  .meta({ id: "BruksenhetEndringDetalj" })

const bruksenhetDetaljSchema = z
  .object({
    id: z.string().min(1),
    nummer: z.string().min(1),
    typeChip: z.string().min(1).nullable(),
    seksjon: z.string().nullable(),
    bruksenhetstype: z.string().min(1),
    adresse: z.string().min(1),
    etasje: z.string().min(1),
    bruksareal: z.string().min(1),
    antallRom: z.string().min(1),
    kjokken: z.string().min(1),
    antallBad: z.string().min(1),
    antallWc: z.string().min(1),
    arealfordeling: bruksenhetArealfordelingSchema,
    hjemmelshavere: z.array(hjemmelshaverSchema),
    kontaktpersoner: z.array(kontaktpersonSchema),
    endringer: z.array(bruksenhetEndringDetaljSchema),
  })
  .meta({ id: "BruksenhetDetalj" })

const bygningerSchema = z
  .object({
    id: z.number(),
    bygningsnr: z.string().min(1),
    bygningstype: bygningstypeSchema,
    adresseverdig: z.boolean(),
    naeringsgruppe: z.string().min(1),
    matrikkelenhet: z.string().min(1),
    gjeldende: bygningsendringSchema,
    bruksenheter: z.array(bruksenhetDetaljSchema),
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
export type Tiltakshaver = z.infer<typeof tiltakshaverSchema>
export type Bruksenhet = z.infer<typeof bruksenhetSchema>
export type BruksenhetDetalj = z.infer<typeof bruksenhetDetaljSchema>
export type Hjemmelshaver = z.infer<typeof hjemmelshaverSchema>
export type Utvalgskriterier = z.infer<typeof utvalgskriterierSchema>
export type BygningsDatoerSchema = z.infer<typeof bygningsdatoerSchema>
