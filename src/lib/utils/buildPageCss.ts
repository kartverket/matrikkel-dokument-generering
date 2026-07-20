import type { TFunction } from "i18next"
import type { ByggRapport } from "../schema/reports/bygg/bygg0011/index"

// Bygger dynamisk @page-CSS med navngitte sider slik at hver side i PDF-en
// får riktig topptekst (bygg X/N + kapittel) og bunntekst (generert-dato +
// sidetall). Chromium (Gotenberg) støtter @page-margin­bokser med statisk
// `content:` og CSS-tellere, men ikke `string()`/`element()` – derfor
// genererer vi én navngitt side per bygg × seksjon.

const MARGINS = "size: A4; margin: 22mm 18mm 22mm 18mm;"
const LABEL = "font-size: 9pt; color: #555;"

function escapeCssString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

export function buildPageCss(
  data: ByggRapport,
  t: TFunction,
  generertLabel: string,
): string {
  const total = data.bygninger.length
  const utvalgTitle = escapeCssString(
    t("rapport.BYG0011.utvalgskriterier.title"),
  )
  const oversiktTitle = escapeCssString(
    t("rapport.BYG0011.byggoversikt.title"),
  )
  const bruksenhTitle = escapeCssString(
    t("rapport.BYG0011.bruksenheter.title"),
  )
  const sideLabel = escapeCssString(t("pdf.footer.side"))
  const avLabel = escapeCssString(t("pdf.footer.av"))
  const generert = escapeCssString(generertLabel)

  const pageCounter =
    `content: "${sideLabel} " counter(page) " ${avLabel} " counter(pages);` +
    ` ${LABEL}`
  const generertFooter = `content: "${generert}"; ${LABEL}`

  const perBygg = data.bygninger
    .map((bygning, i: number) => {
      const nr = i + 1
      const byggHeader = escapeCssString(
        t("pdf.header.bygg", {
          nr,
          total,
          bygningsnr: bygning.bygningsnr,
        }),
      )
      return `
    .pg-bygg-${nr}-oversikt   { page: bygg-${nr}-oversikt;   break-before: page; }
    .pg-bygg-${nr}-bruksenhet { page: bygg-${nr}-bruksenhet; break-before: page; }
    @page bygg-${nr}-oversikt {
      ${MARGINS}
      @top-left     { content: "${byggHeader}"; ${LABEL} }
      @top-right    { content: "02 ${oversiktTitle}"; ${LABEL} }
      @bottom-left  { ${generertFooter} }
      @bottom-right { ${pageCounter} }
    }
    @page bygg-${nr}-bruksenhet {
      ${MARGINS}
      @top-left     { content: "${byggHeader}"; ${LABEL} }
      @top-right    { content: "03 ${bruksenhTitle}"; ${LABEL} }
      @bottom-left  { ${generertFooter} }
      @bottom-right { ${pageCounter} }
    }`
    })
    .join("\n")

  return `
    @page {
      ${MARGINS}
      @bottom-left  { ${generertFooter} }
      @bottom-right { ${pageCounter} }
    }
    .pg-utvalgskriterier { page: utvalgskriterier; break-before: page; }
    @page utvalgskriterier {
      ${MARGINS}
      @top-right    { content: "01 ${utvalgTitle}"; ${LABEL} }
      @bottom-left  { ${generertFooter} }
      @bottom-right { ${pageCounter} }
    }
${perBygg}
  `.trim()
}
