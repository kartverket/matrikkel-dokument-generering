import { createRoute, type OpenAPIHono, z } from "@hono/zod-openapi"

function healthResponse(status: "Alive" | "Ready") {
  return {
    200: {
      description: "Tjenesten svarer.",
      content: {
        "text/plain": { schema: z.literal(status) },
      },
    },
  } as const
}

const isAliveRoute = createRoute({
  method: "get",
  path: "/internal/isAlive",
  tags: ["Internal"],
  summary: "Liveness-probe",
  description: "Returnerer alltid `Alive` når prosessen kjører.",
  operationId: "isAlive",
  responses: healthResponse("Alive"),
})

const isReadyRoute = createRoute({
  method: "get",
  path: "/internal/isReady",
  tags: ["Internal"],
  summary: "Readiness-probe",
  description: "Returnerer alltid `Ready` når prosessen er klar.",
  operationId: "isReady",
  responses: healthResponse("Ready"),
})

export function registerHealthRoutes(app: OpenAPIHono) {
  app.openapi(isAliveRoute, (c) => c.text("Alive", 200))
  app.openapi(isReadyRoute, (c) => c.text("Ready", 200))
}
