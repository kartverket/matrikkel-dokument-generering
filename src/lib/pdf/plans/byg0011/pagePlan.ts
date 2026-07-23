import type { i18n as I18n } from "i18next"
import type { Byg0011Rapport } from "../../../schema/reports/bygg/byg0011/byggRapport.schema.ts"
import type { PagePlan } from "../../pagePlan"
import { buildByg0011Footer } from "./footer"
import { buildByg0011HeaderPages } from "./header"

// Samler BYG0011-spesifikk topp- og bunntekst i en rapportuavhengig sideplan.
export function buildByg0011PagePlan(
  rapport: Byg0011Rapport,
  i18n: I18n,
): PagePlan {
  const t = i18n.getFixedT(rapport.locale)

  return {
    defaults: { footer: buildByg0011Footer(rapport, i18n, t) },
    pages: buildByg0011HeaderPages(rapport, t),
  }
}
