import type { TFunction } from "i18next"
import type { Byg0011Rapport } from "../../schema/reports/bygg/byg0011/byg0011.schema"
import { type PageDef, type PagePlan, pageCounterContent } from "../pagePlan"

// BYG0011-spesifikk oversettelse fra rapport-data til en `PagePlan`.
// Legger til én navngitt side per bygg × seksjon slik at header/footer oppdaterer seg riktig når rapporten spenner over flere sider.

export function buildByggPagePlan(
  data: Byg0011Rapport,
  t: TFunction,
  generertLabel: string,
): PagePlan {
  const total = data.bygninger.length
  const footer = {
    left: generertLabel,
    right: pageCounterContent(t("pdf.footer.side"), t("pdf.footer.av")),
  }

  const utvalgTitle = t("rapport.BYG0011.utvalgskriterier.title")
  const oversiktTitle = t("rapport.BYG0011.byggoversikt.title")
  const bruksenhTitle = t("rapport.BYG0011.bruksenheter.title")

  const pages: PageDef[] = [
    {
      name: "utvalgskriterier",
      header: { right: `01 ${utvalgTitle}` },
    },
    ...data.bygninger.flatMap((bygning, i): PageDef[] => {
      const nr = i + 1
      const byggHeader = t("pdf.header.bygg", {
        nr,
        total,
        bygningsnr: bygning.bygningsnr,
      })
      return [
        {
          name: `bygg-${nr}-oversikt`,
          header: { left: byggHeader, right: `02 ${oversiktTitle}` },
        },
        {
          name: `bygg-${nr}-bruksenhet`,
          header: { left: byggHeader, right: `03 ${bruksenhTitle}` },
        },
      ]
    }),
  ]

  return { defaults: { footer }, pages }
}
