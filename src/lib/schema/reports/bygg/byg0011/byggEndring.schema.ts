import { z } from "@hono/zod-openapi"
import { avlopsKodeSchema } from "../koder/avlopsKode.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"
import { endringsKodeSchema } from "../koder/endringsKode.schema.ts"
import { jaNeiEnum } from "../koder/jaNeiEnumType.ts"
import { naringsgruppeKodeSchema } from "../koder/naringsgruppeKodeSchema.ts"
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
    bygningsendringsKode: endringsKodeSchema.optional().meta({
      description: "Bygningsendringskode som kodeverdi",
    }),
    harUfullstendigAreal: jaNeiEnum.optional(),
    bygningstypeKode: bygningsTypeKodeSchema.optional(),
    naeringsgruppeKode: naringsgruppeKodeSchema.optional(),
    bygningstatusKode: byggningsStatusKodeSchema.optional(),
    bebygdAreal: z.number().optional(),
    vannforsyningsKode: vannforsyningsKodeSchema.optional(),
    avlopsKode: avlopsKodeSchema.optional(),
    etasjedata: etasjedataSchema.optional(),
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

    harHeis: z.boolean().optional(),
    bygningErFerdigstilt: z.boolean().optional(),
  })
  .optional()

export type BygningsEndring = NonNullable<z.infer<typeof byggEndringSchema>>
