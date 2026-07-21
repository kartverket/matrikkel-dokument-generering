import type { z } from "@hono/zod-openapi"
import type { arealFordelingSchema } from "./schema/reports/bygg/shared/arealFordeling.schema"

export type ArealFordeling = z.infer<typeof arealFordelingSchema>

export type ArealOgBoenhet = ArealFordeling & {
  key: number // Etasje eller Løpenummer
  keyValue: string // Etasje eller Løpenummer
  antallBoenheter: number
}
