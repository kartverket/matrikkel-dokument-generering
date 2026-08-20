import {
  valgfriDato,
  valgfriObjekt,
  valgfriSchema,
} from "../../../core/utils/zodUtils"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema"

// Placeholder until BygningstatusHistorikkRapportInfo is fully specified.
export const bygningstatusHistorikkRapportInfoSchema = valgfriObjekt({
  bygningsstatusKode: valgfriSchema(byggningsStatusKodeSchema),
  dato: valgfriDato,
  registrertDato: valgfriDato,
}).meta({
  title: "BygningstatusHistorikkRapportInfo",
  description: "Forelopig schema for historiske bygningsstatusoppforinger.",
})
