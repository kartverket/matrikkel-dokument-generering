import { z } from "@hono/zod-openapi"
import { etasjeplanKodeSchema } from "../koder/etasjeplanKode.schema"
import { etasjedataSchema } from "./etasjedata.schema.ts"

export const etasjeRapportInfoSchema = z
  .object({
    etasjeplanKode: etasjeplanKodeSchema.optional().meta({
      description: "Etasjeplan som kode",
    }),
    etasjeplan: z.string().optional().meta({
      description: "Etasjeplan som tekst",
    }),
    etasjenummer: z.number().int().nonnegative().optional(),
    bruttoarealTotalt: z.number().optional(),
    etasjedata: etasjedataSchema.optional(),
    nyEndretSlettet: z.string().optional().meta({
      description: "N=Ny, E=Endret, S=Slettet.",
      example: "N",
    }),
  })
  .meta({
    title: "EtasjeRapportInfo",
    description: "Etasjeinformasjon med felter fra EtasjeRapportInfo-klassen",
  })
  .optional()

export type EtasjePlan = NonNullable<z.infer<typeof etasjeRapportInfoSchema>>
