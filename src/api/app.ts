import { OpenAPIHono } from "@hono/zod-openapi"
import { registerObservability } from "./observability.ts"
import { registerDocumentationRoutes } from "./routes/docs.routes.ts"
import { registerDocumentRoutes } from "./routes/documents.routes.ts"
import { registerHealthRoutes } from "./routes/health.routes.ts"
import { createLogger, createStructuredHonoLogger } from "./logger.ts"

export const logger = createLogger();

export function createApp() {
  const app = new OpenAPIHono()

  app.use(createStructuredHonoLogger(logger, `/internal/`));

  registerObservability(app)
  registerHealthRoutes(app)
  registerDocumentRoutes(app)
  registerDocumentationRoutes(app)

  app.notFound((c) => c.text("Not Found", 404));

  return app
}

export const app = createApp()
