import { prometheus } from "@hono/prometheus"
import { swaggerUI } from "@hono/swagger-ui"
import { OpenAPIHono, z } from "@hono/zod-openapi"
import { HTTPException } from "hono/http-exception"
import { logger } from "hono/logger"
import { renderDocument } from "./Document.tsx"
import { htmlToPdf } from "./lib/pdf/gotenberg.ts"
import { getDocumentCss } from "./lib/pdf/styles.ts"
import { openApiConfig } from "./openapi.ts"
import { createDocumentRoute, isAliveRoute, isReadyRoute } from "./routes.ts"

export function createApp() {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            errors: {
              valid: false as const,
              errors: z.flattenError(result.error).fieldErrors,
            },
          },
          400,
        )
      }
    },
  })

  app.use("*", logger())

  const { printMetrics, registerMetrics } = prometheus({
    collectDefaultMetrics: true,
  })
  app.use("*", registerMetrics)
  app.get("/internal/metrics", async (c) => {
    const response = await printMetrics(c)
    response.headers.set(
      "Content-Type",
      "text/plain; version=0.0.4; charset=utf-8",
    )
    return response
  })

  app.openapi(isAliveRoute, (c) => c.text("OK", 200))
  app.openapi(isReadyRoute, (c) => c.text("OK", 200))

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

  app.doc("/openapi.json", openApiConfig)
  app.get(
    "/docs",
    swaggerUI({
      title: "Matrikkel Dokument Generering API",
      url: "/openapi.json",
    }),
  )

  app.notFound((c) => c.text("Not Found", 404))
  app.onError((error, c) => {
    if (error instanceof HTTPException && error.status === 400) {
      return c.json(
        {
          errors: {
            valid: false as const,
            errors: { body: [error.message] },
          },
        },
        400,
      )
    }

    throw error
  })

  return app
}

export const app = createApp()
