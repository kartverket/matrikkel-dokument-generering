import { Heading, Paragraph } from "@kv-designsystem/react"
import { Children, type ReactNode } from "react"

interface Props {
  title: string
  tom: string
  children: ReactNode
}

export function PersonGrid({ title, tom, children }: Props) {
  const personkort = Children.toArray(children)

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {title}
      </Heading>

      {personkort.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <div className="grid gap-3 grid-cols-2">{personkort}</div>
      )}
    </div>
  )
}
