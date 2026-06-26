const port = Number(process.env.PORT) || 3000;

const distDir = "./dist";

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

    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;

    const file = Bun.file(`${distDir}${pathname}`);
    if (await file.exists()) {
      return new Response(file);
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running on http://localhost:${server.port}`);
