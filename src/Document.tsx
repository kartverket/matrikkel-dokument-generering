import { renderToStaticMarkup } from "react-dom/server"
import type { ByggRapport } from "./lib/schema/byggRapportSchema"
import { loadPdfDocumentAssets } from "./lib/pdfDocumentAssets"
import { Section } from "./components/Section"
import { Table } from "./components/Table"

function DocumentComponent({ data }: { data: ByggRapport }) {
  return (
    // Eksempel på hvordan man kan bruke Section og Table komponentene til å lage et dokument basert på ByggRapport data
    <>
      {data.bygninger.map((bygning) => (
        <Section key={bygning.bygningsnr} title={`Bygning ${bygning.bygningsnr} – ${bygning.bygningstype.navn}`}>
          <Table rows={[
            { label: "Matrikkelenhet", value: bygning.matrikkelenhet },
            { label: "Næringsgrupppe", value: bygning.naeringsgruppe },
          ]} />

          {bygning.endringer.map((endring) => (
            <Section key={endring.id} title={endring.lopenr === 0 ? "Opprinnelig bygg" : `Endring ${endring.lopenr} – ${endring.endringskode}`}>
              <Table rows={[
                { label: "Status", value: endring.bygningsstatus.navn },
                { label: "Bebygd areal", value: `${endring.bebygdAreal} m²` },
                { label: "Bruksareal totalt", value: `${endring.bruksareal.totalt} m²` },
                { label: "Rammetillatelse", value: endring.datoer.rammetillatelse },
                { label: "Igangsettingstillatelse", value: endring.datoer.igangsettingstillatelse },
                { label: "Midlertidig brukstillatelse", value: endring.datoer.midlertidigBrukstillatelse },
                { label: "Ferdigattest", value: endring.datoer.ferdigattest },
                { label: "Tatt i bruk", value: endring.datoer.tattIBruk },
                { label: "Utgått/revet", value: endring.datoer.utgaattRevet },
              ]} />

              {endring.etasjeplan.length > 0 && (
                <Section title="Etasjeplan">
                  {endring.etasjeplan.map((e) => (
                    <Table key={e.etasje} rows={[
                      { label: "Etasje", value: `${e.etasje} – ${e.etasjeplan}` },
                      { label: "Bruksareal totalt", value: `${e.bruksareal.totalt} m²` },
                    ]} />
                  ))}
                </Section>
              )}

              {endring.bruksenheter.length > 0 && (
                <Section title="Bruksenheter">
                  {endring.bruksenheter.map((b, i) => (
                    <Table key={b.bruksenhetsnr ?? i} rows={[
                      { label: "Type", value: b.type },
                      { label: "Bruksenhetsnr", value: b.bruksenhetsnr },
                      { label: "Adresse", value: b.adresse },
                      { label: "Bruksareal", value: `${b.bruksareal} m²` },
                    ]} />
                  ))}
                </Section>
              )}

              {endring.hjemmelshavere.length > 0 && (
                <Section title="Hjemmelshavere">
                  {endring.hjemmelshavere.map((h) => (
                    <Table key={h.fnrOrgnr} rows={[
                      { label: "Navn", value: h.navn },
                      { label: "Adresse", value: h.adresse },
                      { label: "Andel", value: h.andel },
                    ]} />
                  ))}
                </Section>
              )}

              {endring.tiltakshavere && endring.tiltakshavere.length > 0 && (
                <Section title="Tiltakshavere">
                  {endring.tiltakshavere.map((t) => (
                    <Table key={t.fnrOrgnr} rows={[
                      { label: "Navn", value: t.navn },
                      { label: "Adresse", value: t.adresse },
                    ]} />
                  ))}
                </Section>
              )}
            </Section>
          ))}
        </Section>
      ))}
    </>
  )
}

export async function renderDocument(data: ByggRapport): Promise<string> {
  const documentAssets = await loadPdfDocumentAssets()
  const body = renderToStaticMarkup(<DocumentComponent data={data} />)
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              ${documentAssets.stylesheetLinks}
              <style>${documentAssets.css}</style>
            </head>
            <body>${body}</body>
            </html>`
}