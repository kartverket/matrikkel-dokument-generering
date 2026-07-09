import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider, useTranslation } from "react-i18next"
import { Section } from "./components/Section"
import { Table } from "./components/Table"
import { createI18n } from "./lib/i18n/createI18n"
import type { ByggRapport } from "./lib/schema/byggRapportSchema"
import Bruksenheter from "./sections/Bruksenheter.tsx"
import { EtasjerSection } from "./sections/Etasjer"
import { KontaktPersoner } from "./sections/KontaktPersoner"

const css = ""

function DocumentComponent({ data }: { data: ByggRapport }) {
  const { t } = useTranslation()

  return (
    <>
      {data.bygninger.map((bygning) => (
        <Section
          key={bygning.bygningsnr}
          title={t("rapport.BYG0011.title", {
            bygningsnr: bygning.bygningsnr,
            bygningstype: bygning.bygningstype.navn,
          })}
        >
          <Table
            rows={[
              {
                label: t("rapport.BYG0011.matrikkelenhet"),
                value: bygning.matrikkelenhet,
              },
              {
                label: t("rapport.BYG0011.naeringsgruppe"),
                value: bygning.naeringsgruppe,
              },
            ]}
          />

          <EtasjerSection etasjeEndringer={bygning.endringer} />

          {bygning.endringer.map((endring) => (
            <Section
              key={endring.id}
              title={
                endring.lopenr === 0
                  ? "Opprinnelig bygg"
                  : `Endring ${endring.lopenr} – ${endring.endringskode}`
              }
            >
              <Table
                rows={[
                  { label: "Status", value: endring.bygningsstatus.navn },
                  { label: "Bebygd areal", value: `${endring.bebygdAreal} m²` },
                  {
                    label: "Bruksareal totalt",
                    value: `${endring.bruksareal.totalt} m²`,
                  },
                  {
                    label: "Rammetillatelse",
                    value: endring.datoer.rammetillatelse,
                  },
                  {
                    label: "Igangsettingstillatelse",
                    value: endring.datoer.igangsettingstillatelse,
                  },
                  {
                    label: "Midlertidig brukstillatelse",
                    value: endring.datoer.midlertidigBrukstillatelse,
                  },
                  { label: "Ferdigattest", value: endring.datoer.ferdigattest },
                  { label: "Tatt i bruk", value: endring.datoer.tattIBruk },
                  { label: "Utgått/revet", value: endring.datoer.utgaattRevet },
                ]}
              />

              {endring.bruksenheter.length > 0 && (
                <Bruksenheter bruksenheter={endring.bruksenheter} />
              )}

              {endring.hjemmelshavere.length > 0 && (
                <Section title="Hjemmelshavere">
                  {endring.hjemmelshavere.map((h) => (
                    <Table
                      key={h.fnrOrgnr}
                      rows={[
                        { label: "Navn", value: h.navn },
                        { label: "Adresse", value: h.adresse },
                        { label: "Andel", value: h.andel },
                      ]}
                    />
                  ))}
                </Section>
              )}

              {endring.tiltakshavere && endring.tiltakshavere.length > 0 && (
                <Section title="Tiltakshavere">
                  {endring.tiltakshavere.map((t) => (
                    <Table
                      key={t.fnrOrgnr}
                      rows={[
                        { label: "Navn", value: t.navn },
                        { label: "Adresse", value: t.adresse },
                      ]}
                    />
                  ))}
                </Section>
              )}

              <KontaktPersoner kontaktpersoner={endring.kontaktpersoner} />
            </Section>
          ))}
        </Section>
      ))}
    </>
  )
}

export function renderDocument(data: ByggRapport): string {
  const i18n = createI18n(data.locale)
  const body = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <DocumentComponent data={data} />
    </I18nextProvider>,
  )
  return `<!DOCTYPE html>
            <html lang="${data.locale}">
            <head>
              <meta charset="utf-8">
              <style>${css}</style>
            </head>
            <body>${body}</body>
            </html>`
}
