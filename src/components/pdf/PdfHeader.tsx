import { useTranslation } from "react-i18next"
import type { RapportKode } from "../../lib/schema/core/koder/rapportKode.schema.ts"
import type { RapportMeta } from "../../lib/schema/core/meta.schema.ts"

interface PdfHeaderProps {
  readonly metadata: RapportMeta
  readonly rapportKode: RapportKode
}

export function PdfHeader({ metadata, rapportKode }: Readonly<PdfHeaderProps>) {
  const { i18n, t } = useTranslation()
  const { koordinatSystemKode, generertTidspunkt } = metadata

  const generertDato = new Date(generertTidspunkt)
  const harGyldigDato = Number.isFinite(generertDato.getTime())

  const rapportDato = harGyldigDato
    ? new Intl.DateTimeFormat(i18n.language, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Oslo",
      }).format(generertDato)
    : ""

  return (
    <div className="w-full text-pdf-label leading-tight">
      <div className="grid w-full grid-cols-3 items-center">
        <span>{t(`rapport.${rapportKode}.rapportTittel`)}</span>
        <span className="text-center">{rapportDato}</span>
        <span className="text-right">
          {t(`koder.koordinat.${koordinatSystemKode}`)}
        </span>
      </div>
    </div>
  )
}
