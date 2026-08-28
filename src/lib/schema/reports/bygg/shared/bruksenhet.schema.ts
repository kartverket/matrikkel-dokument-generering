import { z } from "@hono/zod-openapi"
import { kodeSchemaOgTekst } from "../../../core/utils/zodUtils.ts"
import { bruksenhetsKodeSchema } from "../koder/bruksenhetsTypeKode.schema"
import { etasjeplanKodeSchema } from "../koder/etasjeplanKode.schema"
import { kjokkenTilgangKodeSchema } from "../koder/kjokkenTilgangKode"
import { nyEndretSlettetEnum } from "../koder/nyEndretSlettetEnum.ts"
import { adresseIdentRapportInfoSchema } from "./adresseIdentRapportInfo.schema"
import { enumRapportInfoSchema } from "./enumRapportInfo.schema"
import { matrikkelnrRapportInfoSchema } from "./matrikkelnrRapportInfo.schema"

export const bruksenhetSchema = z
  .object({
    bruksenhetsnummer: z.string().optional().meta({
      description: "Bruksenhetsnummer",
      example: "H0101",
    }),

    bruksenhetsTypeKode: kodeSchemaOgTekst(bruksenhetsKodeSchema),

    etasjeplanKode: kodeSchemaOgTekst(etasjeplanKodeSchema),

    bruksareal: z.number().optional().meta({
      description:
        "Bruksarealet til bruksenheten gitt endringen. Oppgis i kvadratmeter. ",
    }),

    antallRom: z.number().int().nonnegative().optional(),
    antallBad: z.number().int().nonnegative().optional(),
    antallWC: z.number().int().nonnegative().optional(),
    etasjenummer: z.string().optional(),
    lopenummer: z.string().optional(),

    kjokkentilgang: kodeSchemaOgTekst(kjokkenTilgangKodeSchema),

    matrikkelnrRapportInfo: matrikkelnrRapportInfoSchema.optional(),
    adresseIdentRapportInfo: adresseIdentRapportInfoSchema.optional(),
    kostraFunksjonKode: enumRapportInfoSchema.optional(),
    kostraLeieareal: z.string().optional(),
    kostraVirksomhetNummer: z.string().optional(),
    kostraVirksomhetNavn: z.string().optional(),
    nyEndretSlettet: nyEndretSlettetEnum.optional(),
  })

export type Bruksenhet = NonNullable<z.infer<typeof bruksenhetSchema>>
