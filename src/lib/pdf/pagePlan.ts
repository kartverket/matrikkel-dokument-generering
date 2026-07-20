// Rapport-uavhengig beskrivelse av topp- og bunntezster for en PDF-side.
// Hver rapporttype leverer sin egen `PagePlan`
// `buildPageCss` oversetter planen til CSS med `@page`-margin­bokser (som Chromium/Gotenberg støtter).

export type PageContent = string | { raw: string }

export interface PageBoxes {
  left?: PageContent
  right?: PageContent
}

export interface PageDef {
  // Navn brukt både som `@page`-navn og til CSS-klassen `.pg-<name>`.
  name: string
  // Om innholdet skal starte på ny side. Default: true.
  breakBefore?: boolean
  header?: PageBoxes
  footer?: PageBoxes
}

export interface PagePlan {
  // Boks-innhold som slår gjennom på alle sider (kan overstyres per side).
  defaults?: {
    header?: PageBoxes
    footer?: PageBoxes
  }
  pages: PageDef[]
}

function escapeCssString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

// Viser "Side X av Y" ved hjelp av CSS-tellerne `counter(page)` og `counter(pages)`.
// Returverdien er ment å legges direkte inn i `PageBoxes` (som `PageContent`).

export function pageCounterContent(
  sideLabel: string,
  avLabel: string,
): PageContent {
  return {
    raw:
      `"${escapeCssString(sideLabel)} " counter(page) ` +
      `" ${escapeCssString(avLabel)} " counter(pages)`,
  }
}
