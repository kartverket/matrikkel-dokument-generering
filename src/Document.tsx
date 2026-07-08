import { renderToStaticMarkup } from "react-dom/server"
import type { ByggRapport } from "./lib/schema/byggRapportSchema"
import { renderReportStructure } from "./lib/structure/core/render"
import { getByggRapportStructure } from "./lib/structure/reports/byggRapport/structure"

const css = ""

function DocumentComponent({ data }: { data: ByggRapport }) {
  return <>{renderReportStructure(data, getByggRapportStructure(data.locale))}</>
}

export function renderDocument(data: ByggRapport): string {
  const body = renderToStaticMarkup(<DocumentComponent data={data} />)
  return `<!DOCTYPE html>
            <html lang="${data.locale}">
            <head>
              <meta charset="utf-8">
              <style>${css}</style>
            </head>
            <body>${body}</body>
            </html>`
}
