import { useTranslation } from "react-i18next"
import type { RapportMeta } from "../../lib/schema/core/meta.schema.ts"
import type { Bygning } from "../../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

interface PdfHeaderProps {
  metadata: RapportMeta
  bygning?: Bygning
}

export function PdfHeader({ metadata, bygning }: PdfHeaderProps) {
  const { t } = useTranslation()
  const { kommune, koordinatSystemKode } = metadata

  // Gjør slik at kommunenavnet alltid starter med stor bokstav og resten er små bokstaver, ofte navnet blir sendt i store bokstaver fra M22.
  const kommuneNavn =
    kommune.kommuneNavn.charAt(0).toUpperCase() +
    kommune.kommuneNavn.slice(1).toLowerCase()

  return (
    <header className="flex items-baseline justify-between text-kv-subtle text-pdf-label">
      <span className="whitespace-pre">{`${kommune.kommuneNr} ${kommuneNavn} ${t(`koder.koordinat.${koordinatSystemKode}`)}`}</span>
      {bygning?.bygningsnr && (
        <span className="underline decoration-1 decoration-kv-accent-border underline-offset-[3px]">
          {t("pdf.header.bygg", { bygningsnr: bygning.bygningsnr })}
        </span>
      )}
    </header>
  )
}
