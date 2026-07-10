import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "./lib/i18n/createI18n"
import type { ByggRapport } from "./lib/schema/byggRapportSchema"
import Bruksenheter from "./sections/Bruksenheter.tsx"
import { EtasjerSection } from "./sections/Etasjer"
import { Hjemmelshavere } from "./sections/Hjemmelshavere.tsx"
import { KontaktPersoner } from "./sections/KontaktPersoner.tsx"
import { Tiltakshavere } from "./sections/Tiltakshavere.tsx"
import RegistrerteVedtak from "./sections/RegistrerteVedtak.tsx"

function DocumentComponent({ data }: { data: ByggRapport }) {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-500">
        askljlsjods
      </h1>
      {data.bygninger.map((bygning) => (
        <Fragment key={bygning.id}>
          <EtasjerSection etasjeEndringer={bygning.endringer} />

          {bygning.endringer.map((endring) => (
            <Fragment key={endring.id}>
              {endring.bruksenheter.length > 0 && (
                <>
                  <Bruksenheter bruksenheter={endring.bruksenheter} />
                  <RegistrerteVedtak
                    Rammetillatelse={endring.datoer.rammetillatelse}
                    Igangsettingstillatelse={endring.datoer.igangsettingstillatelse}
                    MidlertidigBrukstillatelse={endring.datoer.midlertidigBrukstillatelse}
                    Ferdigattest={endring.datoer.ferdigattest}
                  />
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
