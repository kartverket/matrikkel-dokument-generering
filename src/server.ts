import { renderDocument} from "./Document.tsx";

const port = Number(process.env.PORT) || 3000;

const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);

    if (
      url.pathname === "/internal/isAlive" ||
      url.pathname === "/internal/isReady"
    ) {
      return new Response("OK");
    }

    if (url.pathname === "/render" && req.method === "POST") {
      const data = await req.json();
      const html = renderDocument(data);

      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running on http://localhost:${server.port}`);