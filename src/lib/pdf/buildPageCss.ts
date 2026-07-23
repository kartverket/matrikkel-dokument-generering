import type { PageBoxes, PageContent, PageDef, PagePlan } from "./pagePlan"

// Genererer CSS med navngitte `@page`-blokker og tilhørende CSS-klasser fra en rapport-uavhengig `PagePlan`.

const MARGINS = "size: A4; margin: 22mm 18mm 22mm 18mm;"
const LABEL = "font-size: 9pt; color: #555;"

function escapeCssString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function contentExpression(value: PageContent): string {
  return typeof value === "string" ? `"${escapeCssString(value)}"` : value.raw
}

function box(name: string, value: PageContent | undefined): string {
  if (value === undefined) return ""
  return `@${name} { content: ${contentExpression(value)}; ${LABEL} }`
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
  return [MARGINS, boxes("top", page.header), boxes("bottom", page.footer)]
    .filter(Boolean)
    .join(" ")
}

export function buildPageCss(plan: PagePlan): string {
  const defaults = plan.defaults ?? {}
  const defaultBlock = `@page { ${pageBody(defaults)} }`

  const namedBlocks = plan.pages
    .map((page: PageDef) => {
      const merged = {
        header: mergeBoxes(defaults.header, page.header),
        footer: mergeBoxes(defaults.footer, page.footer),
      }
      return (
        `.pg-${page.name} { page: ${page.name}; }\n` +
        `@page ${page.name} { ${pageBody(merged)} }`
      )
    })
    .join("\n")

  return `${defaultBlock}\n${namedBlocks}`.trim()
}
