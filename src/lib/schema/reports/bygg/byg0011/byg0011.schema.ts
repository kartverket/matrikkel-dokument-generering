import { z } from "@hono/zod-openapi"
import { valgfriNummer, valgfriString } from "../../../core/common"
import { rapportSchema } from "../../../core/rapport.schema"
import { bygningstypeSchema } from "../shared/bygningstype.schema"
import { byggUtvalgskriterierSchema } from "../shared/utvalgskriterier.schema"
import { arealFordelingSchema } from "./arealFordeling.schema"
import { bruksenhetSchema } from "./bruksenhet.schema"
import { bygningsendringSchema } from "./bygningsendring.schema"

const bygningsEtasjeSchema = z
  .object({
    etasjeplan: z.string().min(1).meta({
      example: "Hovedetasje",
    }),
    etasje: z.number().int().nonnegative().meta({
      example: 1,
    }),
    antallBoenheter: valgfriNummer,
    bruksareal: arealFordelingSchema,
    bruttoareal: arealFordelingSchema,
  })
  .meta({ id: "BYG0011Bygningsetasje" })

const etasjePlanSchema = z
  .array(bygningsEtasjeSchema)
  .optional()
  .default([])
  .meta({
    id: "BYG0011Etasjeplan",
  })

const bygningSchema = z
  .object({
    bygningsnr: z.string().min(1).meta({
      example: "12 345 678",
    }),
    endringsKode: valgfriString,
    bygningsStatus: valgfriString,
    bygningsType: bygningstypeSchema,
    naeringsgruppe: valgfriString.meta({
      example: "Bolig",
    }),
    antallBoenheter: z.number().int().nonnegative(),
    bruksArealBolig: arealFordelingSchema,
    bruttoArealBolig: arealFordelingSchema,

    matrikkelenhet: z.string().min(1).meta({
      example: "12/345/0/67",
    }),
    etasjePlan: etasjePlanSchema,
    bruksenheter: z.array(bruksenhetSchema).optional().default([]),
    endringer: z.array(bygningsendringSchema).optional().default([]),
  })
  .meta({ id: "BYG0011Bygning" })

export const byg0011Schema = rapportSchema
  .extend({
    rapportType: z.literal("BYG0011").meta({ example: "BYG0011" }),
    utvalgskriterier: byggUtvalgskriterierSchema,
    bygninger: z.array(bygningSchema).optional().default([]),
  })
  .openapi("BYG0011Rapport", {
    description: "Datagrunnlag for rapporten BYG0011.",
  })

export type Bygning = z.infer<typeof bygningSchema>
export type Bygningsetasje = z.infer<typeof bygningsEtasjeSchema>
export type EtasjePlan = z.infer<typeof etasjePlanSchema>
export type Byg0011Rapport = z.infer<typeof byg0011Schema>
