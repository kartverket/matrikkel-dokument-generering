import { z } from "zod"
import { createDocument } from "zod-openapi"
import { byggRapportSchema } from "./lib/schema/byggRapportSchema"

const validationErrorResponseSchema = z
  .object({
    errors: z.object({
      valid: z.literal(false),
      errors: z.record(z.string(), z.array(z.string())),
    }),
  })
  .meta({
    id: "ValidationErrorResponse",
    description:
      "Returneres når byggrapporten ikke passerer validering. Feilene er gruppert etter feltnavn.",
  })

const pdfErrorResponseSchema = z
  .object({
    error: z.string().meta({ example: "PDF-generering feilet" }),
    details: z.string().meta({ example: "Gotenberg svarte med 500: ..." }),
  })
  .meta({
    id: "PdfErrorResponse",
    description: "Returneres når konvertering til PDF feiler.",
  })

export const openApiDocument = createDocument(
  {
    openapi: "3.0.3",
    info: {
      title: "Matrikkel Dokument Generering API",
      description: `API for å generere PDF-dokumenter fra matrikkelrapporter. Tjenesten tar imot
en strukturert JSON, renderer den til HTML og konverterer resultatet til PDF via
[Gotenberg](https://github.com/kartverket/pdf-generator).

Følgende rapporter støttes:
- BYG0011 – Byggrapport`,
      version: "1.0.0",
      license: {
        name: "Se LICENCE.md",
        url: "https://github.com/kartverket/matrikkel-dokument-generering/blob/main/LICENCE.md",
      },
    },
    servers: [
      { url: "http://localhost:3000", description: "Lokal utvikling" },
      { url: "http://localhost:8087", description: "Container" },
    ],
    security: [],
    tags: [
      { name: "Dokument", description: "Generering av PDF-dokumenter" },
      { name: "Internal", description: "Helsesjekk-endepunkter" },
    ],
    paths: {
      "/create-document": {
        post: {
          tags: ["Dokument"],
          summary: "Generer PDF fra en byggrapport",
          description:
            "Validerer innsendt byggrapport mot skjemaet. Ved gyldig input renderes dokumentet til HTML og konverteres til PDF. Ved ugyldig input returneres valideringsfeil per felt.",
          operationId: "createDocument",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: byggRapportSchema },
            },
          },
          responses: {
            "200": {
              description: "PDF-dokumentet ble generert.",
              content: {
                "application/pdf": {
                  schema: { type: "string", format: "binary" },
                },
              },
            },
            "400": {
              description: "Valideringen av byggrapporten feilet.",
              content: {
                "application/json": { schema: validationErrorResponseSchema },
              },
            },
            "502": {
              description: "PDF-generering via Gotenberg feilet.",
              content: {
                "application/json": { schema: pdfErrorResponseSchema },
              },
            },
          },
        },
      },
      "/internal/isAlive": {
        get: {
          tags: ["Internal"],
          summary: "Liveness-probe",
          description: "Returnerer alltid `OK` når prosessen kjører.",
          operationId: "isAlive",
          responses: {
            "200": {
              description: "Tjenesten kjører.",
              content: {
                "text/plain": { schema: z.literal("OK") },
              },
            },
          },
        },
      },
      "/internal/isReady": {
        get: {
          tags: ["Internal"],
          summary: "Readiness-probe",
          description: "Returnerer alltid `OK` når prosessen er klar.",
          operationId: "isReady",
          responses: {
            "200": {
              description: "Tjenesten er klar.",
              content: {
                "text/plain": { schema: z.literal("OK") },
              },
            },
          },
        },
      },
    },
  },
  {
    override: ({ jsonSchema }) => {
      if (
        jsonSchema.nullable === true &&
        jsonSchema.type === undefined &&
        jsonSchema.allOf !== undefined
      ) {
        jsonSchema.type = "object"
      }
    },
  },
)
