import type { ComponentType } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { PdfFooter } from "./components/pdf/PdfFooter.tsx"
import { PdfHeader } from "./components/pdf/PdfHeader.tsx"
import { createI18n } from "./lib/i18n/createI18n"
import type { Rapport } from "./lib/schema/core/rapport.schema.ts"

export interface RenderedDocument {
  html: string
  footerHtml: string
  headerHtml: string
}

export function renderDocument<R extends Rapport>(
  Component: ComponentType<{ rapport: R }>,
  rapport: R,
  css = "",
): RenderedDocument {
  const i18n = createI18n(rapport.locale)
  const body = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <Component rapport={rapport} />
    </I18nextProvider>,
  )

  const headerBody = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <PdfHeader metadata={rapport.metadata} />
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

  const headerHtml = `<html>
      <head>
        <meta charset="utf-8">
        <style>${css}</style>
      </head>
      <body>${headerBody}</body>
    </html>`

  const footerHtml = `<html>
            <head>
              <meta charset="utf-8">
              <style>${css}</style>
            </head>
            <body>${footerBody}</body>
            </html>`

  return { html, headerHtml, footerHtml }
}
