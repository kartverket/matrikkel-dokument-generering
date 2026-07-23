import type { i18n as I18n, TFunction } from "i18next"
import type { Byg0011Rapport } from "../../../schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatDate } from "../../../utils/formatDate"
import { type PageBoxes, pageCounterContent } from "../../pagePlan"

export function buildByg0011Footer(
  rapport: Byg0011Rapport,
  i18n: Pick<I18n, "language" | "t">,
  t: TFunction,
): PageBoxes {
  const generertDato =
    formatDate(i18n, rapport.metadata.generertTidspunkt, "", {
      dateStyle: "long",
      timeStyle: "short",
    }) ?? ""

  return {
    left: t("pdf.footer.rapportGenerert", {
      type: rapport.rapportKode,
      dato: generertDato,
    }),
    right: pageCounterContent(t("pdf.footer.side"), t("pdf.footer.av")),
  }
}
