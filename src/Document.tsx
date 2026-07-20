import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "./lib/i18n/createI18n"
import type { RapportMeta } from "./lib/schema/core/index.ts"
import type { ByggRapport } from "./lib/schema/reports/bygg/bygg0011/index"
import { buildPageCss } from "./lib/utils/buildPageCss"
import { formatDate } from "./lib/utils/formatDate"
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
      <div className="pg-utvalgskriterier">
        <Utvalgskriterier index={1} kriterier={data.utvalgskriterier} />
      </div>
      {data.bygninger.map((bygning, i) => {
        const nr = i + 1
        return (
          <Fragment key={bygning.id}>
            <div className={`pg-bygg-${nr}-oversikt`}>
              <Byggoversikt
                index={2}
                bygning={bygning}
                koordinatsystem={data.koordinatsystem}
              />
            </div>
            <div className={`pg-bygg-${nr}-bruksenhet`}>
              <Bruksenheter index={3} bygning={bygning} />
            </div>
          </Fragment>
        )
      })}
    </>
  )
}

export function renderDocument(data: ByggRapport, css = ""): string {
  const i18n = createI18n(data.locale)
  const t = i18n.getFixedT(data.locale)
  const generertLabel = t("pdf.footer.rapportGenerert", {
    type: data.rapportType,
    dato: formatDate(i18n, data.generertTidspunkt, "", {
      dateStyle: "long",
      timeStyle: "short",
    }),
  })
  const pageCss = buildPageCss(data, t, generertLabel)
  const body = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <DocumentComponent data={data} />
    </I18nextProvider>,
  )
  const styleTag = `<style>${css}\n${pageCss}</style>`
  return `<!DOCTYPE html>
            <html lang="${data.locale}">
            <head>
              <meta charset="utf-8">
              ${styleTag}
            </head>
            <body>${body}</body>
            </html>`
}
