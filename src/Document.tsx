import { renderToStaticMarkup } from "react-dom/server"
import { Section } from "./components/Section.tsx"
import { Table } from "./components/Table.tsx"
import { Header } from "./components/Header.tsx"
import type { ByggRapport } from "./lib/schema/byggRapportSchema.ts"

const css = ""

interface Props {
  document: ByggRapport
}


function DocumentComponent({ document }: Props) { 

  const headerPairs = [
    { key: "Rapporttype", value: document.rapportType},
    { key: "Kommune", value: `${document.kommune.navn} (${document.kommune.nr})`},
    { key: "Koordinatsystem", value: document.koordinatsystem },
    { key: "Generert tidspunkt", value: document.generertTidspunkt }
  ]

 

  return (
    <>
      <Header title={document.tittel} pairs={headerPairs} />
      {document.bygninger.map((bygning) => (
        <Section key={bygning.bygningsnr} title={`Bygningstype`}>
          <Table rows={[
            {label: "Bygningsnummer", value: bygning.bygningsnr },
            { label: "Bygningstype", value: bygning.bygningstype.navn },
            { label: "Matrikkelenhet", value: bygning.matrikkelenhet },
            {
  label: "Adresseverdig", value: bygning.adresseverdig ? "Ja" : "Nei" },
            { label: "Næringsgruppe", value: bygning.naeringsgruppe },
            { label: "Matrikkelenhet", value: bygning.matrikkelenhet },
            
          ]} />


          <h3>Endringer</h3>
          {bygning.endringer.map((endring) => (
            <div key={endring.lopenr}>

              <h4>
                {`${endring.lopenr === 0 ? "Original" : `Endring ${endring.lopenr.toString()}`}`}
              </h4>
              <Table rows={[
                {label: "Løpenummer", value: endring.lopenr.toString() },
                { label: "Endringskode", value: endring.endringskode },
                { label: "Bygningsstatus", value: endring.bygningsstatus.navn },
                { label: "Antall boenheter", value: endring.antallBoenheter.toString() },
              ]} />
            </div>
          ))}


        </Section>
      ))}



    </>
  )
}

export function renderDocument(document: ByggRapport): string {
  console.dir(document, { depth: 10, colors: true })

  const body = renderToStaticMarkup(
    <DocumentComponent document={document} />,
  )
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <style>${css}</style>
            </head>
            <body>${body}</body>
            </html>`
}
