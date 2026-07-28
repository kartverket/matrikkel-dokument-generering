import { createRoute, type OpenAPIHono, z } from "@hono/zod-openapi"
import type { RenderedDocument } from "../../Document.tsx"
import { htmlToPdf } from "../../lib/pdf/gotenberg.ts"
import { getDocumentCss } from "../../lib/pdf/styles.ts"
import type { RapportKode } from "../../lib/schema/core/koder/rapportKode.schema.ts"
import { reportRegistry } from "../../lib/reports/registry.ts"
import {
  notImplementedResponseSchema,
  pdfErrorResponseSchema,
  validationErrorResponseSchema,
} from "../openapi/response.schemas.ts"

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
      body: {
        required: true,
        content: {
          "application/json": { schema: requestSchema },
        },
      },
    },
    responses: {
      200: {
        description: "PDF-en ble generert.",
        content: {
          "application/pdf": {
            schema: z.string().openapi({ format: "binary" }),
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

export function registerDocumentRoutes(app: OpenAPIHono) {
  for (const [kode, entry] of Object.entries(reportRegistry)) {
    const rapportKode = kode as RapportKode
    const route = createDocumentRoute({
      rapportKode,
      requestSchema: entry.schema,
      summary: entry.summary,
    })

    // Iterasjonen mister per-rapport-typingen; render-funksjonen er trygg
    // fordi input allerede er validert av `entry.schema`.
    const render = entry.render as (
      data: unknown,
      css: string,
    ) => RenderedDocument

    app.openapi(route, async (c) => {
      const data = c.req.valid("json")

      try {
        const css = await getDocumentCss()
        const { html, headerHtml, footerHtml } = render(data, css)
        const pdf = await htmlToPdf(html, headerHtml, footerHtml)
        return c.body(pdf, 200, { "Content-Type": "application/pdf" })
      } catch (error) {
        const details = error instanceof Error ? error.message : "Ukjent feil"
        return c.json({ error: "PDF-generering feilet", details }, 502)
      }
    })
  }
}
