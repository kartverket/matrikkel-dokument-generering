import { renderDocument } from "./Document.tsx"
import { htmlToPdf } from "./lib/pdf/gotenberg.ts"
import { validateByggRapport } from "./lib/validators.ts"

const port = Number(process.env.PORT) || 3000

const jsonHeaders = { "Content-Type": "application/json; charset=utf-8" }

const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url)

    if (
      url.pathname === "/internal/isAlive" ||
      url.pathname === "/internal/isReady"
    ) {
      return new Response("OK")
    }

    if (url.pathname === "/create-document" && req.method === "POST") {
      const data = await req.json()

      const validatedData = validateByggRapport(data)
      if (!validatedData.valid) {
        return new Response(JSON.stringify({ errors: validatedData }), {
          status: 400,
          headers: jsonHeaders,
        })
      }

      const html = renderDocument(validatedData.data)

      try {
        const pdf = await htmlToPdf(html)
        return new Response(pdf, {
          status: 200,
          headers: { "Content-Type": "application/pdf" },
        })
      } catch (error) {
        const details = error instanceof Error ? error.message : "Ukjent feil"
        return new Response(
          JSON.stringify({ error: "PDF-generering feilet", details }),
          { status: 502, headers: jsonHeaders },
        )
      }
    }

    return new Response("Not Found", { status: 404 })
  },
})

console.log(`Server running on http://localhost:${server.port}`)
