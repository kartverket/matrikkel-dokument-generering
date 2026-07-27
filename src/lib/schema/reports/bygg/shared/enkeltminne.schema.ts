import { valgfriObjekt, valgfriString } from "../../../core/utils/zodUtils"

// ref: bygning_enkeltminne.jrxml
export const enkeltminneSchema = valgfriObjekt({
  enkeltminneNr: valgfriString.meta({
    title: "Enkeltminnenummer",
    description:
      "Kulturminnets identifikasjon i Riksantikvarens database Askeladden.",
    example: "86155-1",
  }),

  enkeltminneArt: valgfriString.meta({
    title: "Enkeltminneart",
    description: "Arten til enkeltminnet, for eksempel bolig eller uthus.",
    example: "Bolig",
  }),

  kulturminneKategoriKode: valgfriString.meta({
    title: "Kulturminnekategori",
    description: "Kodeverdien for kulturminnekategorien.",
  }),

  vernetypeKode: valgfriString.meta({
    // TODO: sette opp enum liste og oversettelser
    title: "Vernetype",
    description:
      "Kodeverdien for vernetypen, for eksempel automatisk fredet eller vedtaksfredet.",
  }),
}).meta({
  title: "Enkeltminne",
  description:
    "Kulturminne registrert på bygningen i Riksantikvarens database Askeladden.",
})
