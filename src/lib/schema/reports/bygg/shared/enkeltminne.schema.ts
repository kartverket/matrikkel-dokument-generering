import {
  valgfriObjekt,
  valgfriSchema,
  valgfriString,
} from "../../../core/utils/zodUtils"
import { enkeltminneArtKodeSchema } from "../koder/enkeltminneArtKode.schema"
import { kulturminnekategoriKodeSchema } from "../koder/kulturminnekategoriKode.schema"
import { vernetypeKodeSchema } from "../koder/vernetypeKode.schema"

// ref: bygning_enkeltminne.jrxml
export const enkeltminneSchema = valgfriObjekt({
  enkeltminneNr: valgfriString.meta({
    title: "Enkeltminnenummer",
    example: "86121-1",
    description:
      "Entydig identifikasjon av kulturminnet (enkeltminnet) knyttet til bygningen, fra Riksantikvarens database Askeladden.",
  }),
  enkeltminneArtKode: valgfriSchema(enkeltminneArtKodeSchema),
  vernetypeKode: valgfriSchema(vernetypeKodeSchema),
  kulturminnekategoriKode: valgfriSchema(kulturminnekategoriKodeSchema),
}).meta({
  title: "Enkeltminne",
  description: `Enkeltminne registrert på bygningen i Riksantikvarens database Askeladden.
      "En bygning kan være knyttet til flere enkeltminner.`,
})
