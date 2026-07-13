import { createRoute, type OpenAPIHono, z } from "@hono/zod-openapi"

const healthResponse = {
  200: {
    description: "Tjenesten svarer.",
    content: {
      "text/plain": { schema: z.literal("OK") },
    },
  },
} as const

const isAliveRoute = createRoute({
  method: "get",
  path: "/internal/isAlive",
  tags: ["Internal"],
  summary: "Liveness-probe",
  description: "Returnerer alltid `OK` når prosessen kjører.",
  operationId: "isAlive",
  responses: healthResponse,
})

const isReadyRoute = createRoute({
  method: "get",
  path: "/internal/isReady",
  tags: ["Internal"],
  summary: "Readiness-probe",
  description: "Returnerer alltid `OK` når prosessen er klar.",
  operationId: "isReady",
  responses: healthResponse,
})

export function registerHealthRoutes(app: OpenAPIHono) {
  app.openapi(isAliveRoute, (c) => c.text("OK", 200))
  app.openapi(isReadyRoute, (c) => c.text("OK", 200))
}
