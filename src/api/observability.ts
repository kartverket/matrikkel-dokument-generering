import { prometheus } from "@hono/prometheus"
import type { OpenAPIHono } from "@hono/zod-openapi"

export function registerObservability(app: OpenAPIHono) {
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
}
