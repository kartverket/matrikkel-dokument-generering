import {
  valgfriBool,
  valgfriNummer,
  valgfriObjekt,
} from "../../../core/utils/zodUtils"

// Placeholder until the full Representasjonspunkt contract is finalized.
export const representasjonspunktSchema = valgfriObjekt({
  nord: valgfriNummer,
  ost: valgfriNummer,
  stedfestingVerifisert: valgfriBool,
}).meta({
  title: "Representasjonspunkt",
  description: "Forelopig schema for bygningens representasjonspunkt.",
})
