import type { TFunction } from "i18next"
import type { Byg0011Rapport } from "../../../schema/reports/bygg/byg0011/byggRapport.schema.ts"
import type { PageDef } from "../../pagePlan"

export function buildByg0011HeaderPages(
  rapport: Byg0011Rapport,
  t: TFunction,
): PageDef[] {
  const total = rapport.bygninger.length
  const utvalgTitle = t("rapport.BYG0011.utvalgskriterier.title")
  const oversiktTitle = t("rapport.BYG0011.byggoversikt.title")
  const byggEndringTitle = t("rapport.BYG0011.byggEndringer.tittel")

  return [
    {
      name: "utvalgskriterier",
      header: { right: `01 ${utvalgTitle}` },
    },
    ...rapport.bygninger.flatMap((bygning, index): PageDef[] => {
      const byggNr = index + 1
      const byggLabel = t("pdf.header.bygg", {
        nr: byggNr,
        total,
        bygningsnr: bygning.bygningsnr,
      })

      return [
        {
          name: `bygg-${byggNr}-oversikt`,
          header: { left: byggLabel, right: `02 ${oversiktTitle}` },
        },
        {
          name: `bygg-${byggNr}-bruksenhet`,
          header: { left: byggLabel, right: `03 ${byggEndringTitle}` },
        },
      ]
    }),
  ]
}
