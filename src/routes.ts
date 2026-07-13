import { createRoute, z } from "@hono/zod-openapi"
import { byggRapportSchema } from "./lib/schema/byggRapportSchema.ts"

export const validationErrorResponseSchema = z
  .object({
    errors: z.object({
      valid: z.literal(false),
      errors: z.record(z.string(), z.array(z.string())),
    }),
  })
  .openapi("ValidationErrorResponse", {
    description:
      "Returneres når byggrapporten ikke passerer validering. Feilene er gruppert etter feltnavn.",
  })

const pdfErrorResponseSchema = z
  .object({
    error: z.string().openapi({ example: "PDF-generering feilet" }),
    details: z.string().openapi({ example: "Gotenberg svarte med 500: ..." }),
  })
  .openapi("PdfErrorResponse", {
    description: "Returneres når konvertering til PDF feiler.",
  })

export const createDocumentRoute = createRoute({
  method: "post",
  path: "/create-document",
  tags: ["Dokument"],
  summary: "Generer PDF fra en byggrapport",
  description:
    "Validerer innsendt byggrapport mot skjemaet. Ved gyldig input renderes dokumentet til HTML og konverteres til PDF. Ved ugyldig input returneres valideringsfeil per felt.",
  operationId: "createDocument",
  request: {
    body: {
      required: true,
      content: {
        "application/json": { schema: byggRapportSchema },
      },
    },
  },
  responses: {
    200: {
      description: "PDF-dokumentet ble generert.",
      content: {
        "application/pdf": {
          schema: z.string().openapi({ format: "binary" }),
        },
      },
    },
    400: {
      description: "Valideringen av byggrapporten feilet.",
      content: {
        "application/json": { schema: validationErrorResponseSchema },
      },
    },
    502: {
      description: "PDF-generering via Gotenberg feilet.",
      content: {
        "application/json": { schema: pdfErrorResponseSchema },
      },
    },
  },
})

const healthResponse = {
  200: {
    description: "Tjenesten svarer.",
    content: {
      "text/plain": { schema: z.literal("OK") },
    },
  },
} as const

export const isAliveRoute = createRoute({
  method: "get",
  path: "/internal/isAlive",
  tags: ["Internal"],
  summary: "Liveness-probe",
  description: "Returnerer alltid `OK` når prosessen kjører.",
  operationId: "isAlive",
  responses: healthResponse,
})

export const isReadyRoute = createRoute({
  method: "get",
  path: "/internal/isReady",
  tags: ["Internal"],
  summary: "Readiness-probe",
  description: "Returnerer alltid `OK` når prosessen er klar.",
  operationId: "isReady",
  responses: healthResponse,
})
