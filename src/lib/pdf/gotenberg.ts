import { config } from "../../config/env.ts"

const CONVERT_PATH = "/forms/chromium/convert/html"

// Konverterer en ferdig rendret HTML-streng til PDF ved å sende den til
// Gotenberg (Chromium) sitt HTML-konverteringsendepunkt.
// Gotenberg krever at hovedfilen heter `index.html`.

export async function htmlToPdf(html: string): Promise<ArrayBuffer> {
  const form = new FormData()
  form.append("files", new Blob([html], { type: "text/html" }), "index.html")
  form.append("printBackground", "true")

  const response = await fetch(`${config.gotenbergUrl}${CONVERT_PATH}`, {
    method: "POST",
    headers: { accept: "application/pdf" },
    body: form,
    signal: AbortSignal.timeout(config.gotenbergTimeoutMs),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Gotenberg svarte med ${response.status}: ${details}`)
  }

  return await response.arrayBuffer()
}
