import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "./lib/i18n/createI18n"
import type { ByggRapport } from "./lib/schema/byggRapportSchema"
import Bruksenheter from "./sections/Bruksenheter.tsx"
import { Bygningslinje } from "./sections/Bygningslinje.tsx"
import { EtasjerSection } from "./sections/Etasjer.tsx"
import { Hjemmelshavere } from "./sections/Hjemmelshavere.tsx"
import { KontaktPersoner } from "./sections/KontaktPersoner.tsx"
import { Tiltakshavere } from "./sections/Tiltakshavere.tsx"

export function DocumentComponent({ data }: { data: ByggRapport }) {
  return (
    <>
      {data.bygninger.map((bygning) => (
        <Fragment key={bygning.id}>
          <Bygningslinje bygning={bygning} />
          <EtasjerSection etasjeEndringer={bygning.endringer} />

          {bygning.endringer.map((endring) => (
            <Fragment key={endring.id}>
              {endring.bruksenheter.length > 0 && (
                <>
                  <Bruksenheter bruksenheter={endring.bruksenheter} />
                  <KontaktPersoner kontaktpersoner={endring.kontaktpersoner} />
                  <Hjemmelshavere hjemmelshavere={endring.hjemmelshavere} />
                </>
              )}
              {data.utvalgskriterier.subrapporter.tiltakshavere && (
                <Tiltakshavere endring={endring} />
              )}
            </Fragment>
          ))}
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
