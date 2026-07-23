// Rapportuavhengig beskrivelse av topp- og bunntekster for en PDF-side.
// Hver rapportkode leverer sin egen `PagePlan`.
// `buildPageCss` oversetter planen til CSS med `@page`-margin­bokser (som Chromium/Gotenberg støtter).

export type PageContent =
  | string
  | {
      type: "pageCounter"
      pageLabel: string
      totalLabel: string
    }

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

export function pageCounterContent(
  pageLabel: string,
  totalLabel: string,
): PageContent {
  return {
    type: "pageCounter",
    pageLabel,
    totalLabel,
  }
}
