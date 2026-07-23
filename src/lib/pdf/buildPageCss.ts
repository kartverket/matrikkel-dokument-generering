import type { PageBoxes, PageContent, PageDef, PagePlan } from "./pagePlan"

// Genererer CSS med navngitte `@page`-blokker og tilhørende CSS-klasser fra en rapport-uavhengig `PagePlan`.

const PAGE_LAYOUT = "size: A4; margin: 22mm 18mm 22mm 18mm;"
const BOLD_PAGE_COUNTER =
  '@counter-style bold-page { system: numeric; symbols: "𝟎" "𝟏" "𝟐" "𝟑" "𝟒" "𝟓" "𝟔" "𝟕" "𝟖" "𝟗"; }'

function escapeCssString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function contentExpression(value: PageContent): string {
  if (typeof value === "string") return `"${escapeCssString(value)}"`

  const pageCounter = value.boldCurrentPage
    ? "counter(page, bold-page)"
    : "counter(page)"

  return (
    `"${escapeCssString(value.pageLabel)} " ${pageCounter} ` +
    `" ${escapeCssString(value.totalLabel)} " counter(pages)`
  )
}

function box(name: string, value: PageContent | undefined): string {
  if (value === undefined) return ""
  return `@${name} { content: ${contentExpression(value)}; }`
}

function boxes(prefix: "top" | "bottom", value: PageBoxes | undefined): string {
  if (!value) return ""
  return [
    box(`${prefix}-left`, value.left),
    box(`${prefix}-right`, value.right),
  ]
    .filter(Boolean)
    .join(" ")
}

function mergeBoxes(
  base: PageBoxes | undefined,
  override: PageBoxes | undefined,
): PageBoxes | undefined {
  if (!base && !override) return undefined
  return {
    left: override?.left ?? base?.left,
    right: override?.right ?? base?.right,
  }
}

function pageBody(page: { header?: PageBoxes; footer?: PageBoxes }): string {
  return [PAGE_LAYOUT, boxes("top", page.header), boxes("bottom", page.footer)]
    .filter(Boolean)
    .join(" ")
}

export function buildPageCss(plan: PagePlan): string {
  const defaults = plan.defaults ?? {}
  const defaultBlock = `@page { ${pageBody(defaults)} }`

  const namedBlocks = plan.pages
    .map((page: PageDef) => {
      const breakDecl = page.breakBefore === false ? "" : " break-before: page;"
      const merged = {
        header: mergeBoxes(defaults.header, page.header),
        footer: mergeBoxes(defaults.footer, page.footer),
      }
      return (
        `.pg-${page.name} { page: ${page.name};${breakDecl} }\n` +
        `@page ${page.name} { ${pageBody(merged)} }`
      )
    })
    .join("\n")

  return `${BOLD_PAGE_COUNTER}\n${defaultBlock}\n${namedBlocks}`.trim()
}
