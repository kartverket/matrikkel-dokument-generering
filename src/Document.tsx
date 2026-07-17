import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "./lib/i18n/createI18n"
import type { ByggRapport } from "./lib/schema/byggRapportSchema"
import type { RapportMeta } from "./lib/schema/rapportSchema"
import Bruksenheter from "./sections/Bruksenheter.tsx"
import Byggoversikt from "./sections/Byggoversikt.tsx"
import { Metadata } from "./sections/Metadata.tsx"
import { Utvalgskriterier } from "./sections/Utvalgskriterier.tsx"

export function DocumentComponent({ data }: { data: ByggRapport }) {
  const metadata: RapportMeta = {
    rapportType: data.rapportType,
    kommune: data.kommune,
    koordinatsystem: data.koordinatsystem,
    generertTidspunkt: data.generertTidspunkt,
  }

  return (
    <>
      <Metadata metadata={metadata} />
      <Utvalgskriterier index={1} kriterier={data.utvalgskriterier} />
      {data.bygninger.map((bygning) => (
        <Fragment key={bygning.id}>
          <Byggoversikt
            index={2}
            bygning={bygning}
            koordinatsystem={data.koordinatsystem}
          />
          <Bruksenheter index={3} bygning={bygning} />
        </Fragment>
      ))}
    </>
  )
}

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
