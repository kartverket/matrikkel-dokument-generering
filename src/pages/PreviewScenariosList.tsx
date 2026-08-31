import type React from "react"
import { PreviewLayout } from "./PreviewLayout"

interface Scenario {
  testCase: string
  name: string
  description: string
}

interface PreviewScenariosListProps {
  rapportKode: string
  scenarios: Scenario[]
  protocol: string
  host: string
}

export const PreviewScenariosList: React.FC<PreviewScenariosListProps> = ({
  rapportKode,
  scenarios,
  protocol,
  host,
}) => {
  return (
    <PreviewLayout title={`Scenarioer - ${rapportKode}`}>
      <div className="back-link">
        <a href={`${protocol}://${host}/preview`}>← Tilbake til rapporter</a>
      </div>

      <h1>🏢 Scenarioer - {rapportKode}</h1>
      <p className="subtitle">
        Velg et scenario for å se en forhåndsvisning av rapporten
      </p>

      <div className="grid">
        {scenarios.map((scenario) => (
          <div key={scenario.testCase} className="card scenario-card">
            <div className="scenario-title">{scenario.name}</div>
            <p className="scenario-description">{scenario.description}</p>
            <div className="scenario-meta">
              Test-case: <code>{scenario.testCase}</code>
            </div>
            <div className="scenario-links">
              <a
                href={`${protocol}://${host}/preview/${rapportKode}/${scenario.testCase}?format=html`}
                className="btn btn-html"
              >
                📄 HTML
              </a>
              <a
                href={`${protocol}://${host}/preview/${rapportKode}/${scenario.testCase}?format=pdf`}
                className="btn btn-pdf"
              >
                📕 PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>
          Total: {scenarios.length} scenario(er) tilgjengelig for {rapportKode}
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          API: <code>GET /preview/{rapportKode}</code>
        </p>
      </div>
    </PreviewLayout>
  )
}
