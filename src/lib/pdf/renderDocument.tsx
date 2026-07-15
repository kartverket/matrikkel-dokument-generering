import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { DocumentComponent } from "../../Document.tsx"
import { createI18n } from "../i18n/createI18n.ts"
import type { ByggRapport } from "../schema/byggRapportSchema.ts"

export function renderDocument(data: ByggRapport, css = ""): string {
  const i18n = createI18n(data.locale)
  const body = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <DocumentComponent data={data} />
    </I18nextProvider>,
  )
  const styleTag = css ? `<style>${css}</style>` : ""
  return `<!DOCTYPE html>
            <html lang="${data.locale}">
            <head>
              <meta charset="utf-8">
              ${styleTag}
            </head>
            <body>${body}</body>
            </html>`
}
