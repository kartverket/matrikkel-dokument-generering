import { renderToStaticMarkup } from "react-dom/server"
import { Header } from "./components/Header.tsx"
import { Bygning } from "./components/Bygning"
import type { Rapport } from "./types.ts"

const css = ""

function DocumentComponent({ data }: { data: Rapport }) {
  return (
    <div>
      <Header
        rapportType={data.rapportType}
        tittel={data.tittel}
        kommune={data.kommune}
        koordinatsystem={data.koordinatsystem}
        generertTidspunkt={data.generertTidspunkt}
      />

      {data.bygninger.map((bygning) => (
        <Bygning key={bygning.bygningsnr} {...bygning} />
      ))}
    </div>
  )
}

export function renderDocument(data: unknown): string {
  console.dir(data, { depth: 10, colors: true })

  const body = renderToStaticMarkup(
    <DocumentComponent data={data as Rapport} />,
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
