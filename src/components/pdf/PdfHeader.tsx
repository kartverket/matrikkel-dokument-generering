import { useTranslation } from "react-i18next"
import type { RapportMeta } from "../../lib/schema/core/meta.schema.ts"

interface PdfHeaderProps {
  readonly metadata: RapportMeta
}

export function PdfHeader({ metadata }: Readonly<PdfHeaderProps>) {
  const { t } = useTranslation()
  const { kommune, koordinatSystemKode } = metadata

  // Gjør slik at kommunenavnet alltid starter med stor bokstav og resten er små bokstaver, ofte navnet blir sendt i store bokstaver fra M22.
  const kommuneNavn =
    kommune.kommuneNavn.charAt(0).toUpperCase() +
    kommune.kommuneNavn.slice(1).toLowerCase()

  return (
    <div className="flex w-full justify-between px-[18mm] text-kv-subtle text-pdf-label">
      <span className="whitespace-pre">
        {`${kommune.kommuneNr} ${kommuneNavn} `}
      </span>
      <span className="whitespace-pre">
        {t(`koder.koordinat.${koordinatSystemKode}`)}
      </span>
    </div>
  )
}
