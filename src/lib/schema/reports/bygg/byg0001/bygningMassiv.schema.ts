import { z } from "@hono/zod-openapi"
import {
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
import { endringsKodeSchema } from "../koder/endringsKode.schema.ts"
import { kjokkenTilgangKodeSchema } from "../koder/kjokkenTilgangKode.ts"
import { kontaktPersonKodeSchema } from "../koder/kontaktPersonKode.schema.ts"
import { naringsgruppeKodeSchema } from "../koder/naringsgruppeKode.schema.ts"
import { aktuellEierSchema } from "../shared/aktuellEier.schema.ts"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"
import { enkeltminneSchema } from "../shared/enkeltminne.schema.ts"

// TODO: gjenbruke med BYG0011
// ref: BygningRapportInfo.java
const byggDatoerSchema = valgfriObjekt({
  rammetillatelse: valgfriDato.meta({
    title: "Dato for rammetillatelse",
    description: "Datoen da bygningen fikk rammetillatelse.",
  }),

  igangsettingstillatelse: valgfriDato.meta({
    title: "Dato for igangsettingstillatelse",
    description: "Datoen da bygningen fikk igangsettingstillatelse.",
  }),

  midlertidigBrukstillatelse: valgfriDato.meta({
    title: "Dato for midlertidig brukstillatelse",
    description: "Datoen da bygningen fikk midlertidig brukstillatelse.",
  }),

  ferdigattest: valgfriDato.meta({
    title: "Dato for ferdigattest",
    description: "Datoen da det ble gitt ferdigattest for bygningen.",
  }),

  tattIBruk: valgfriDato.meta({
    title: "Dato tatt i bruk",
    description: "Datoen da bygningen ble registrert som tatt i bruk.",
  }),

  utgaattRevet: valgfriDato.meta({
    title: "Dato utgått eller revet",
    description:
      "Datoen da bygningen ble registrert som utgått, revet eller brent.",
  }),
}).meta({
  title: "Datoer",
  description:
    "Datoene da bygningen nådde ulike statuser i byggesaks- og registreringsforløpet.",
})

// TODO: gjenbruke med BYG0011
// ref: bygning_total_bruksenheter.jrxml
const bruksenhetSchema = valgfriObjekt({
  bruksenhetsNr: valgfriString.meta({
    title: "Bruksenhetsnummer",
    description:
      "Bruksenhetsnummer, sammensatt av etasjeplan, etasjenummer og løpenummer.",
    example: "H0101",
  }),

  matrikkelNr: valgfriString.meta({
    title: "Matrikkelnummer",
    example: "5001-12/34/0/2",
    description:
      "Matrikkelnummeret til matrikkelenheten bruksenheten tilhører. KommuneNr-GårdsNr/BruksNr/Festenr/SeksjonsNr",
  }),

  adresse: valgfriString.meta({
    description: "Adressen bruksenheten tilhører.",
    example: "Storgata 15A, 0155 Oslo",
  }),

  bruksenhetsTypeKode: valgfriSchema(bruksenhetsKodeSchema),

  antallRom: valgfriHeltall.meta({ description: "Antall rom." }),
  antallBad: valgfriHeltall.meta({ description: "Antall bad." }),
  antallWC: valgfriHeltall.meta({ description: "Antall WC." }),

  bruksAreal: valgfriNummer.meta({
    description: "Bruksarealet til bruksenheten. Oppgis i kvadratmeter.",
  }),

  kjokkenTilgangKode: valgfriSchema(kjokkenTilgangKodeSchema),
}).meta({
  title: "Bruksenhet",
  description: "Bruksenhet i bygningen eller bygningsendringen.",
})

// TODO: gjenbruke med BYG0011
// ref: bygning_total_kontaktpersoner.jrxml / bygning_total_tiltakshavere.jrxml
const kontaktpersonSchema = valgfriObjekt({
  kontaktPersonKode: valgfriSchema(kontaktPersonKodeSchema),

  bruksenhetsNr: valgfriString.meta({
    title: "Bruksenhetsnummer",
    example: "H0101",
  }),

  identifikasjonsNr: valgfriString.meta({
    title: "Fødselsdato/org.nr",
    description: "Fødselsdato eller organisasjonsnummer for personen.",
  }),

  navn: valgfriString.meta({
    description:
      "Navnet til kontaktpersonen. Kan være et selskapsnavn eller personnavn",
    example: "Bygg AS",
  }),

  adresse: valgfriString.meta({
    description: "Adressen til kontaktpersonen.",
    example: "Postboks 1350 Vika 113 OSLO",
  }),
}).meta({
  title: "Kontaktperson",
  description:
    "Kontaktperson eller kontaktinstans for bygningen, for eksempel en tiltakshaver.",
})

// TODO gjebruke med BYG0011
// ref: bygning_massiv_bygningsendring.jrxml
const bygningsendringSchema = valgfriObjekt({
  lopeNr: valgfriHeltall.meta({
    title: "Løpenummer",
    description:
      "Løpenummeret til bygningsendringen under bygningsnummeret. Nummeret er unikt per bygning.",
    example: 1,
  }),

  endringsKode: valgfriSchema(endringsKodeSchema),
  bygningsStatusKode: valgfriSchema(byggningsStatusKodeSchema),
  utgaattStatusKode: valgfriSchema(byggningsStatusKodeSchema),
  naringsgruppeKode: valgfriSchema(naringsgruppeKodeSchema),

  datoer: valgfriSchema(byggDatoerSchema),

  antallBoenheter: valgfriHeltall.meta({
    description: "Samlet antall boenheter i bygningsendringen.",
  }),
  bruksareal: valgfriSchema(arealFordelingSchema), // bolig/annet/totalt

  bruksenheter: valgfriListe(bruksenhetSchema),
  kontaktpersoner: valgfriListe(kontaktpersonSchema),
}).meta({
  title: "Bygningsendring",
  description:
    "Registrert endring på bygningen, for eksempel tilbygg eller påbygg.",
})

// ref: bygning_massiv.jrxml / BygningRapportInfo.java
export const bygningMassivSchema = valgfriObjekt({
  bygningsnr: z.string().min(1).meta({
    title: "Bygningsnummer",
    description:
      "En entydig identifikasjon av bygningen som er unik på landsbasis og tildeles automatisk.",
    example: "12 345 678",
  }),

  bygningsStatusKode: valgfriSchema(byggningsStatusKodeSchema),
  utgaattStatusKode: valgfriSchema(byggningsStatusKodeSchema),
  bygningsTypeKode: valgfriSchema(bygningsTypeKodeSchema),
  naringsgruppeKode: valgfriSchema(naringsgruppeKodeSchema),

  nord: valgfriNummer.meta({
    description:
      "Koordinatverdien for nord gitt valgt koordinatSystem (se KoordinatSystemKode for mer beskrivelse)",
    example: 6642100,
  }),
  ost: valgfriNummer.meta({
    description:
      "Koordinatverdien for øst gitt valgt koordinatSystem (se KoordinatSystemKode for mer beskrivelse)",
    example: 597400,
  }),

  datoer: valgfriSchema(byggDatoerSchema),

  antallBoenheter: valgfriHeltall.meta({
    description: "Samlet antall boenheter i bygningen.",
  }),
  bruksareal: valgfriSchema(arealFordelingSchema), // bolig/annet/totalt

  bruksenheter: valgfriListe(bruksenhetSchema),
  bygningsendringer: valgfriListe(bygningsendringSchema),
  aktuelleEiere: valgfriListe(aktuellEierSchema).meta({
    title: "Hjemmelshaver",
    description: "Hjemmelshaver eller aktuell eier for bygningen.",
  }),
  tiltakshavere: valgfriListe(kontaktpersonSchema),
  enkeltminner: valgfriListe(enkeltminneSchema),
}).meta({
  title: "Bygning - Massiv",
  description:
    "Én bygning i massivrapporten, med tilhørende bruksenheter, bygningsendringer, aktører og kulturminner.",
})

export type BygningMassiv = z.infer<typeof bygningMassivSchema>
type MassivBruksenheter = NonNullable<
  NonNullable<BygningMassiv>["bruksenheter"]
>
export type MassivBruksenhet = NonNullable<MassivBruksenheter[number]>
