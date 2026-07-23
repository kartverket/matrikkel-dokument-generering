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
} from "../../../core/utils/zodUtils.ts"
import { bruksenhetsKodeSchema } from "../koder/bruksenhetsTypeKode.schema.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"
import { eierforholdKodeSchema } from "../koder/eierforholdKode.schema.ts"
import { endringsKodeSchema } from "../koder/endringsKode.schema.ts"
import { etasjeplanKodeSchema } from "../koder/etasjeplanKode.schema.ts"
import { kjokkenTilgangKodeSchema } from "../koder/kjokkenTilgangKode.ts"
import { kontaktPersonKodeSchema } from "../koder/kontaktPersonKode.schema.ts"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"

export const byggEndringSchema = valgfriObjekt({
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
    bygningsStatusKode: valgfriSchema(byggningsStatusKodeSchema),
    bygningsTypeKode: valgfriSchema(bygningsTypeKodeSchema),
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

  etasjePlan: valgfriListe(
    valgfriObjekt({
      etasjeplanKode: etasjeplanKodeSchema,
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
      description: "Datoen da bygningsendringen fikk igangsettingstillatelse.",
    }),

    midlertidigBrukstillatelse: valgfriDato.meta({
      title: "Dato for midlertidig brukstillatelse",
      description:
        "Datoen da bygningsendringen fikk midlertidig brukstillatelse.",
    }),

    ferdigattest: valgfriDato.meta({
      title: "Dato for ferdigattest",
      description: "Datoen da det ble gitt ferdigattest for bygningsendringen.",
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

  sefrakId: valgfriString.meta({
    example: "0301 - 103 - 58",
    description:
      "Sefrak-ID er bygningens identifikasjonsnummer i SEFRAK-registeret, et kulturhistorisk register over eldre bygninger. SEFRAK står for «Sekretariatet for registrering av faste kulturminne i Norge». \n" +
      "Tallene betyr: KommuneNummer - Registreringskrets - Løpenummer \n" +
      "\n" +
      "Eksempelvis for Sefrak-ID 0301-103-58 så er: \n" +
      "0301 – kommunenummeret for Oslo \n" +
      "103 – registreringskretsen, altså Riksantikvarens geografiske inndeling av kommunen, historisk ofte basert på eldre kirke- eller sognekretser \n" +
      "58 – bygningens løpenummer innenfor registreringskrets 103",
  }),

  harKulturminne: valgfriBool.meta({
    // Vil ikke si at bygget nødvendigvis er fredet
    description:
      "Inneholder endringen kulturminne? \n" +
      "å ha kulturminner vil så at endringen er knyttet et registrert kulturminne i Riksantikvarens database Askeladden",
  }),

  // Tidligere Hjemmelshaver/aktuell eier/kontaktinstans
  aktuellEier: valgfriObjekt({
    bruksenhetsNr: valgfriString.meta({
      title: "Bruksenhetsnummer",
      example: "H0101",
    }),
    eierforholdKode: eierforholdKodeSchema,

    identifikasjonsNr: valgfriString.meta({
      title: "Fødselsdato/org.nr",
      description: "Fødselsdato eller Org. nummer for den aktuelle eieren",
    }),

    // Samme felt som Status i dag, eneste gyldige verdier for status er enten død eller tom -> Derfor navn-endring
    erAvdoed: valgfriBool.default(false).meta({
      title: "Avdødd",
      description: "Er vedkommende død? \n" + "Standardverdi: false",
      example: true,
    }),

    navn: valgfriString.meta({
      description:
        "Navnet til den aktuelle eieren. Kan være et selskapsnavn eller personnavn",
      example: "Bygg AS",
    }),

    adresse: valgfriString.meta({
      description: "Adressen til den aktuelle eieren.",
      example: "Postboks 1350 Vika 113 OSLO",
    }),

    andel: valgfriString.meta({
      description: "Andel den aktuelle eieren eventuelt eier av bruksenheten",
      example: "2/5",
    }),
  }),

  // Tiltakshaveren til endringen
  tiltaksHaver: valgfriObjekt({
    bruksenhetsNr: valgfriString.meta({
      title: "Bruksenhetsnummer",
      example: "H0101",
    }),

    // Rollekoden til tiltakshaveren
    kontaktPersonKode: valgfriSchema(kontaktPersonKodeSchema), // Kan en tiltakshaver ha rolle som kontaktperson?

    identifikasjonsNr: valgfriString.meta({
      title: "Fødselsdato/org.nr",
      description: "Fødselsdato eller Org. nummer for tiltakshaver",
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

  // Bruksenheter til endringen
  bruksenheter: valgfriListe(
    valgfriObjekt({
      bruksenhetsNr: valgfriString.meta({
        description: "Bruksenhetsnummer",
        example: "H0101",
      }),

      bruksenhetsTypeKode: bruksenhetsKodeSchema,

      bruksAreal: valgfriNummer.meta({
        description:
          "Bruksarealet til bruksenheten gitt endringen. Oppgis i kvadratmeter. ",
      }),

      antallRom: valgfriNummer,
      antallBad: valgfriNummer,
      antallWC: valgfriNummer,
      kjokkenTilgangKode: kjokkenTilgangKodeSchema,
      adresse: valgfriString.meta({
        example: "Postboks 1234 Nydalen 123 OSLO",
        description: "Adressen til bruksenheten gitt endringen.",
      }),

      matrikkelNr: z.string().min(1).meta({
        title: "Matrikkelnummer",
        example: "5001-12/34/0/2",
        description: "KommuneNr-GårdsNr/BruksNr/Festenr/SeksjonsNr",
      }),
    }),
  ),
})

export type ByggEndringsDatoer = NonNullable<
  NonNullable<BygningsEndring>["byggDatoEndring"]
>
export type TiltaksHaver = NonNullable<
  NonNullable<BygningsEndring>["tiltaksHaver"]
>
export type AktuellEier = NonNullable<
  NonNullable<BygningsEndring>["aktuellEier"]
>
export type EtasjePlan = NonNullable<BygningsEndring>["etasjePlan"]

export type BygningsEndring = z.infer<typeof byggEndringSchema>

type Bruksenheter = NonNullable<NonNullable<BygningsEndring>["bruksenheter"]>
export type Bruksenhet = NonNullable<Bruksenheter[number]>
