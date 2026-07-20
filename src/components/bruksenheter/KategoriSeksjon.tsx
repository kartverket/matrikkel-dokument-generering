import { Heading, Paragraph } from "@kv-designsystem/react"
import type { ReactNode } from "react"

interface Props {
  title: string
  emptyText?: string
  isEmpty?: boolean
  children: ReactNode
}

export function KategoriSeksjon({
  title,
  emptyText,
  isEmpty = false,
  children,
}: Props) {
  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-3">
        {title}
      </Heading>
      {isEmpty && emptyText ? (
        <Paragraph className="text-kv-subtle text-sm">{emptyText}</Paragraph>
      ) : (
        children
      )}
    </div>
  )
}
