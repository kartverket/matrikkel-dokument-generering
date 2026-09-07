import { Heading } from "@kv-designsystem/react"
import type { ReactNode } from "react"

interface SectionTitleProps {
  readonly children: ReactNode
}

export function SectionTitle({ children }: Readonly<SectionTitleProps>) {
  return (
    <span className="my-4 flex break-after-avoid items-center gap-4">
      <Heading level={3} className="min-w-max text-base">
        {children}
      </Heading>
    </span>
  )
}
