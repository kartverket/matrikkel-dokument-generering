import {
  valgfriObjekt,
  valgfriSchema,
  valgfriString,
} from "../../../core/utils/zodUtils"
import { kontaktPersonKodeSchema } from "../koder/kontaktPersonKode.schema"

export const kontaktpersonSchema = valgfriObjekt({
  bruksenhetsNr: valgfriString.meta({
    title: "Bruksenhetsnummer",
    example: "H0101",
  }),

  // Rollekoden til tiltakshaveren (T: Tiltakshaver, K: Kontaktperson)
  kontaktPersonKode: valgfriSchema(kontaktPersonKodeSchema),

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
  description: "Tiltakshaveren eller kontaktperson opp mot et bygg",
})
