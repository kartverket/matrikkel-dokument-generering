import { describe, expect, spyOn, test } from "bun:test"
import { createApp } from "../../src/api/app.ts"
import { byg0011Schema } from "../../src/lib/schema/reports/bygg/byg0011/byg0011.schema.ts"
import mockByggRapport from "../../src/mock/byggRapport.ts"

const app = createApp()

describe("HTTP API", () => {
  test("accepts the JSON representation documented by OpenAPI", () => {
    const jsonPayload = JSON.parse(JSON.stringify(mockByggRapport))

    expect(byg0011Schema.safeParse(jsonPayload).success).toBe(true)
  })

  test.each([
    ["/internal/isAlive", "Alive"],
    ["/internal/isReady", "Ready"],
  ])("%s returns %s", async (path, expectedBody) => {
    const response = await app.request(path)

    expect(response.status).toBe(200)
    expect(await response.text()).toBe(expectedBody)
  })

  test("validates create-document requests through the route schema", async () => {
    const response = await app.request("/create-document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    })

    expect(response.status).toBe(400)
    expect(response.headers.get("Content-Type")).toContain("application/json")
    expect(await response.json()).toEqual({
      errors: {
        valid: false,
        errors: expect.objectContaining({
          rapportType: expect.any(Array),
          bygninger: expect.any(Array),
        }),
      },
    })
  })

  test("returns the documented error format for malformed JSON", async () => {
    const response = await app.request("/create-document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{",
    })

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      errors: {
        valid: false,
        errors: { body: ["Malformed JSON in request body"] },
      },
    })
  })

  test("serves the generated OpenAPI contract and Swagger UI", async () => {
    const openApiResponse = await app.request("/openapi.json")
    const openApi = await openApiResponse.json()

    expect(openApiResponse.status).toBe(200)
    expect(openApi.openapi).toBe("3.0.3")
    expect(openApi.paths["/create-document"].post).toBeDefined()
    expect(openApi.components.schemas.ValidationErrorResponse).toBeDefined()
    expect(openApi.components.schemas.PdfErrorResponse).toBeDefined()
    expect(openApi.servers).toEqual([
      { url: "/", description: "Gjeldende miljø" },
    ])

    const invalidNullableSchemas: string[] = []
    const visitSchema = (value: unknown, path = "$") => {
      if (!value || typeof value !== "object") return

      const schema = value as Record<string, unknown>
      if (schema.nullable === true && schema.type === undefined) {
        invalidNullableSchemas.push(path)
      }

      for (const [key, child] of Object.entries(schema)) {
        visitSchema(child, `${path}.${key}`)
      }
    }

    visitSchema(openApi)
    expect(invalidNullableSchemas).toEqual([])

    const docsResponse = await app.request("/docs")
    expect(docsResponse.status).toBe(200)
    expect(await docsResponse.text()).toContain("SwaggerUIBundle")
  })

  test("exposes Prometheus request and runtime metrics", async () => {
    await app.request("/internal/isAlive")
    const response = await app.request("/internal/metrics")
    const metrics = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; version=0.0.4; charset=utf-8",
    )
    expect(metrics).toContain("http_requests_total")
    expect(metrics).toContain("process_cpu_user_seconds_total")
  })

  test("keeps the existing plain-text 404 response", async () => {
    const response = await app.request("/does-not-exist")

    expect(response.status).toBe(404)
    expect(await response.text()).toBe("Not Found")
  })

  test("returns a generic response for unexpected errors", async () => {
    const errorApp = createApp()
    const error = new Error("Sensitive internal details")
    const errorLog = spyOn(console, "error").mockImplementation(() => {})
    errorApp.get("/throws", () => {
      throw error
    })

    try {
      const response = await errorApp.request("/throws")
      const body = await response.text()

      expect(response.status).toBe(500)
      expect(response.headers.get("Content-Type")).toContain("text/plain")
      expect(body).toBe("Internal Server Error")
      expect(body).not.toContain(error.message)
      expect(errorLog).toHaveBeenCalledWith("Unhandled request error", error)
    } finally {
      errorLog.mockRestore()
    }
  })
})
