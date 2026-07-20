import { Heading, Paragraph } from "@kv-designsystem/react"

interface Props {
  index: number
  title: string
  description?: string
  children?: React.ReactNode
}

export function Section({ index, title, description, children }: Props) {
  return (
    <section>
      <div className="mb-7 flex items-baseline gap-4 border-kv-blue border-b-2 pb-3">
        <span className="font-extrabold text-kv-blue text-sm tabular-nums tracking-widest">
          {index.toString().padStart(2, "0")}
        </span>
        <Heading level={2} data-size="md">
          {title}
        </Heading>
        {description && (
          <Paragraph className="ml-auto text-kv-subtle text-sm">
            {description}
          </Paragraph>
        )}
      </div>

      {children}
    </section>
  )
}
