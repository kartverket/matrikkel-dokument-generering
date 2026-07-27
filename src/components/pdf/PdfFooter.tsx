import { useTranslation } from "react-i18next"
import type { RapportKode } from "../../lib/schema/core/koder/rapportKode.schema.ts"
import { formatDate } from "../../lib/utils/formatDate.ts"

interface PdfFooterProps {
  rapportKode: RapportKode
  generertTidspunkt: string
}

// Rendres i Gotenbergs footer-mal, et eget minidokument som får dokumentets
// CSS embeddet i `footer.html` (se renderDocument). Chromium fyller selv inn
// sidetall i elementene med klassene `pageNumber` og `totalPages`.
export function PdfFooter({ rapportKode, generertTidspunkt }: PdfFooterProps) {
  const { i18n, t } = useTranslation()

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

  return (
    <div className="flex w-full justify-between px-[18mm] text-[#5d5d5d] text-pdf-label">
      <span className="whitespace-pre">
        {t("pdf.footer.rapportGenerert", {
          type: rapportKode,
          dato: generertDato,
          tid: generertTid,
        })}
      </span>
      <span>
        {t("pdf.footer.side")} <span className="pageNumber font-bold" />{" "}
        {t("pdf.footer.av")} <span className="totalPages" />
      </span>
    </div>
  )
}
