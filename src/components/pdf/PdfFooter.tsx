import { useTranslation } from "react-i18next"
import type { RapportMeta } from "../../lib/schema/core/meta.schema.ts"

interface PdfFooterProps {
  readonly metadata: RapportMeta
}

// Rendres i Gotenbergs footer-mal, et eget minidokument som får dokumentets
// CSS embeddet i `footer.html` (se renderDocument). Chromium fyller selv inn
// sidetall i elementene med klassene `pageNumber` og `totalPages`.
export function PdfFooter({ metadata }: Readonly<PdfFooterProps>) {
  const { t } = useTranslation()
  const { kommune } = metadata

  return (
    <div className="w-full text-kv-subtle text-pdf-label leading-tight">
      <div className="flex w-full items-center justify-between">
        <span>{`${kommune.kommuneNr} ${kommune.kommuneNavn}`}</span>
        <span>
          {t("pdf.footer.side")} <span className="pageNumber" />{" "}
          {t("pdf.footer.av")} <span className="totalPages" />
        </span>
      </div>
    </div>
  )
}
