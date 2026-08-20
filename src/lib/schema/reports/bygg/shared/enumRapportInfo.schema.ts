import { valgfriObjekt, valgfriString } from "../../../core/utils/zodUtils"

// Placeholder until EnumRapportInfo shape is finalized in source system.
export const enumRapportInfoSchema = valgfriObjekt({
  kodeverdi: valgfriString,
  navn: valgfriString,
  id: valgfriString,
}).meta({
  title: "EnumRapportInfo",
  description:
    "Forelopig schema for kodelisteverdier brukt av oppvarmingskoder og energikilder.",
})
