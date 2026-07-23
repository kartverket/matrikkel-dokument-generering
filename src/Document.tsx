import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "./lib/i18n/createI18n"
import { buildPageCss } from "./lib/pdf/buildPageCss"
import { buildByg0011PagePlan } from "./lib/pdf/plans/byg0011/pagePlan"
import type { Byg0011Rapport } from "./lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import ByggEndringer from "./sections/ByggEndringer.tsx"
import Byggoversikt from "./sections/Byggoversikt.tsx"
import { ByggUtvalgskriterier } from "./sections/ByggUtvalgskriterier.tsx"

export function DocumentComponent({ rapport }: { rapport: Byg0011Rapport }) {
  return (
    <main className="mx-auto max-w-6xl">
      <div className="pg-utvalgskriterier">
        <ByggUtvalgskriterier index={1} kriterier={rapport.utvalgskriterier} />
      </div>
      {rapport.bygninger.map((bygning, i) => {
        const nr = i + 1
        return (
          <Fragment key={bygning.bygningsnr}>
            <div className={`pg-bygg-${nr}-oversikt`}>
              <Byggoversikt
                index={2}
                byggNr={bygning.bygningsnr}
                byggEndringer={bygning.endringer}
              />
            </div>
            <div className={`pg-bygg-${nr}-bruksenhet`}>
              <ByggEndringer index={3} bygning={bygning} />
            </div>
          </Fragment>
        )
      })}
    </main>
  )
}

export function renderDocument(rapport: Byg0011Rapport, css = ""): string {
  const i18n = createI18n(rapport.locale)
  const pageCss = buildPageCss(
    buildByg0011PagePlan(
      rapport.locale,
      rapport.rapportKode,
      rapport.metadata,
      i18n,
    ),
  )
  const body = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <DocumentComponent rapport={rapport} />
    </I18nextProvider>,
  )
  const styleTag = `<style>${css}\n${pageCss}</style>`
  return `<!DOCTYPE html>
              <!--TODO: Mangler en NO prefix her hvis dette skal være en gyldig lang-->
            <html lang="${rapport.locale}">
            <head>
              <meta charset="utf-8">
              ${styleTag}
            </head>
            <body>${body}</body>
            </html>`
}
