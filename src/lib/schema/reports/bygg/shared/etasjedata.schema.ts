import {
  valgfriHeltall,
  valgfriNummer,
  valgfriObjekt,
} from "../../../core/utils/zodUtils"

export const etasjedataSchema = valgfriObjekt({
  bruksarealTilAnnet: valgfriNummer,
  bruttoarealTilAnnet: valgfriNummer,
  alternativtAreal: valgfriNummer,
  alternativtAreal2: valgfriNummer,
  bruksarealTotalt: valgfriNummer,
  bruttoarealTotalt: valgfriNummer,
  bruksarealTilBolig: valgfriNummer,
  bruttoarealTilBolig: valgfriNummer,
  antallBoenheter: valgfriHeltall,
}).meta({
  title: "Etasjedata",
  description:
    "Aggregert areal- og boenhetsinformasjon pa bygning. Feltlisten kan utvides ved behov.",
})
