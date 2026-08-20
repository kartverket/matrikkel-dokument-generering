import { z } from "@hono/zod-openapi"
import { koordinatSystemKodeSchema } from "../../../core/koder/koordinatSystemKode.schema.ts"
import { rapportSchema } from "../../../core/rapport.schema"
import { valgfriDato } from "../../../core/utils/zodUtils.ts"
import { avlopsKodeSchema } from "../koder/avlopsKode.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"
import { endringsKodeSchema } from "../koder/endringsKode.schema.ts"
import { koordinatkvalitetKodeSchema } from "../koder/koordinatkvalitetKode.schema.ts"
import { naringsgruppeKodeSchema } from "../koder/naringsgruppeKode.schema.ts"
import { opprinnelsesKodeSchema } from "../koder/opprinnelsesKode.schema.ts"
import { vannforsyningsKodeSchema } from "../koder/vannforsyningsKode.ts"
import { aktuellEierSchema } from "../shared/aktuellEier.schema.ts"
import { bruksenhetSchema } from "../shared/bruksenhet.schema.ts"
import { byggUtvalgskriterierSchema } from "../shared/byggUtvalgskriterier.schema.ts"
import { bygningstatusHistorikkRapportInfoSchema } from "../shared/bygningstatusHistorikkRapportInfo.schema.ts"
import { enkeltminneSchema } from "../shared/enkeltminne.schema.ts"
import { enumRapportInfoSchema } from "../shared/enumRapportInfo.schema.ts"
import { etasjedataSchema } from "../shared/etasjedata.schema.ts"
import { etasjeRapportInfoSchema } from "../shared/etasjeRapportInfo.schema.ts"
import { kontaktpersonSchema } from "../shared/kontaktperson.schema.ts"
import { representasjonspunktSchema } from "../shared/representasjonspunkt.schema.ts"
import { sefrakSchema } from "../shared/sefrak.schema.ts"
import { byggEndringSchema } from "./byggEndring.schema.ts"

const bygningSchema = z.object({
  bygningsnr: z.string().optional().meta({
    title: "Bygningsnummer",
    description:
      "En entydig identifikasjon av bygningen som er unik på landsbasis og tildeles automatisk.",
    example: "12 345 678",
  }),

  lopenr: z.number().int().nonnegative().optional().meta({
    title: "Lopenr",
    example: 1,
  }),

  bygningsendringsKode: endringsKodeSchema.optional(),
  harUfullstendigAreal: z.boolean().optional(),
  bygningstypeKode: bygningsTypeKodeSchema.optional(),
  naringsgruppeKode: naringsgruppeKodeSchema.optional(),
  bygningstatusKode: byggningsStatusKodeSchema.optional(),
  bebygdAreal: z.number().optional(),
  harHeis: z.boolean().optional(),
  vannforsyningsKode: vannforsyningsKodeSchema.optional(),
  avlopsKode: avlopsKodeSchema.optional(),
  etasjedata: etasjedataSchema.optional(),
  kommunenr: z.string().optional(),
  opprinnelsesKode: opprinnelsesKodeSchema.optional(),
  representasjonspunkt: representasjonspunktSchema.optional(),
  koordinatkvalitetKode: koordinatkvalitetKodeSchema.optional(),
  koordinatsystemKode: koordinatSystemKodeSchema.optional(),

  bruksenheter: z.array(bruksenhetSchema),
  sefrakminner: z.array(sefrakSchema),
  etasjer: z.array(etasjeRapportInfoSchema),
  kontaktpersoner: z.array(kontaktpersonSchema),
  oppvarmingskoder: z.array(enumRapportInfoSchema),
  energikilder: z.array(enumRapportInfoSchema),
  historikker: z.array(bygningstatusHistorikkRapportInfoSchema),
  hjemmelshavere: z.array(aktuellEierSchema),
  bygningsendringer: z.array(byggEndringSchema),

  matrikkelNr: z.string().optional().meta({
    title: "Matrikkelnummer",
    example: "5001-12/34/0/2",
    description: "KommuneNr-GårdsNr/BruksNr/Festenr/SeksjonsNr",
  }),

  endringer: z.array(byggEndringSchema),
  enkeltminneInfos: z.array(enkeltminneSchema),

  bygningsstatuser: z
    .record(z.string(), z.iso.datetime({ offset: true }))
    .optional()
    .meta({
      description:
        "Map over bygningsstatuskode til dato. Placeholder-format til statusfeltets endelige modell er avklart.",
    }),
  utgattDato: valgfriDato,
  utgattBeskrivelse: z.string().optional(),
  byggId: z.unknown().optional().meta({
    description:
      "Placeholder for ByggId inntil endelig serialisering av id-objektet er avklart.",
  }),
  objektnr: z.number().int().nonnegative().optional(),
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
