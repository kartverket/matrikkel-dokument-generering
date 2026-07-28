import { valgfriDato, valgfriObjekt } from "../../../core/utils/zodUtils"

export const byggDatoSchema = valgfriObjekt({
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
    description: "Datoen da bygningsendringen ble registrert som tatt i bruk.",
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
})
