import { z } from "@hono/zod-openapi"
import {
  valgfriDato,
  valgfriHeltall,
  valgfriNummer,
  valgfriObjekt,
  valgfriSchema,
  valgfriString,
} from "../../shared/zodUtils.ts"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"
import { bygningsTypeSchema } from "../shared/bygningsType.schema.ts"

// ref: KontaktpersonKodeId.java
const kontaktPersonKodeSchema = z.union([
  z.literal(1), // Tiltakshaver
  z.literal(2), // Kontaktperson
])

const endringsKodeSchema = z
  .union([
    z.literal(1), // Tilbygg
    z.literal(2), // Påbygg
    z.literal(3), // Underbygg
    z.literal(4), // Ombygging
    z.literal(5), // Ukjent
  ])
  .meta({
    description:
      "Beskriver endring i bygning. Koder: \n" +
      "1: Tilbygg \n" +
      "2: Påbygg \n" +
      "3: Underbygg \n" +
      "4: Ombygging \n" +
      "5: Ukjent \n",
  })

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
      endringsKode: valgfriSchema(endringsKodeSchema),
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

    byggKoordinatEndringer: {
      nord: z.number().meta({
        description:
          "Koordinatverdien for nord gitt valgt koordinatSystem (se KoordinatSystemKode for mer beskrivelse)",
        example: 123456789,
      }),
      ost: z.number().meta({
        description:
          "Koordinatverdien for øst gitt valgt koordinatSystem (se KoordinatSystemKode for mer beskrivelse)",
        example: 123456789,
      }),
    },
    byggDatoEndringer: valgfriObjekt({
      rammetillatelse: valgfriDato,
      igangsettingstillatelse: valgfriDato,
      midlertidigBrukstillatelse: valgfriDato,
      ferdigattest: valgfriDato,
      tattIBruk: valgfriDato,
      utgaattRevet: valgfriDato,
    }),

    // TODO fjerne tiltakshavere, inngår som en rolle i Hjemmelshaver/aktuell eier/kontaktinstans
    byggRegistrerteEndringer: valgfriObjekt({
      kontaktPersonKode: kontaktPersonKodeSchema.optional().meta({
        description:
          "Rollen til tiltakshaver. Koder: \n" +
          "1: Tiltakshaver \n" +
          "2: Kontaktperson \n",
      }),
    }),
    bruksenheter: z.array(bruksenhetReferanseSchema),
  })
  .meta({ id: "BYG0011Bygningsendring" })

export type ByggEndringsDatoer = z.infer<
  typeof byggEndringSchema.shape.byggDatoEndringer
>
export type BygningsEndring = z.infer<typeof byggEndringSchema>
