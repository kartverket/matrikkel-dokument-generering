import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "./lib/i18n/createI18n"
import { buildPageCss } from "./lib/pdf/buildPageCss"
import { buildByggPagePlan } from "./lib/pdf/plans/bygg0011"
import type { Byg0011Rapport } from "./lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatDate } from "./lib/utils/formatDate"
import Bruksenheter from "./sections/Bruksenheter.tsx"
import Byggoversikt from "./sections/Byggoversikt.tsx"
import { ByggUtvalgskriterier } from "./sections/ByggUtvalgskriterier.tsx"
import { Metadata } from "./sections/Metadata.tsx"

export function DocumentComponent({ rapport }: { rapport: Byg0011Rapport }) {
  return (
    <>
      <Metadata metadata={rapport.metadata} rapportKode={rapport.rapportKode} />
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
              <Bruksenheter index={3} byggEndringer={bygning.endringer} />
            </div>
          </Fragment>
        )
      })}
    </>
  )
}

export function renderDocument(rapport: Byg0011Rapport, css = ""): string {
  const i18n = createI18n(rapport.locale)
  const t = i18n.getFixedT(rapport.locale)
  const generertLabel = t("pdf.footer.rapportGenerert", {
    type: rapport.rapportKode,
    dato:
      formatDate(i18n, rapport.metadata.generertTidspunkt, "", {
        dateStyle: "long",
        timeStyle: "short",
      }) ?? "",
  })
  const pageCss = buildPageCss(buildByggPagePlan(rapport, t, generertLabel))
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
