import { renderToStaticMarkup } from "react-dom/server"
import type { ByggRapport } from "./lib/schema/byggRapportSchema"
import { Section } from "./components/Section"
import { Table } from "./components/Table"
import Bruksenheter from "./sections/Bruksenheter.tsx";

const css = ""

function DocumentComponent({ data }: { data: ByggRapport }) { 
  return (
    <>
      {data.bygninger.map((bygning) => (
        <Section key={bygning.bygningsnr} title={`Bygning ${bygning.bygningsnr} – ${bygning.bygningstype.navn}`}>
          <Table rows={[
            { label: "Matrikkelenhet", value: bygning.matrikkelenhet },
            { label: "Næringsgrupppe", value: bygning.naeringsgruppe },
          ]} />

          {bygning.endringer.map((endring) => (
            <Section key={endring.id} title={endring.lopenr === 0 ? "Opprinnelig bygg" : `Endring ${endring.lopenr} – ${endring.endringskode}`}>
              
              <Bruksenheter bruksenheter={endring.bruksenheter} />

            </Section>
          ))}
        </Section>
      ))}
  </>
  )
}

export function renderDocument(data: ByggRapport): string {
  const body = renderToStaticMarkup(<DocumentComponent data={data} />)
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <style>${css}</style>
            </head>
            <body>${body}</body>
            </html>`
}