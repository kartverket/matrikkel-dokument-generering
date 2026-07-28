import type { z } from "@hono/zod-openapi"
import {
  valgfriDato,
  valgfriHeltall,
  valgfriListe,
  valgfriNummer,
  valgfriObjekt,
  valgfriSchema,
  valgfriString,
} from "../../../core/utils/zodUtils.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"
import { endringsKodeSchema } from "../koder/endringsKode.schema.ts"
import { etasjeplanKodeSchema } from "../koder/etasjeplanKode.schema.ts"
import { naringsgruppeKodeSchema } from "../koder/naringsgruppeKode.schema.ts"
import { aktuellEierSchema } from "../shared/aktuellEier.schema.ts"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"
import { bruksenhetSchema } from "../shared/bruksenhet.schema.ts"
import { enkeltminneSchema } from "../shared/enkeltminne.schema.ts"
import { kontaktpersonSchema } from "../shared/kontaktperson.schema.ts"

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
    naringsgruppeKode: valgfriSchema(naringsgruppeKodeSchema),
  }),

  byggArealEndring: valgfriObjekt({
    bruksarealBolig: valgfriSchema(arealFordelingSchema), // bolig/annet/totalt
    bruttoarealBolig: valgfriSchema(arealFordelingSchema), //bolig/annet/totalt
    bebygdAreal: valgfriNummer.meta({
      description: "Bebygd areal i kvadratmeter.",
      example: 123,
    }),
  }),

  etasjePlan: valgfriListe(
    valgfriObjekt({
      etasjeplanKode: valgfriSchema(etasjeplanKodeSchema),
      etasje: valgfriHeltall.meta({
        example: 1,
      }),
      antallBoenheter: valgfriNummer,
      bruksareal: valgfriSchema(arealFordelingSchema),
      bruttoareal: valgfriSchema(arealFordelingSchema),
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

  // SEFRAK og bygg er mange-til-mange i matrikkelen, så en bygning kan ha flere SEFRAK-minner
  sefrakIder: valgfriListe(
    valgfriString.meta({
      example: "0301-0103-058",
      description:
        "Sefrak-ID er bygningens identifikasjonsnummer i SEFRAK-registeret, et kulturhistorisk register over eldre bygninger. SEFRAK står for «Sekretariatet for registrering av faste kulturminne i Norge». \n" +
        "Tallene betyr: KommuneNummer - Registreringskrets - Husløpenummer, med ledende nuller \n" +
        "\n" +
        "Eksempelvis for Sefrak-ID 0301-0103-058 så er: \n" +
        "0301 – kommunenummeret for Oslo \n" +
        "0103 – registreringskretsen, altså Riksantikvarens geografiske inndeling av kommunen, historisk ofte basert på eldre kirke- eller sognekretser \n" +
        "058 – bygningens husløpenummer innenfor registreringskrets 103",
    }),
  ).meta({
    title: "SEFRAK-minner",
    description:
      "Sefrak-ID-ene til SEFRAK-minnene som er knyttet til bygningsendringen. SEFRAK-knytningen går vanligvis til bygget (grunnregistreringen), unntaksvis til tilbygg.",
  }),

  // Kulturminner
  kulturminner: valgfriListe(enkeltminneSchema),

  // Tidligere Hjemmelshaver/aktuell eier/kontaktinstans.
  // En bygning kan ha flere eierforhold: tinglyste (H, F, F1–F9), ikke-tinglyste (AE, AF) og kontaktinstanser (KE, KF, K1–K3)
  // Alle bruker samme EierforholdKode-kodeliste
  aktuelleEiere: valgfriListe(aktuellEierSchema),

  // Tiltakshaverne / Kontaktpersonene til endringen
  tiltaksHavere: valgfriListe(kontaktpersonSchema),

  // Bruksenheter til endringen
  bruksenheter: valgfriListe(bruksenhetSchema),
})

export type ByggEndringsDatoer = NonNullable<
  NonNullable<BygningsEndring>["byggDatoEndring"]
>
type TiltaksHavere = NonNullable<NonNullable<BygningsEndring>["tiltaksHavere"]>
export type TiltaksHaver = NonNullable<TiltaksHavere[number]>
type AktuelleEiere = NonNullable<NonNullable<BygningsEndring>["aktuelleEiere"]>
export type AktuellEier = NonNullable<AktuelleEiere[number]>
export type EtasjePlan = NonNullable<BygningsEndring>["etasjePlan"]

export type BygningsEndring = z.infer<typeof byggEndringSchema>

type Bruksenheter = NonNullable<NonNullable<BygningsEndring>["bruksenheter"]>
export type Bruksenhet = NonNullable<Bruksenheter[number]>

type Kulturminner = NonNullable<NonNullable<BygningsEndring>["kulturminner"]>
export type Kulturminne = NonNullable<Kulturminner[number]>
