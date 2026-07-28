import {
  valgfriNummer,
  valgfriObjekt,
  valgfriSchema,
  valgfriString,
} from "../../../core/utils/zodUtils"
import { bruksenhetsKodeSchema } from "../koder/bruksenhetsTypeKode.schema"
import { kjokkenTilgangKodeSchema } from "../koder/kjokkenTilgangKode"

export const bruksenhetSchema = valgfriObjekt({
  bruksenhetsNr: valgfriString.meta({
    description: "Bruksenhetsnummer",
    example: "H0101",
  }),

  bruksenhetsTypeKode: valgfriSchema(bruksenhetsKodeSchema),

  bruksAreal: valgfriNummer.meta({
    description:
      "Bruksarealet til bruksenheten gitt endringen. Oppgis i kvadratmeter. ",
  }),

  antallRom: valgfriNummer,
  antallBad: valgfriNummer,
  antallWC: valgfriNummer,
  kjokkenTilgangKode: valgfriSchema(kjokkenTilgangKodeSchema),
  adresse: valgfriString.meta({
    example: "Postboks 1234 Nydalen 123 OSLO",
    description: "Adressen til bruksenheten gitt endringen.",
  }),

  matrikkelNr: valgfriString.meta({
    title: "Matrikkelnummer",
    example: "5001-12/34/0/2",
    description: "KommuneNr-GårdsNr/BruksNr/Festenr/SeksjonsNr",
  }),
})
