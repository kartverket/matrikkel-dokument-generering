import { createRoute, type OpenAPIHono, z } from "@hono/zod-openapi"
import { renderDocument } from "../../Document.tsx"
import { htmlToPdf } from "../../lib/pdf/gotenberg.ts"
import { getDocumentCss } from "../../lib/pdf/styles.ts"
import { byg0011Schema } from "../../lib/schema/reports/bygg/byg0011.schema.ts"
import {
  pdfErrorResponseSchema,
  validationErrorResponseSchema,
} from "../openapi/response.schemas.ts"

const createDocumentRoute = createRoute({
  method: "post",
  path: "/create-document",
  tags: ["Dokument"],
  summary: "Generer PDF fra en Matrikkelen-rapport",
  description:
    "Validerer innsendt rapport mot skjemaet for valgt rapportType. Ved gyldig input renderes dokumentet til HTML og konverteres til PDF. Ved ugyldig input returneres valideringsfeil per felt.",
  operationId: "createDocument",
  request: {
    body: {
      required: true,
      content: {
        "application/json": { schema: byg0011Schema },
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
    502: {
      description: "PDF-generering via Gotenberg feilet.",
      content: {
        "application/json": { schema: pdfErrorResponseSchema },
      },
    },
  },
})

export function registerDocumentRoutes(app: OpenAPIHono) {
  app.openapi(createDocumentRoute, async (c) => {
    const data = c.req.valid("json")

    try {
      const css = await getDocumentCss()
      const html = renderDocument(data, css)
      const pdf = await htmlToPdf(html)
      return c.body(pdf, 200, { "Content-Type": "application/pdf" })
    } catch (error) {
      const details = error instanceof Error ? error.message : "Ukjent feil"
      return c.json({ error: "PDF-generering feilet", details }, 502)
    }
  })
}
