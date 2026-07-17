import { z } from "@hono/zod-openapi"

export const tekstSchema = z.string().min(1)
export const valgfriTekstSchema = tekstSchema.nullable().optional()
export const heltallSchema = z.number().int().nonnegative()
export const arealSchema = z.number().nonnegative()
export const datoSchema = z.iso.date()
export const valgfriDatoSchema = datoSchema.nullable()

export const koordinatSchema = z
  .object({
    nord: z.number(),
    ost: z.number(),
  })
  .meta({ id: "Koordinat" })

export const bygningstypeSchema = z
  .object({
    kode: heltallSchema,
    navn: tekstSchema,
  })
  .meta({ id: "Bygningstype" })

export const matrikkelenhetSchema = z
  .object({
    gnr: heltallSchema,
    bnr: heltallSchema,
    fnr: heltallSchema.nullable(),
    snr: heltallSchema.nullable(),
  })
  .meta({ id: "Matrikkelenhet" })
