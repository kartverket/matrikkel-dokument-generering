const GOTENBERG_URL = process.env.GOTENBERG_URL ?? "http://0.0.0.0:8089"
const GOTENBERG_TIMEOUT_MS = 10_000

const CONVERT_PATH = "/forms/chromium/convert/html"

// Konverterer en ferdig rendret HTML-streng til PDF ved å sende den til
// Gotenberg (Chromium) sitt HTML-konverteringsendepunkt.
// Gotenberg krever at hovedfilen heter `index.html`.

export async function htmlToPdf(html: string): Promise<ArrayBuffer> {
  const form = new FormData()
  form.append("files", new Blob([html], { type: "text/html" }), "index.html")
  form.append("printBackground", "true")

  const response = await fetch(`${GOTENBERG_URL}${CONVERT_PATH}`, {
    method: "POST",
    headers: { accept: "application/pdf" },
    body: form,
    signal: AbortSignal.timeout(GOTENBERG_TIMEOUT_MS),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Gotenberg svarte med ${response.status}: ${details}`)
  }

  return await response.arrayBuffer()
}
