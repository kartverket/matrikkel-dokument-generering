import { OpenAPIHono, z } from "@hono/zod-openapi"
import { HTTPException } from "hono/http-exception"
import { registerObservability } from "./observability.ts"
import { registerDocumentationRoutes } from "./routes/docs.routes.ts"
import { registerDocumentRoutes } from "./routes/documents.routes.ts"
import { registerHealthRoutes } from "./routes/health.routes.ts"

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

  registerObservability(app)
  registerHealthRoutes(app)
  registerDocumentRoutes(app)
  registerDocumentationRoutes(app)

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
