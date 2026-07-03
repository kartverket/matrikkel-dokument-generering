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
        <Section key={bygning.bygningsnr} title={`Bygning ${bygning.bygningsnr} – ${bygning.bygningstype.navn}`}>
          <Table rows={[
            { label: "Matrikkelenhet", value: bygning.matrikkelenhet },
          ]} />
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
