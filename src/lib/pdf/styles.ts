const PREBUILT_CSS_PATH = "./dist/document-styles.css"
const CSS_ENTRYPOINT = "./src/document.css"

let cssPromise: Promise<string> | null = null

async function buildCss(): Promise<string> {
  const prebuilt = Bun.file(PREBUILT_CSS_PATH)
  if (await prebuilt.exists()) {
    return prebuilt.text()
  }

  const result = await Bun.build({
    entrypoints: [CSS_ENTRYPOINT],
    minify: true,
  })

  if (!result.success || result.outputs.length === 0) {
    const details = result.logs.map((log) => String(log)).join("\n")
    throw new Error(`Klarte ikke å bygge dokument-CSS:\n${details}`)
  }

  return result.outputs[0].text()
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
