import { z } from "@hono/zod-openapi"
import { rapportSchema } from "../../../core/rapport.schema"
import { avlopsKodeSchema } from "../koder/avlopsKode.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"
import { endringsKodeSchema } from "../koder/endringsKode.schema.ts"
import { naeringsgruppeKodeSchema } from "../koder/naeringsgruppeKodeSchema.ts"
import { opprinnelsesKodeSchema } from "../koder/opprinnelsesKode.schema.ts"
import { vannforsyningsKodeSchema } from "../koder/vannforsyningsKode.ts"
import { bruksenhetSchema } from "../shared/bruksenhet.schema.ts"
import { byggUtvalgskriterierSchema } from "../shared/byggUtvalgskriterier.schema.ts"
import { bygningstatusHistorikkRapportInfoSchema } from "../shared/bygningstatusHistorikkRapportInfo.schema.ts"
import { eierforholdSchema } from "../shared/eierforholdSchema.ts"
import { enkeltminneSchema } from "../shared/enkeltminne.schema.ts"
import { enumRapportInfoSchema } from "../shared/enumRapportInfo.schema.ts"
import { etasjedataSchema } from "../shared/etasjedata.schema.ts"
import { etasjeRapportInfoSchema } from "../shared/etasjeRapportInfo.schema.ts"
import { kontaktpersonSchema } from "../shared/kontaktperson.schema.ts"
import { sefrakSchema } from "../shared/sefrak.schema.ts"
import { byggEndringSchema } from "./byggEndring.schema.ts"

const bygningSchema = z.object({
  bygningsnummer: z.string().optional().meta({
    title: "Bygningsnummer",
    description:
      "En entydig identifikasjon av bygningen som er unik på landsbasis og tildeles automatisk.",
    example: "12 345 678",
  }),

  lopenummer: z.number().int().nonnegative().optional().meta({
    title: "Lopenr",
    example: 1,
  }),
  harLopenummer: z.boolean().optional(),

  bygningsendringsKode: endringsKodeSchema.optional(),
  harUfullstendigAreal: z.union([z.literal("Ja"), z.literal("Nei")]).optional(),

  bygningstypeKode: bygningsTypeKodeSchema.optional(),
  naringsgruppeKode: naeringsgruppeKodeSchema.optional(),
  harNaeringsgruppekode: z.boolean().optional(),
  bygningstatusKode: byggningsStatusKodeSchema.optional(),
  bebygdAreal: z.number().optional(),
  harBebygdAreal: z.boolean().optional(),
  harHeis: z.boolean().optional(),
  vannforsyningsKode: vannforsyningsKodeSchema.optional(),
  harVannforsyningskode: z.boolean().optional(),
  avlopsKode: avlopsKodeSchema.optional(),
  harAvlopskode: z.boolean().optional(),

  etasjedata: etasjedataSchema.optional(), // Mangler getter for denne
  kommunenummer: z.string().optional(),

  opprinnelsesKode: opprinnelsesKodeSchema.optional(),
  harOpprinnelseskode: z.boolean().optional(),

  harRepresentasjonspunkt: z.boolean().optional(),
  harStedfestingVerifisertRepPunkt: z.boolean().optional(),
  nord: z.number().optional(),
  nordSOSI: z.string().optional(),
  ost: z.number().optional(),
  ostSOSI: z.string().optional(),

  koordinatkvalitetKode: z.string().optional(),
  harKoordinatkvalitetkode: z.boolean().optional(),
  koordinatsystem: z.string().optional(),

  bruksenheter: z.array(bruksenhetSchema),
  harBruksenheter: z.boolean().optional(),

  sefrakminner: z.array(sefrakSchema),
  harSefrakminner: z.boolean().optional(),

  etasjer: z.array(etasjeRapportInfoSchema),
  harEtasjer: z.boolean().optional(),
  antallEtasjer: z.number().int().nonnegative().optional(),

  harKontaktpersoner: z.boolean().optional(),
  kontaktpersoner: z.array(kontaktpersonSchema),

  harTiltakshavere: z.boolean().optional(),
  tiltakshavere: z.array(kontaktpersonSchema).optional(),

  harKontaktpersonderSomIkkeErTiltakshavere: z.boolean().optional(),
  kontaktpersonerSomIkkeErTiltakshavere: z
    .array(kontaktpersonSchema)
    .optional(),

  oppvarmingskoder: z.array(enumRapportInfoSchema),
  harOppvarming: z.boolean().optional(),

  energikilder: z.array(enumRapportInfoSchema),
  harEnergikilder: z.boolean().optional(),

  historikker: z.array(bygningstatusHistorikkRapportInfoSchema),
  harBygningsstatuskoder: z.boolean().optional(),

  hjemmelshavere: z.array(eierforholdSchema),
  harHjemmelshavere: z.boolean().optional(),

  bygningsendringer: z.array(byggEndringSchema),
  harBygningsendringer: z.boolean().optional(),

  enkeltminner: z.array(enkeltminneSchema),
  harEnkeltminner: z.boolean().optional(),

  endringer: z.array(byggEndringSchema),

  harRammetillatelse: z.boolean().optional(),
  rammetillatelsedato: z.iso.datetime({ offset: true }).optional(),
  harIgangsettingstillatelse: z.boolean().optional(),
  igangsettingstillatelseDato: z.iso.datetime({ offset: true }).optional(),
  harTattibruk: z.boolean().optional(),
  tattibrukDato: z.iso.datetime({ offset: true }).optional(),
  harMidlbrukstillatelese: z.boolean().optional(),
  midlbrukstillateleseDato: z.iso.datetime({ offset: true }).optional(),
  harFerdigattest: z.boolean().optional(),
  ferdigattestDato: z.iso.datetime({ offset: true }).optional(),

  utgattDato: z.iso.datetime({ offset: true }).optional(),
  utgattBeskrivelse: z.string().optional(),

  sumBruksarealTilAnnet: z.number().optional(),
  sumBruttoarealTilAnnet: z.number().optional(),
  sumAlternativtAreal: z.number().optional(),
  sumAlternativtAreal2: z.number().optional(),
  sumBruksarealTotalt: z.number().optional(),
  sumBruttoarealTotalt: z.number().optional(),
  sumBruksarealTilBolig: z.number().optional(),
  sumBruttoarealTilBolig: z.number().optional(),
  sumAntallBoenheter: z.number().int().nonnegative().optional(),

  // Disse har 2 forskjellige gettere som gir 2 forskjellige resultat
  erFerdigstilt: z.boolean().optional().meta({
    description: "Bygning har ferdigattest eller er tatt i bruk.",
  }),
  bygningErFerdigstilt: z.boolean().optional().meta({
    description: "Bygningen er ferdigstilt",
  }),

  erBygningsendring: z.boolean().optional(),
  objektnummer: z.number().int().nonnegative().optional(),
})

export const byggRapportSchema = rapportSchema
  .extend({
    // Literal (ikke felles enum) slik at rapportKode kan brukes som diskriminator i API-et
    rapportKode: z.literal("BYG0011").meta({
      description: "Rapportkoden for byggrapport.",
      example: "BYG0011",
    }),
    utvalgskriterier: byggUtvalgskriterierSchema,
    bygninger: z.array(bygningSchema),
  })
  .meta({
    id: "BYG0011",
    title: "BYG0011 - Byggrapport",
  })

export type Bygning = z.infer<typeof bygningSchema>
export type Byg0011Rapport = z.infer<typeof byggRapportSchema>
