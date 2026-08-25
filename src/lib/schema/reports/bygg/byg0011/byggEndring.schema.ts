import { z } from "@hono/zod-openapi"
import { avlopsKodeSchema } from "../koder/avlopsKode.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"
import { endringsKodeSchema } from "../koder/endringsKode.schema.ts"
import { naeringsgruppeKodeSchema } from "../koder/naeringsgruppeKodeSchema.ts"
import { opprinnelsesKodeSchema } from "../koder/opprinnelsesKode.schema.ts"
import { vannforsyningsKodeSchema } from "../koder/vannforsyningsKode.ts"
import { bruksenhetSchema } from "../shared/bruksenhet.schema.ts"
import { bygningstatusHistorikkRapportInfoSchema } from "../shared/bygningstatusHistorikkRapportInfo.schema.ts"
import { etasjedataSchema } from "../shared/etasjedata.schema.ts"
import { kontaktpersonSchema } from "../shared/kontaktperson.schema.ts"

export const byggEndringSchema = z
  .object({
    bygningsnummer: z.number().int().nonnegative().optional(),
    lopenummer: z.number().int().nonnegative().optional(),
    bygningsendringsKodeVerdi: endringsKodeSchema.optional().meta({
      description: "Bygningsendringskode som kodeverdi",
    }), // Mangler getter for kodeverdi, holder det å bruke teksten direkte?
    harUfullstendigAreal: z
      .union([z.literal("Ja"), z.literal("Nei")])
      .optional(),
    bygningstypeKode: bygningsTypeKodeSchema.optional(),
    naeringsgruppeKode: naeringsgruppeKodeSchema.optional(),
    bygningstatusKode: byggningsStatusKodeSchema.optional(),
    bebygdAreal: z.number().optional(),
    vannforsyningsKode: vannforsyningsKodeSchema.optional(),
    avlopsKode: avlopsKodeSchema.optional(),
    etasjedata: etasjedataSchema.optional(), // Mangler getter for denne
    kommunenummer: z.string().optional(),
    opprinnelsesKode: opprinnelsesKodeSchema.optional(),
    bruksenheter: z.array(bruksenhetSchema).optional(),
    historikker: z.array(bygningstatusHistorikkRapportInfoSchema).optional(),
    objektnr: z.number().int().optional(),
    kontaktpersoner: z.array(kontaktpersonSchema).optional(),
    bygningsstatuser: z
      .record(z.string(), z.iso.datetime({ offset: true }))
      .optional(),
    utgattDato: z.iso.datetime({ offset: true }).optional(),
    utgattBeskrivelse: z.string().optional(),

    harKontaktpersoner: z.boolean().optional(),
    harLopenr: z.boolean().optional(), // Kan utledes fra om lopenummer er ulik `null` og mer enn 0
    bygningsendringskode: z.string().optional().meta({
      description: "Bygningsendringskode som tekst",
    }),
    harOpprinnelseskode: z.boolean().optional(), // Kan utledes fra om opprinnelsesKode er `null` eller ikke
    harNaeringsgruppekode: z.boolean().optional(), // False om opprinnelsesKode er `null` eller `Ikke Oppgitt`
    harRammetillatelse: z.boolean().optional(),
    rammetillatelseDato: z.iso.datetime({ offset: true }).optional(),
    harIgangsettingstillatelse: z.boolean().optional(),
    igangsettingstillatelseDato: z.iso.datetime({ offset: true }).optional(),
    harTattibruk: z.boolean().optional(),
    tattibrukDato: z.iso.datetime({ offset: true }).optional(),
    harMidlbrukstillatelese: z.boolean().optional(),
    midlbrukstillateleseDato: z.iso.datetime({ offset: true }).optional(),
    harFerdigattest: z.boolean().optional(),
    ferdigattestDato: z.iso.datetime({ offset: true }).optional(),
    harBebygdAreal: z.boolean().optional(),
    harHeis: z.boolean().optional(),
    harVannforsyningskode: z.boolean().optional(), // False om vannforsyningskode er `null` eller `Ikke Oppgitt`
    harAvlopskode: z.boolean().optional(), // False om avlopskode er `null` eller `Ikke Oppgitt`

    sumBruksarealTilAnnet: z.number().optional(),
    sumAlternativtAreal: z.number().optional(),
    sumAlternativtAreal2: z.number().optional(),
    sumBruksarealTotalt: z.number().optional(),
    sumBruksarealTilBolig: z.number().optional(),
    sumAntallBoenheter: z.number().int().nonnegative().optional(),
    harBruksenheter: z.boolean().optional(), // False om bruksenheter er tom
    harBygningsstatuskoder: z.boolean().optional(), // False om bygningsstatuser er tom
    bygningErFerdigstilt: z.boolean().optional(),
  })
  .optional()

export type BygningsEndring = z.infer<typeof byggEndringSchema>
