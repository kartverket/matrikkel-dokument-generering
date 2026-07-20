import { z } from "@hono/zod-openapi"
import {
  valgfriDato,
  valgfriHeltall,
  valgfriNummer,
  valgfriString,
} from "../../../core/common"
import { bygningsTypeSchema } from "../shared/bygningsType.schema"
import { arealFordelingSchema } from "./arealFordeling.schema"
import { koordinatSchema } from "./koordinat.schema"
import { tiltakshaverSchema } from "./person.schema"

export const bygningsdatoerSchema = z
  .object({
    rammetillatelse: valgfriDato,
    igangsettingstillatelse: valgfriDato,
    midlertidigBrukstillatelse: valgfriDato,
    ferdigattest: valgfriDato,
    tattIBruk: valgfriDato,
    utgaattRevet: valgfriDato,
  })
  .meta({ id: "BYG0011Bygningsdatoer" })

const bruksenhetReferanseSchema = z
  .object({
    bruksenhetsnr: z.string().min(1).nullable().optional(),
  })
  .meta({
    id: "BYG0011BruksenhetReferanse",
    description:
      "Referanse til en bruksenhet som berøres av en bygningsendring.",
  })

export const bygningsEndringSchema = z
  .object({
    lopenr: valgfriHeltall.meta({
      description: "Løpenummer for endringen.",
      example: 1,
    }),
    endringsKode: valgfriString,
    bygningsStatus: valgfriString,
    bygningsType: bygningsTypeSchema,
    naeringsgruppe: valgfriString.meta({
      example: "Bolig",
    }),
    antallBoenheter: valgfriHeltall,
    bruksArealBolig: arealFordelingSchema,
    bruttoArealBolig: arealFordelingSchema,
    bebygdAreal: valgfriNummer.meta({
      description: "Bebygd areal i kvadratmeter.",
      example: 123,
    }),
    koordinat: koordinatSchema,
    datoer: bygningsdatoerSchema,

    // TODO fjerne tiltakshavere, inngår som en rolle i Hjemmelshaver/aktuell eier/kontaktinstans
    tiltakshavere: z.array(tiltakshaverSchema).optional().default([]),

    bruksenheter: z.array(bruksenhetReferanseSchema),
  })
  .meta({ id: "BYG0011Bygningsendring" })

export type ByggEndringsDatoer = z.infer<typeof bygningsdatoerSchema>
export type BygningsEndring = z.infer<typeof bygningsEndringSchema>
