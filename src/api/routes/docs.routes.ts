import { swaggerUI } from "@hono/swagger-ui"
import type { OpenAPIHono } from "@hono/zod-openapi"
import { openApiConfig } from "../openapi/config.ts"

export function registerDocumentationRoutes(app: OpenAPIHono) {
  app.doc("/openapi.json", openApiConfig)
  app.get(
    "/docs",
    swaggerUI({
      title: "Matrikkel Dokument Generering API",
      url: "/openapi.json",
    }),
  )
}
