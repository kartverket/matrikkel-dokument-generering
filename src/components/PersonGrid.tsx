import { Heading, Paragraph } from "@kv-designsystem/react"
import { Children, type ReactNode } from "react"
import { cn } from "../lib/utils/cn"

interface Props {
  title: string
  tom: string
  children: ReactNode
  className?: string
}

export function PersonGrid({ title, tom, children, className }: Props) {
  const personkort = Children.toArray(children)

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {title}
      </Heading>

      {personkort.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <div className={cn("grid grid-cols-1 gap-3", className)}>
          {personkort}
        </div>
      )}
    </div>
  )
}
