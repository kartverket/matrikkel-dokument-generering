import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { RapportMeta } from "../../lib/schema/core/meta.schema.ts"
import type { Bygning } from "../../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

interface PdfHeaderProps {
  metadata: RapportMeta
  bygning?: Bygning
}

export function PdfHeader({ metadata, bygning }: PdfHeaderProps) {
  const { t } = useTranslation()
  const { kommune, koordinatSystemKode } = metadata

  const kommuneTekst = t("pdf.header.kommune", {
    kommuneNr: kommune.kommuneNr,
    kommuneNavn:
      kommune.kommuneNavn.charAt(0).toUpperCase() +
      kommune.kommuneNavn.slice(1).toLowerCase(),
  })
  const koordinatTekst = t("pdf.header.koordinatsystem", {
    kode: koordinatSystemKode,
    navn: oversettKode({
      t,
      kodeverk: "koordinat",
      kode: koordinatSystemKode,
    }),
  })

  return (
    <header className="flex items-baseline justify-between text-[#5d5d5d] text-pdf-label">
      <span className="whitespace-pre">{`${kommuneTekst} ${koordinatTekst}`}</span>
      {bygning && (
        <span className="underline decoration-1 decoration-[#278a46] underline-offset-[3px]">
          {t("pdf.header.bygg", { bygningsnr: bygning.bygningsnr })}
        </span>
      )}
    </header>
  )
}
