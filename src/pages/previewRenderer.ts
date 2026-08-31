import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { PreviewRapportsList } from "./PreviewRapportsList"
import { PreviewScenariosList } from "./PreviewScenariosList"

interface RapportType {
  kode: string
  tittel: string
  beskrivelse: string
}

interface Scenario {
  testCase: string
  name: string
  description: string
}

export function renderRapportsListPage(
  rapportTypes: RapportType[],
  protocol: string,
  host: string,
): string {
  const markup = renderToStaticMarkup(
    React.createElement(PreviewRapportsList, {
      rapportTypes,
      protocol,
      host,
    }),
  )
  return `<!DOCTYPE html>${markup}`
}

export function renderScenariosListPage(
  rapportKode: string,
  scenarios: Scenario[],
  protocol: string,
  host: string,
): string {
  const markup = renderToStaticMarkup(
    React.createElement(PreviewScenariosList, {
      rapportKode,
      scenarios,
      protocol,
      host,
    }),
  )
  return `<!DOCTYPE html>${markup}`
}

export function renderNotFoundPage(
  rapportKode: string,
  protocol: string,
  host: string,
): string {
  const html = `<!DOCTYPE html>
<html lang="nb">
<head>
  <meta charset="utf-8">
  <title>Rapport ikke funnet</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
      padding: 2rem; 
      max-width: 600px; 
      margin: 0 auto;
      background: #f5f5f5;
    }
    h1 { color: #d32f2f; }
    a { color: #007acc; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>❌ Rapport ikke funnet</h1>
  <p>Rapporttypen "${escapeHtml(rapportKode)}" er ikke implementert ennå.</p>
  <p><a href="${protocol}://${host}/preview">← Tilbake til alle rapporter</a></p>
</body>
</html>`
  return html
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}
