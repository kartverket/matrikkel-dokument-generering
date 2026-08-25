import { z } from "@hono/zod-openapi"
import { etasjeplanKodeSchema } from "../koder/etasjeplanKode.schema"

export const etasjeRapportInfoSchema = z
  .object({
    etasjeplanKode: etasjeplanKodeSchema.optional().meta({
        description: "Etasjeplan som kode"
    }),
    etasjeplan: z.string().optional().meta({
        description: "Etasjeplan som tekst"
    }),
    etasjenummer: z.number().int().nonnegative().optional(),
    antallBoenheter: z.number().int().nonnegative().optional(),
    bruksarealTilBolig: z.number().optional(),
    bruksarealTilAnnet: z.number().optional(),
    bruksarealTotalt: z.number().optional(),
    alternativtAreal: z.number().optional(),
    alternativtAreal2: z.number().optional(),
    bruttoarealTilBolig: z.number().optional(),
    bruttoarealTilAnnet: z.number().optional(),
    bruttoarealTotalt: z.number().optional(),
    etasjeIdentString: z.string().optional(),
    nyEndretSlettet: z.string().optional().meta({
      description: "N=Ny, E=Endret, S=Slettet.",
      example: "N",
    }),


  })
  .meta({
    title: "EtasjeRapportInfo",
    description:
      "Etasjeinformasjon med felter fra EtasjeRapportInfo-klassen",
  })
  .optional()

export type EtasjePlan = NonNullable<z.infer<typeof etasjeRapportInfoSchema>>