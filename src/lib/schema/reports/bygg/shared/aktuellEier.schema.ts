import {
  valgfriBool,
  valgfriObjekt,
  valgfriSchema,
  valgfriString,
} from "../../../core/utils/zodUtils"
import { eierforholdKodeSchema } from "../koder/eierforholdKode.schema"

export const aktuellEierSchema = valgfriObjekt({
  bruksenhetsNr: valgfriString.meta({
    title: "Bruksenhetsnummer",
    example: "H0101",
  }),
  eierforholdKode: valgfriSchema(eierforholdKodeSchema),

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
})
