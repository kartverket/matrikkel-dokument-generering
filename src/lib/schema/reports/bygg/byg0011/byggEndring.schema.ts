import { z } from "@hono/zod-openapi"
import {
  valgfriBool,
  valgfriDato,
  valgfriHeltall,
  valgfriListe,
  valgfriNummer,
  valgfriObjekt,
  valgfriSchema,
  valgfriString,
} from "../../shared/zodUtils.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"
import { endringsKodeSchema } from "../koder/endringsKode.schema.ts"
import { kontaktPersonKodeSchema } from "../koder/kontaktPersonKode.schema.ts"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"
import { bruksenhetSchema } from "./bruksenhet.schema.ts"

export const byggEndringSchema = z
  .object({
    // Unik ID for en bygg-endring
    // TODO: Validere at løpenummeret er unikt
    lopeNr: valgfriNummer.default(0).meta({
      description:
        "Ved tilbygg/endringer av eksisterende bygning registreres nytt løpenummer for hver endring\n" +
        "Nummeret er unikt per byggning. \n" +
        "Tomt løpenummer vil si grunnregistrering for bygget",
      example: 1,
    }),

    byggMetaEndring: valgfriObjekt({
      endringsKode: valgfriSchema(endringsKodeSchema),
      bygningsType: bygningsTypeKodeSchema,
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

    byggEtasjePlanEndringer: valgfriListe(
      valgfriObjekt({
        etasjeplan: z.string().min(1).meta({
          example: "Hovedetasje",
        }),
        etasje: z.number().int().nonnegative().meta({
          example: 1,
        }),
        antallBoenheter: valgfriNummer,
        bruksareal: arealFordelingSchema,
        bruttoareal: arealFordelingSchema,
      }),
    ),

    byggKoordinatEndring: valgfriObjekt({
      nord: valgfriNummer.meta({
        description:
          "Koordinatverdien for nord gitt valgt koordinatSystem (se KoordinatSystemKode for mer beskrivelse)",
        example: 123456789,
      }),
      ost: valgfriNummer.meta({
        description:
          "Koordinatverdien for øst gitt valgt koordinatSystem (se KoordinatSystemKode for mer beskrivelse)",
        example: 123456789,
      }),
    }),

    byggDatoEndring: valgfriObjekt({
      rammetillatelse: valgfriDato.meta({
        title: "Dato for rammetillatelse",
        description: "Datoen da bygningsendringen fikk rammetillatelse.",
      }),

      igangsettingstillatelse: valgfriDato.meta({
        title: "Dato for igangsettingstillatelse",
        description:
          "Datoen da bygningsendringen fikk igangsettingstillatelse.",
      }),

      midlertidigBrukstillatelse: valgfriDato.meta({
        title: "Dato for midlertidig brukstillatelse",
        description:
          "Datoen da bygningsendringen fikk midlertidig brukstillatelse.",
      }),

      ferdigattest: valgfriDato.meta({
        title: "Dato for ferdigattest",
        description:
          "Datoen da det ble gitt ferdigattest for bygningsendringen.",
      }),

      tattIBruk: valgfriDato.meta({
        title: "Dato tatt i bruk",
        description:
          "Datoen da bygningsendringen ble registrert som tatt i bruk.",
      }),

      utgaattRevet: valgfriDato.meta({
        title: "Dato utgått eller revet",
        description:
          "Datoen da bygningsendringen ble registrert som utgått, revet eller brent.",
      }),
    }).meta({
      title: "Endringsdatoer",
      description:
        "Datoene da bygningsendringen nådde ulike statuser i byggesaks- og registreringsforløpet.",
    }),

    tiltaksHaver: valgfriObjekt({
      bruksenhetsNr: valgfriString.meta({
        title: "Bruksenhetsnummer",
        example: "H0101",
      }),

      identifikasjonsNr: valgfriString.meta({
        title: "Fødselsdato/org.nr",
        description: "Fødselsdato eller Org. nummer for tiltakshaver",
      }),

      // Rollekoden til tiltakshaveren
      kontaktPersonKode: valgfriSchema(kontaktPersonKodeSchema), // Kan en tiltakshaver ha rolle som kontaktperson?

      // Samme felt som Status i dag, eneste gyldige verdier for status er enten død eller tom -> Derfor navn-endring
      erAvdoed: valgfriBool.default(false).meta({
        title: "Avdødd",
        description: "Er vedkommende død? \n" + "Standardverdi: false",
        example: true,
      }),

      navn: valgfriString.meta({
        description:
          "Navnet til tiltakshaveren. Kan være et selskapsnavn eller personnavn",
        example: "Bygg AS",
      }),

      adresse: valgfriString.meta({
        description: "Adressen til tiltakshaveren",
        example: "Postboks 1350 Vika 113 OSLO",
      }),
    }).meta({
      title: "Registrerte Tiltak",
      description: "Tiltakshaveren for en endring",
    }),
    bruksenheter: valgfriListe(bruksenhetSchema),
  })
  .meta({ id: "BYG0011Bygningsendring" })

/*export type ByggEndringsDatoer = z.infer<
  typeof byggEndringSchema.shape.byggDatoEndring
>*/
export type BygningsEndring = z.infer<typeof byggEndringSchema>
