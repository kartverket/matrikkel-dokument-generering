import { z } from "@hono/zod-openapi"
import { kodeSchemaOgTekst } from "../../../core/utils/zodUtils.ts"
import { kontaktPersonKodeSchema } from "../koder/kontaktPersonKode.schema"
import { nyEndretSlettetEnum } from "../koder/nyEndretSlettetEnum.ts"
import { personInfoSupportBaseSchema } from "./personInfoSupport.schema.ts"

export const kontaktpersonSchema = personInfoSupportBaseSchema
  .extend({
    datofra: z.iso.datetime({ offset: true }).optional(),
    nyEndretSlettet: nyEndretSlettetEnum.optional(),

    kontaktpersonKode: kodeSchemaOgTekst(kontaktPersonKodeSchema),
    datofraSOSI: z.string().optional().meta({
      description: "Kontaktpersonens fra-dato som tekst (sosi)",
    }),
  })
  .meta({
    title: "KontaktpersonRapportInfo",
    description:
      "Kontaktperson med personinformasjon, inkludert felter fra klasse og getter-basert presentasjon.",
  })
  .optional()

export type Kontaktperson = NonNullable<z.infer<typeof kontaktpersonSchema>>
