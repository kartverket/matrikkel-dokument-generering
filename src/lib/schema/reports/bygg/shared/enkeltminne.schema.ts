import { z } from "@hono/zod-openapi"
import { kodeSchemaOgTekst } from "../../../core/utils/zodUtils.ts"
import { enkeltminneArtKodeSchema } from "../koder/enkeltminneArtKode.schema"
import { kulturminnekategoriKodeSchema } from "../koder/kulturminnekategoriKode.schema"
import { vernetypeKodeSchema } from "../koder/vernetypeKode.schema"

// ref: bygning_enkeltminne.jrxml
export const enkeltminneSchema = z
  .object({
    enkeltminneNummer: z.string().optional().meta({
      title: "Enkeltminnenummer",
      example: "86121-1",
      description:
        "Entydig identifikasjon av kulturminnet (enkeltminnet) knyttet til bygningen, fra Riksantikvarens database Askeladden.",
    }),
    enkeltminneArtKode: kodeSchemaOgTekst(enkeltminneArtKodeSchema),
    vernetypeKode: kodeSchemaOgTekst(vernetypeKodeSchema),
    kulturminnekategoriKode: kodeSchemaOgTekst(kulturminnekategoriKodeSchema),
  })
  .meta({
    title: "Enkeltminne",
    description: `Enkeltminne registrert på bygningen i Riksantikvarens database Askeladden.
      "En bygning kan være knyttet til flere enkeltminner.`,
  })

export type Kulturminne = z.infer<typeof enkeltminneSchema>
