import { renderToStaticMarkup } from "react-dom/server"
import { Section } from "./components/Section.tsx"
import { Table } from "./components/Table.tsx"
import { Header } from "./components/Header.tsx"

const css = ""

function DocumentComponent({ data }: { data: any }) { // Bytt til Rapport-type senere

  const headerPairs = [
    { key: "Rapporttype", value: data.rapportType},
    { key: "Kommune", value: `${data.kommune.navn} (${data.kommune.nr})`},
    { key: "Koordinatsystem", value: data.koordinatsystem },
    { key: "Generert tidspunkt", value: data.generertTidspunkt }
  ]

  return (
    <>
      <Header title={data.tittel} pairs={headerPairs} />
      {data.bygninger.map((bygning: any) => (
        <Section key={bygning.bygningsnr} title={`Bygning ${bygning.bygningsnr} – ${bygning.bygningstype.navn}`}>
          <Table rows={[
            { label: "Matrikkelenhet", value: bygning.matrikkelenhet },
          ]} />
        </Section>
      ))}
    </>
  )
}

export function renderDocument(data: unknown): string {
  console.dir(data, { depth: 10, colors: true })

  const body = renderToStaticMarkup(
    <DocumentComponent data={data} />,
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
