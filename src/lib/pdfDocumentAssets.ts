import { existsSync, readFileSync } from "node:fs"
import postcss from "postcss"
import postcssCalc from "postcss-calc"
import postcssCustomProperties from "postcss-custom-properties"
import postcssPresetEnv from "postcss-preset-env"

type PdfDocumentAssets = {
    css: string
    stylesheetLinks: string
}

const stylesheetLinkPattern = /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi

const pdfCssProcessor = postcss([
    postcssPresetEnv({
        browsers: "chrome 49",
        preserve: false,
        stage: 0,
    }),
    postcssCustomProperties({ preserve: false }),
    postcssCalc({}),
])

let cachedPdfDocumentAssets: Promise<PdfDocumentAssets> | null = null

function isRemoteStylesheet(href: string): boolean {
    return href.startsWith("http://") || href.startsWith("https://")
}

async function transformPdfCss(css: string): Promise<string> {
    const result = await pdfCssProcessor.process(css, { from: undefined })
    return result.css
}

async function buildPdfDocumentAssets(): Promise<PdfDocumentAssets> {
    const distDirectory = new URL("../../dist/", import.meta.url)
    const distIndex = new URL("index.html", distDirectory)

    if (!existsSync(distIndex)) {
        return { css: "", stylesheetLinks: "" }
    }

    const indexHtml = readFileSync(distIndex, "utf8")
    const localStylesheets: string[] = []
    const stylesheetLinks: string[] = []

    for (const match of indexHtml.matchAll(stylesheetLinkPattern)) {
        const [tag, href] = match

        if (isRemoteStylesheet(href)) {
            stylesheetLinks.push(tag)
            continue
        }

        const relativeHref = href.startsWith("/") ? href.slice(1) : href
        const stylesheetUrl = new URL(relativeHref, distDirectory)

        if (existsSync(stylesheetUrl)) {
            localStylesheets.push(readFileSync(stylesheetUrl, "utf8"))
        }
    }

    return {
        css: await transformPdfCss(localStylesheets.join("\n")),
        stylesheetLinks: stylesheetLinks.join("\n"),
    }
}

export async function loadPdfDocumentAssets(): Promise<PdfDocumentAssets> {
    if (!cachedPdfDocumentAssets) {
        cachedPdfDocumentAssets = buildPdfDocumentAssets().catch((error) => {
            cachedPdfDocumentAssets = null
            throw error
        })
    }

    const assets = await cachedPdfDocumentAssets

    if (!assets.css && !assets.stylesheetLinks) {
        cachedPdfDocumentAssets = null
    }

    return assets
}