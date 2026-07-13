import { describe, expect, test } from "bun:test"
import { createApp } from "../../src/api/app.ts"

const app = createApp()

describe("HTTP API", () => {
  test.each([
    "/internal/isAlive",
    "/internal/isReady",
  ])("%s returns OK", async (path) => {
    const response = await app.request(path)

    expect(response.status).toBe(200)
    expect(await response.text()).toBe("OK")
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
})
