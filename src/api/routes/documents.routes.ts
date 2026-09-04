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
  renderNotFoundPage,
  renderRapportsListPage,
  renderScenariosListPage,
} from "../../pages/previewRenderer.ts"
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

/**
 * Extracts the content between <body> tags from an HTML string.
 * @internal Used to inject header/footer content into preview HTML.
 */
function extractBodyContent(html: string): string {
  const bodyMatch = /<body[^>]*>([\s\S]*)<\/body>/i.exec(html)
  return bodyMatch ? bodyMatch[1] : ""
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
    // For preview: include header and footer in the HTML
    const headerContent = extractBodyContent(headerHtml)
    const bodyContent = extractBodyContent(html)
    const footerContent = extractBodyContent(footerHtml)

    const htmlWithHeaderFooter = `<!DOCTYPE html>
<html lang="${rapport.locale}">
<head>
  <meta charset="utf-8">
  <style>${css}</style>
  <style>
    /* Preview shell styled to resemble a PDF page in a document viewer. */
    html,
    body {
      margin: 0;
      padding: 0;
      background: #eef2f7;
    }

    .preview-canvas {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 2rem 1rem;
      box-sizing: border-box;
    }

    .preview-page {
      width: 210mm;
      max-width: 100%;
      min-height: 297mm;
      background: #fff;
      box-shadow: 0 8px 28px rgba(15, 23, 42, 0.16);
      border: 1px solid #d9e0ea;
      border-radius: 2px;
      box-sizing: border-box;
      padding: 14mm 4mm;
    }

    @media (max-width: 900px) {
      .preview-canvas {
        padding: 0;
      }

      .preview-page {
        width: 100%;
        min-height: 100vh;
        border: none;
        border-radius: 0;
        box-shadow: none;
        padding: 1rem 0.75rem;
      }
    }

    .preview-header {
      margin-bottom: 1rem;
    }
    .preview-footer {
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="preview-canvas">
    <div class="preview-page">
      <div class="preview-header">${headerContent}</div>
      <main>${bodyContent}</main>
      <div class="preview-footer">${footerContent}</div>
    </div>
  </div>
</body>
</html>`

    return { body: htmlWithHeaderFooter, contentType: "text/html" as const }
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

      if (format === "pdf" && result.body instanceof ArrayBuffer) {
        return new Response(result.body, {
          status: 200,
          headers: {
            "Content-Type": result.contentType,
            "Content-Length": result.body.byteLength.toString(),
          },
        })
      }

      return c.body(result.body, 200, { "Content-Type": result.contentType })
    } catch (error) {
      const details = error instanceof Error ? error.message : "Ukjent feil"
      console.error("PDF generation error:", error)
      return c.json({ error: "PDF-generering feilet", details }, 502)
    }
  })

  app.openapi(previewDocumentRoute, async (c) => {
    const { rapportKode, testCase } = c.req.valid("param")
    const query = c.req.valid("query")
    const format = query.format ?? "html"

    const previewCase = await getPreviewCaseData(testCase)
    if (!previewCase) {
      const availableCases = listPreviewCases()
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

      if (format === "pdf" && result.body instanceof ArrayBuffer) {
        return new Response(result.body, {
          status: 200,
          headers: {
            "Content-Type": result.contentType,
            "Content-Length": result.body.byteLength.toString(),
          },
        })
      }

      return c.body(result.body, 200, { "Content-Type": result.contentType })
    } catch (error) {
      const details = error instanceof Error ? error.message : "Ukjent feil"
      console.error("Preview PDF generation error:", error)
      return c.json({ error: "PDF-generering feilet", details }, 502)
    }
  })

  // List all available rapport types
  const listRapportTypesRoute = createRoute({
    method: "get" as const,
    path: "/preview",
    tags: ["Dokument"],
    summary: "List alle tilgjengelige rapporttyper",
    operationId: "listRapportTypes",
    responses: {
      200: {
        description: "Liste over alle rapporttyper",
        content: {
          "text/html": {
            schema: z.string(),
          },
        },
      },
    },
  })

  app.openapi(listRapportTypesRoute, (c) => {
    const host = c.req.header("host") || "localhost:5173"
    const protocol = c.req.header("x-forwarded-proto") || "http"

    const rapportTypes = [
      {
        kode: "BYG0011",
        tittel: "Bygningsrapport",
        beskrivelse: "Detaljert rapport over bygninger og deres karakteristika",
      },
    ]

    const html = renderRapportsListPage(rapportTypes, protocol, host)
    return c.html(html)
  })

  // List scenarios for a specific rapport type
  const listRapportScenariosRoute = createRoute({
    method: "get" as const,
    path: "/preview/{rapportKode}",
    tags: ["Dokument"],
    summary: "List alle tilgjengelige scenarioer for en rapporttype",
    operationId: "listRapportScenarios",
    request: {
      params: z.object({
        rapportKode: z.string(),
      }),
    },
    responses: {
      200: {
        description: "Liste over alle scenarioer for rapporten",
        content: {
          "text/html": {
            schema: z.string(),
          },
        },
      },
    },
  })

  app.openapi(listRapportScenariosRoute, (c) => {
    const { rapportKode } = c.req.param()
    const host = c.req.header("host") || "localhost:5173"
    const protocol = c.req.header("x-forwarded-proto") || "http"

    if (rapportKode !== "BYG0011") {
      const html = renderNotFoundPage(rapportKode, protocol, host)
      return c.html(html, 404)
    }

    const scenarios = listPreviewCases()
    const html = renderScenariosListPage(rapportKode, scenarios, protocol, host)
    return c.html(html)
  })
}
