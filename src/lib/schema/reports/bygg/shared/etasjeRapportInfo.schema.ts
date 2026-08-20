import {
  valgfriHeltall,
  valgfriObjekt,
  valgfriSchema,
} from "../../../core/utils/zodUtils"
import { etasjeplanKodeSchema } from "../koder/etasjeplanKode.schema"
import { arealFordelingSchema } from "./arealFordeling.schema"

// Placeholder until EtasjeRapportInfo fields are fully documented.
export const etasjeRapportInfoSchema = valgfriObjekt({
  etasjeplanKode: valgfriSchema(etasjeplanKodeSchema),
  etasje: valgfriHeltall,
  antallBoenheter: valgfriHeltall,
  bruksareal: valgfriSchema(arealFordelingSchema),
  bruttoareal: valgfriSchema(arealFordelingSchema),
}).meta({
  title: "EtasjeRapportInfo",
  description: "Forelopig schema for etasjeniva i BygningRapportInfo.",
})
