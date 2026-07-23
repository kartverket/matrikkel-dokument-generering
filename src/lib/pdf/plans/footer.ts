import type { i18n as I18n, TFunction } from "i18next"
import type { RapportKode } from "../../schema/core/koder/rapportKode.schema.ts"
import { formatDate } from "../../utils/formatDate.ts"
import { type PageBoxes, pageCounterContent } from "../pagePlan.ts"

// Ikke BYG0011 spesfikk, alle rapporter har en rapport-kode og generert tidspunkkt
export function buildFooter(
  rapportKode: RapportKode,
  generertTidspunkt: string,
  i18n: Pick<I18n, "language" | "t">,
  t: TFunction,
): PageBoxes {
  const generertDato =
    formatDate(i18n, generertTidspunkt, "", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) ?? ""
  const generertTid =
    formatDate(i18n, generertTidspunkt, "", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }) ?? ""

  return {
    left: t("pdf.footer.rapportGenerert", {
      type: rapportKode,
      dato: generertDato,
      tid: generertTid,
    }),
    right: pageCounterContent(t("pdf.footer.side"), t("pdf.footer.av"), true),
  }
}
