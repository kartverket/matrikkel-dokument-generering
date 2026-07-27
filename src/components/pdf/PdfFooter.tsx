import { useTranslation } from "react-i18next"
import type { RapportKode } from "../../lib/schema/core/koder/rapportKode.schema.ts"

interface PdfFooterProps {
  rapportKode: RapportKode
  generertTidspunkt: string
}

// Rendres i Gotenbergs footer-mal, et eget minidokument som får dokumentets
// CSS embeddet i `footer.html` (se renderDocument). Chromium fyller selv inn
// sidetall i elementene med klassene `pageNumber` og `totalPages`.
export function PdfFooter({ rapportKode, generertTidspunkt }: PdfFooterProps) {
  const { t } = useTranslation()

  return (
    <div className="flex w-full justify-between px-[18mm] text-kv-subtle text-pdf-label">
      <span className="whitespace-pre">
        {t("pdf.footer.rapportGenerert", {
          type: rapportKode,
          tidspunkt: new Date(generertTidspunkt),
        })}
      </span>
      <span>
        {t("pdf.footer.side")} <span className="pageNumber font-bold" />{" "}
        {t("pdf.footer.av")} <span className="totalPages" />
      </span>
    </div>
  )
}
