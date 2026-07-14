const PREBUILT_CSS_PATH = "./dist/document-styles.css"
const CSS_ENTRYPOINT = "./src/index.css"

let cssPromise: Promise<string> | null = null

async function buildCssFromSource(): Promise<string> {
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

async function getPrebuiltCss(): Promise<string> {
  const prebuilt = Bun.file(PREBUILT_CSS_PATH)
  if (!(await prebuilt.exists())) {
    throw new Error(`Fant ikke ferdigbygd dokument-CSS: ${PREBUILT_CSS_PATH}`)
  }

  return prebuilt.text()
}

export async function getDocumentCss(): Promise<string> {
  if (await Bun.file(CSS_ENTRYPOINT).exists()) {
    return buildCssFromSource()
  }

  if (!cssPromise) {
    cssPromise = getPrebuiltCss().catch((error) => {
      cssPromise = null
      throw error
    })
  }
  return cssPromise
}
