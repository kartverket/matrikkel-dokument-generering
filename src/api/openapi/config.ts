import type { OpenAPIHono } from "@hono/zod-openapi"

type OpenApiConfig = Parameters<OpenAPIHono["getOpenAPIDocument"]>[0]

export const openApiConfig: OpenApiConfig = {
  openapi: "3.0.3",
  info: {
    title: "Matrikkel Dokument Generering API",
    description: `API for å generere PDF-dokumenter fra matrikkelrapporter. Tjenesten tar imot
en strukturert JSON, renderer den til HTML og konverterer resultatet til PDF via
[Gotenberg](https://github.com/kartverket/pdf-generator).

Følgende rapporter støttes:
- BYG0011 – Byggrapport`,
    version: "1.0.0",
    license: {
      name: "Se LICENCE.md",
      url: "https://github.com/kartverket/matrikkel-dokument-generering/blob/main/LICENCE.md",
    },
  },
  servers: [
    { url: "http://localhost:3000", description: "Lokal utvikling" },
    { url: "http://localhost:8087", description: "Container" },
  ],
  security: [],
  tags: [
    { name: "Dokument", description: "Generering av PDF-dokumenter" },
    { name: "Internal", description: "Helsesjekk-endepunkter" },
  ],
}
