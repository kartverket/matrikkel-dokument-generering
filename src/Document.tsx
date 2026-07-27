import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { PdfFooter } from "./components/pdf/PdfFooter.tsx"
import { PdfHeader } from "./components/pdf/PdfHeader.tsx"
import { PdfPage } from "./components/pdf/PdfPage.tsx"
import { createI18n } from "./lib/i18n/createI18n"
import type { Byg0011Rapport } from "./lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import ByggEndringer from "./sections/ByggEndringer.tsx"
import Byggoversikt from "./sections/Byggoversikt.tsx"
import { ByggUtvalgskriterier } from "./sections/ByggUtvalgskriterier.tsx"

export function DocumentComponent({ rapport }: { rapport: Byg0011Rapport }) {
  const { metadata, bygninger } = rapport
  const enesteBygning = bygninger.length === 1 ? bygninger[0] : undefined

  return (
    <main className="mx-auto max-w-6xl">
      <PdfPage
        header={<PdfHeader metadata={metadata} bygning={enesteBygning} />}
      >
        <ByggUtvalgskriterier index={1} kriterier={rapport.utvalgskriterier} />
      </PdfPage>
      {bygninger.map((bygning) => (
        <Fragment key={bygning.bygningsnr}>
          <PdfPage header={<PdfHeader metadata={metadata} bygning={bygning} />}>
            <Byggoversikt
              index={2}
              byggNr={bygning.bygningsnr}
              byggEndringer={bygning.endringer}
            />
          </PdfPage>
          <PdfPage header={<PdfHeader metadata={metadata} bygning={bygning} />}>
            <ByggEndringer index={3} bygning={bygning} />
          </PdfPage>
        </Fragment>
      ))}
    </main>
  )
}

export interface RenderedDocument {
  html: string
  footerHtml: string
}

export function renderDocument(
  rapport: Byg0011Rapport,
  css = "",
): RenderedDocument {
  const i18n = createI18n(rapport.locale)
  const body = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <DocumentComponent rapport={rapport} />
    </I18nextProvider>,
  )
  const footerBody = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <PdfFooter
        rapportKode={rapport.rapportKode}
        generertTidspunkt={rapport.metadata.generertTidspunkt}
      />
    </I18nextProvider>,
  )
  const html = `<!DOCTYPE html>
              <!--TODO: Mangler en NO prefix her hvis dette skal være en gyldig lang-->
            <html lang="${rapport.locale}">
            <head>
              <meta charset="utf-8">
              <style>${css}</style>
            </head>
            <body>${body}</body>
            </html>`
  const footerHtml = `<html>
            <head>
              <meta charset="utf-8">
              <style>${css}</style>
            </head>
            <body>${footerBody}</body>
            </html>`

  return { html, footerHtml }
}
