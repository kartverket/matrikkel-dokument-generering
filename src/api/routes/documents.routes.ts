import { createRoute, type OpenAPIHono, z } from "@hono/zod-openapi"
import { renderDocument } from "../../Document.tsx"
import { htmlToPdf } from "../../lib/pdf/gotenberg.ts"
import { getDocumentCss } from "../../lib/pdf/styles.ts"
import type { RapportKode } from "../../lib/schema/core/koder/rapportKode.schema.ts"
import { byggRapportSchema } from "../../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import {
  getPreviewCaseData,
  listPreviewCases,
} from "../../mock/preview-data.ts"
import {
  notImplementedResponseSchema,
  pdfErrorResponseSchema,
  validationErrorResponseSchema,
} from "../openapi/response.schemas.ts"

const outputFormatSchema = z
  .enum(["pdf", "html"])
  .default("pdf")
  .meta({ description: "Output-format for dokumentet.", example: "pdf" })

type OutputFormat = z.infer<typeof outputFormatSchema>

function normalizeRapportKode(value: string) {
  return value.trim().toUpperCase()
}

async function createDocumentResponse({
  rapport,
  format,
}: {
  rapport: z.infer<typeof byggRapportSchema>
  format: OutputFormat
}) {
  const css = await getDocumentCss()
  const { html, headerHtml, footerHtml } = renderDocument(rapport, css)

  if (format === "html") {
    return { body: html, contentType: "text/html" as const }
  }

  const pdf = await htmlToPdf(html, headerHtml, footerHtml)
  return { body: pdf, contentType: "application/pdf" as const }
}

function createDocumentRoute<T extends z.ZodType>({
  rapportKode,
  requestSchema,
  summary,
}: {
  rapportKode: RapportKode
  requestSchema: T
  summary: string
}) {
  return createRoute({
    method: "post",
    path: `/create-document/${rapportKode}`,
    tags: ["Dokument"],
    summary,
    description:
      "Validerer innsendt rapport mot skjemaet for rapportkoden i URL-en. Ved gyldig input renderes dokumentet til HTML og konverteres til PDF. Ved ugyldig input returneres valideringsfeil per felt.",
    operationId: `createDocument${rapportKode}`,
    request: {
      query: z.object({
        format: outputFormatSchema.optional(),
      }),
      body: {
        required: true,
        content: {
          "application/json": { schema: requestSchema },
        },
      },
    },
    responses: {
      200: {
        description: "Dokumentet ble generert.",
        content: {
          "application/pdf": {
            schema: z.string().openapi({ format: "binary" }),
          },
          "text/html": {
            schema: z.string(),
          },
        },
      },
      400: {
        description: "Valideringen av rapporten feilet.",
        content: {
          "application/json": { schema: validationErrorResponseSchema },
        },
      },
      501: {
        description:
          "Rapporten validerte, men dokumentgenerering for rapporttypen er ikke implementert ennå.",
        content: {
          "application/json": { schema: notImplementedResponseSchema },
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
}

const createByggDocumentRoute = createDocumentRoute({
  rapportKode: "BYG0011",
  requestSchema: byggRapportSchema,
  summary: "Generer PDF-rapport for BYG0011",
})

const previewDocumentRoute = createRoute({
  method: "get",
  path: "/preview/{rapportKode}/{testCase}",
  tags: ["Dokument"],
  summary: "Lokal preview av mock-rapport",
  description:
    "Henter mock-data for valgt rapportkode/test-case og returnerer HTML eller PDF via samme dokumentflyt som create-document.",
  operationId: "previewDocument",
  request: {
    params: z.object({
      rapportKode: z.string().meta({ example: "BYG0011" }),
      testCase: z.string().meta({ example: "standard" }),
    }),
    query: z.object({
      format: outputFormatSchema.optional().default("html"),
    }),
  },
  responses: {
    200: {
      description: "Dokument-preview ble generert.",
      content: {
        "application/pdf": {
          schema: z.string().openapi({ format: "binary" }),
        },
        "text/html": {
          schema: z.string(),
        },
      },
    },
    404: {
      description: "Mock test-case ble ikke funnet.",
      content: {
        "application/json": {
          schema: z.object({
            error: z.literal("Mock test-case ikke funnet"),
            details: z.string(),
          }),
        },
      },
    },
    501: {
      description: "Preview er ikke implementert for rapporttypen.",
      content: {
        "application/json": { schema: notImplementedResponseSchema },
      },
    },
    502: {
      description: "Dokumentgenerering feilet.",
      content: {
        "application/json": { schema: pdfErrorResponseSchema },
      },
    },
  },
})

export function registerDocumentRoutes(app: OpenAPIHono) {
  app.openapi(createByggDocumentRoute, async (c) => {
    const data = c.req.valid("json")
    const query = c.req.valid("query")
    const format = query.format ?? "pdf"

    try {
      const result = await createDocumentResponse({ rapport: data, format })
      return c.body(result.body, 200, { "Content-Type": result.contentType })
    } catch (error) {
      const details = error instanceof Error ? error.message : "Ukjent feil"
      return c.json({ error: "PDF-generering feilet", details }, 502)
    }
  })

  app.openapi(previewDocumentRoute, async (c) => {
    const { rapportKode, testCase } = c.req.valid("param")
    const query = c.req.valid("query")
    const format = query.format ?? "html"

    const previewCase = await getPreviewCaseData(testCase)
    if (!previewCase) {
      const availableCases = (await listPreviewCases())
        .map((entry) => entry.testCase)
        .sort((a, b) => a.localeCompare(b, "nb"))
        .join(", ")

      return c.json(
        {
          error: "Mock test-case ikke funnet",
          details: `Fant ingen test-case for ${rapportKode}/${testCase}. Tilgjengelige test-caser: ${availableCases}`,
        },
        404,
      )
    }

    const requestedRapportKode = normalizeRapportKode(rapportKode)
    if (previewCase.report.rapportKode !== requestedRapportKode) {
      return c.json(
        {
          error: "Rapportkode matcher ikke test-case",
          details: `Test-case ${previewCase.testCase} gir ${previewCase.report.rapportKode}, men URL ba om ${requestedRapportKode}`,
        },
        404,
      )
    }

    if (previewCase.report.rapportKode !== "BYG0011") {
      return c.json(
        {
          error: `Rapport ${previewCase.report.rapportKode} er ikke implementert for preview enda`,
        },
        501,
      )
    }

    const parsedPreviewReport = byggRapportSchema.safeParse(previewCase.report)
    if (!parsedPreviewReport.success) {
      return c.json(
        {
          errors: {
            valid: false as const,
            errors: z.flattenError(parsedPreviewReport.error).fieldErrors,
          },
        },
        400,
      )
    }

    try {
      const result = await createDocumentResponse({
        rapport: parsedPreviewReport.data,
        format,
      })

      return c.body(result.body, 200, { "Content-Type": result.contentType })
    } catch (error) {
      const details = error instanceof Error ? error.message : "Ukjent feil"
      return c.json({ error: "PDF-generering feilet", details }, 502)
    }
  })
}
