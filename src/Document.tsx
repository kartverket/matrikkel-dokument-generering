import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "./lib/i18n/createI18n"
import type { ByggRapport } from "./lib/schema/byggRapportSchema"
import Bruksenheter from "./sections/Bruksenheter.tsx"
import Byggoversikt from "./sections/Byggoversikt.tsx"
import { Bygningslinje } from "./sections/Bygningslinje.tsx"
import { Metadata } from "./sections/Metadata.tsx"
import { Utvalgskriterier } from "./sections/Utvalgskriterier.tsx"

export function DocumentComponent({ data }: { data: ByggRapport }) {
  return (
    <>
      <Metadata data={data} />
      <Utvalgskriterier index={1} kriterier={data.utvalgskriterier} />
      {data.bygninger.map((bygning) => (
        <Fragment key={bygning.id}>
          <Bygningslinje index={2} bygning={bygning} />
          <Byggoversikt index={3} bygning={bygning} />
          <Bruksenheter
            index={4}
            bruksenheter={bygning.bruksenheter}
            endringer={bygning.endringer}
          />
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
