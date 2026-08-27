import { z } from "@hono/zod-openapi"
import { etasjeplanKodeSchema } from "../koder/etasjeplanKode.schema"
import { nyEndretSlettetEnum } from "../koder/nyEndretSlettetEnum.ts"
import { etasjedataSchema } from "./etasjedata.schema.ts"

export const etasjeRapportInfoSchema = z
  .object({
    etasjeplanKode: etasjeplanKodeSchema.optional().meta({
      description: "Etasjeplan som kode",
    }),
    etasjenummer: z.number().int().nonnegative().optional(),
    bruttoarealTotalt: z.number().optional(),
    etasjedata: etasjedataSchema.optional(),
    nyEndretSlettet: nyEndretSlettetEnum.optional(),
  })
  .meta({
    title: "EtasjeRapportInfo",
    description: "Etasjeinformasjon med felter fra EtasjeRapportInfo-klassen",
  })
  .optional()

export type EtasjePlan = NonNullable<z.infer<typeof etasjeRapportInfoSchema>>
