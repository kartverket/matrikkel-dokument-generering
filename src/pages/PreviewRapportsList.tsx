import type React from "react"
import { PreviewLayout } from "./PreviewLayout"

interface RapportType {
  kode: string
  tittel: string
  beskrivelse: string
}

interface PreviewRapportsListProps {
  rapportTypes: RapportType[]
  protocol: string
  host: string
}

export const PreviewRapportsList: React.FC<PreviewRapportsListProps> = ({
  rapportTypes,
  protocol,
  host,
}) => {
  return (
    <PreviewLayout title="Preview - Matrikkel Dokumentgenerering">
      <h1>📋 Preview-rapporter</h1>
      <p className="subtitle">
        Velg en rapporttype for å se tilgjengelige testscenarioer
      </p>

      <div className="grid">
        {rapportTypes.map((rapport) => (
          <a
            key={rapport.kode}
            href={`${protocol}://${host}/preview/${rapport.kode}`}
            className="card rapport-card"
          >
            <div className="rapport-kode">{rapport.kode}</div>
            <div className="rapport-tittel">{rapport.tittel}</div>
            <p className="rapport-beskrivelse">{rapport.beskrivelse}</p>
          </a>
        ))}
      </div>

      <div className="footer">
        <p>Total: {rapportTypes.length} rapporttype(r) tilgjengelig</p>
      </div>
    </PreviewLayout>
  )
}
