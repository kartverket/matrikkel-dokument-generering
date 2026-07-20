import { z } from "@hono/zod-openapi"
import {
  valgfriDato,
  valgfriHeltall,
  valgfriNummer,
  valgfriObjekt,
  valgfriString,
} from "../../shared/zodUtils.ts"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"
import { bygningsTypeSchema } from "../shared/bygningsType.schema.ts"
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

export const byggEndringSchema = z
  .object({
    // Unik ID for en bygg-endring
    lopeNr: valgfriNummer.default(0).meta({
      description:
        "Ved tilbygg/endringer av eksisterende bygning registreres nytt løpenummer for hver\n" +
        "endring. Nummeret er unikt per byggning. Løpenummer=0 tilsir grunnregistrering for bygget",
      example: 1,
    }),

    byggMetaEndring: valgfriObjekt({
      endringsKode: valgfriString,
      bygningsStatus: valgfriString,
      bygningsType: bygningsTypeSchema,
      antallBoenheter: valgfriHeltall,
      naeringsgruppe: valgfriString.meta({
        example: "Bolig",
      }),
    }),

    byggArealEndring: valgfriObjekt({
      bruksarealBolig: arealFordelingSchema, // bolig/annet/totalt
      bruttoarealBolig: arealFordelingSchema, //bolig/annet/totalt
      bebygdAreal: valgfriNummer.meta({
        description: "Bebygd areal i kvadratmeter.",
        example: 123,
      }),
    }),

    koordinat: {
      nord: z.number().meta({
        description: "Koordinatverdien for nord gitt valgt koordinatSystem",
        example: 123456789,
      }),
      ost: z.number().meta({
        description: "Koordinatverdien for øst gitt valgt koordinatSystem",
        example: 123456789,
      }),
    },
    datoer: bygningsdatoerSchema,

    // TODO fjerne tiltakshavere, inngår som en rolle i Hjemmelshaver/aktuell eier/kontaktinstans
    tiltakshavere: z.array(tiltakshaverSchema).optional().default([]),

    bruksenheter: z.array(bruksenhetReferanseSchema),
  })
  .meta({ id: "BYG0011Bygningsendring" })

export type ByggEndringsDatoer = z.infer<typeof bygningsdatoerSchema>
export type BygningsEndring = z.infer<typeof byggEndringSchema>
