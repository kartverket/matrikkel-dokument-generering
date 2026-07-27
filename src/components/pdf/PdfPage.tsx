import type { ReactNode } from "react"

interface PdfPageProps {
  header: ReactNode
  children: ReactNode
}

export function PdfPage({ header, children }: PdfPageProps) {
  return (
    <table className="w-full break-before-page">
      <thead>
        <tr>
          <td className="pb-[8mm] leading-none">{header}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="print:[&>*:last-child]:mb-0">{children}</td>
        </tr>
      </tbody>
    </table>
  )
}
