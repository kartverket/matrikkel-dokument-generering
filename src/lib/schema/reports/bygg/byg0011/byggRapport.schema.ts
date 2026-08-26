import { z } from "@hono/zod-openapi"
import { rapportSchema } from "../../../core/rapport.schema"
import { avlopsKodeSchema } from "../koder/avlopsKode.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"
import { endringsKodeSchema } from "../koder/endringsKode.schema.ts"
import { jaNeiEnum } from "../koder/jaNeiEnumType.ts"
import { naringsgruppeKodeSchema } from "../koder/naringsgruppeKodeSchema.ts"
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
import { representasjonspunktSchema } from "../shared/representasjonspunkt.schema.ts"
import { sefrakSchema } from "../shared/sefrak.schema.ts"
import { byggEndringSchema } from "./byggEndring.schema.ts"

const bygningSchema = z.object({
  bygningsnummer: z.string().meta({
    title: "Bygningsnummer",
    description:
      "En entydig identifikasjon av bygningen som er unik på landsbasis og tildeles automatisk.",
    example: "12 345 678",
  }),

  lopenummer: z.number().int().nonnegative().optional().meta({
    title: "Lopenr",
    example: 1,
  }),

  bygningsendringsKode: endringsKodeSchema.optional(),
  harUfullstendigAreal: jaNeiEnum.optional(),

  bygningstypeKode: bygningsTypeKodeSchema.optional(),
  naringsgruppeKode: naringsgruppeKodeSchema.optional(),
  bygningstatusKode: byggningsStatusKodeSchema.optional(),
  bebygdAreal: z.number().optional(),
  harHeis: z.boolean().optional(),
  vannforsyningsKode: vannforsyningsKodeSchema.optional(),
  avlopsKode: avlopsKodeSchema.optional(),

  etasjedata: etasjedataSchema.optional(),
  kommunenummer: z.string().optional(),

  opprinnelsesKode: opprinnelsesKodeSchema.optional(),

  representasjonspunkt: representasjonspunktSchema.optional(),

  bruksenheter: z.array(bruksenhetSchema),

  sefrakminner: z.array(sefrakSchema),

  etasjer: z.array(etasjeRapportInfoSchema),

  kontaktpersoner: z.array(kontaktpersonSchema),

  oppvarmingskoder: z.array(enumRapportInfoSchema),

  energikilder: z.array(enumRapportInfoSchema),

  historikker: z.array(bygningstatusHistorikkRapportInfoSchema),

  hjemmelshavere: z.array(eierforholdSchema),

  bygningsendringer: z.array(byggEndringSchema),

  enkeltminner: z.array(enkeltminneSchema),

  bygningsstatuser: z
    .record(z.string(), z.iso.datetime({ offset: true }))
    .optional(),

  utgattDato: z.iso.datetime({ offset: true }).optional(),
  utgattBeskrivelse: z.string().optional(),

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
