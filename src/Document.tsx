import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "./lib/i18n/createI18n"
import { buildPageCss } from "./lib/pdf/buildPageCss"
import { buildByggPagePlan } from "./lib/pdf/plans/bygg0011"
import type { Byg0011Rapport } from "./lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatDate } from "./lib/utils/formatDate"
import ByggEndringer from "./sections/ByggEndringer.tsx"
import Byggoversikt from "./sections/Byggoversikt.tsx"
import { ByggUtvalgskriterier } from "./sections/ByggUtvalgskriterier.tsx"
import { Metadata } from "./sections/Metadata.tsx"

export function DocumentComponent({ rapport }: { rapport: Byg0011Rapport }) {
  return (
    <main className="mx-auto max-w-6xl">
      <Metadata metadata={rapport.metadata} rapportKode={rapport.rapportKode} />
      <ByggUtvalgskriterier index={1} kriterier={rapport.utvalgskriterier} />

      {rapport.bygninger.map((bygning) => {
        return (
          <Fragment key={bygning.bygningsnr}>
            <Byggoversikt
              index={2}
              byggNr={bygning.bygningsnr}
              byggEndringer={bygning.endringer}
            />
            <ByggEndringer index={3} bygning={bygning} />
          </Fragment>
        )
      })}
    </main>
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
