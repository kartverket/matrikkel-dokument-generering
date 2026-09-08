import { OpenAPIHono } from "@hono/zod-openapi"
import { HTTPException } from "hono/http-exception"
import { createLogger, createStructuredHonoLogger } from "./logger.ts"
import { registerObservability } from "./observability.ts"
import { registerDocumentationRoutes } from "./routes/docs.routes.ts"
import { registerDocumentRoutes } from "./routes/documents.routes.ts"
import { registerHealthRoutes } from "./routes/health.routes.ts"
import { createValidationErrors } from "./validation.ts"

export const logger = createLogger()

export function createApp() {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      if (!result.success) {
        const errors = createValidationErrors(result.error.issues)
        c.set("validationIssuesKeys", Object.keys(errors))

        return c.json(
          {
            errors: {
              valid: false as const,
              errors,
            },
          },
          400,
        )
      }
    },
  })

  app.use(createStructuredHonoLogger(logger, `/internal/`))

  registerObservability(app)
  registerHealthRoutes(app)
  registerDocumentRoutes(app)
  registerDocumentationRoutes(app)

  app.notFound((c) => c.text("Not Found", 404))
  app.onError((error, c) => {
    // Logging skjer allerede strukturert av `createStructuredHonoLogger`s
    // onError-hook (se logger.ts), basert på `c.error` som Hono setter her.
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

    return c.text("Internal Server Error", 500)
  })

  return app
}

export const app = createApp()
