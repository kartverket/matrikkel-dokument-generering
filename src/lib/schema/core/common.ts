import { z } from "@hono/zod-openapi"

export const valgfriNummer = z.number().optional()
export const valgfriHeltall = z.number().int().nonnegative().optional()
export const valgfriBool = z.boolean().optional()
export const valgfriString = z.string().optional()

export const valgfriDato = z.iso
  .datetime({ offset: true })
  .optional()
  .meta({ example: "2023-01-01T00:00:00Z" })

export const valgfriObjekt = <T extends z.ZodRawShape>(shape: T) =>
  z.object(shape).optional()
