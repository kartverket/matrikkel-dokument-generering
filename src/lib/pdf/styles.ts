const PREBUILT_CSS_PATH = "./dist/document-styles.css"
const CSS_ENTRYPOINT = "./src/document.css"

let cssPromise: Promise<string> | null = null

async function buildCss(): Promise<string> {
  const prebuilt = Bun.file(PREBUILT_CSS_PATH)
  if (await prebuilt.exists()) {
    return prebuilt.text()
  }

  const proc = Bun.spawn(
    ["bunx", "@tailwindcss/cli", "-i", CSS_ENTRYPOINT, "-o", "-", "--minify"],
    { stdout: "pipe", stderr: "pipe" },
  )

  const [css, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])

  if (exitCode !== 0 || css.length === 0) {
    throw new Error(`Klarte ikke å bygge dokument-CSS:\n${stderr}`)
  }

  return css
}

export function getDocumentCss(): Promise<string> {
  if (!cssPromise) {
    cssPromise = buildCss().catch((error) => {
      cssPromise = null
      throw error
    })
  }
  return cssPromise
}
