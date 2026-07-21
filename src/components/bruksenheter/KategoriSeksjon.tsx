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
      <div className="mb-3 flex items-center gap-3">
        <Heading level={4} data-size="xs">
          {title}
        </Heading>
        <hr className="flex-1 border-kv-green-border" />
      </div>
      {isEmpty && emptyText ? (
        <Paragraph className="text-kv-subtle text-sm">{emptyText}</Paragraph>
      ) : (
        children
      )}
    </div>
  )
}
