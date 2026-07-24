import { Heading, Paragraph } from "@kv-designsystem/react"

interface Props {
  index: number
  title: string
  description?: string
  children?: React.ReactNode
  breakBefore?: boolean
}

export function Section({
  index,
  title,
  description,
  children,
  breakBefore,
}: Props) {
  return (
    <section
      className={`mb-12 ${breakBefore ? "break-before-page" : "break-before-avoid"}`}
    >
      <div className="mb-2 flex items-baseline gap-4 border-kv-green border-b-2 pb-3">
        <Heading level={2} data-size="md" className="flex items-baseline gap-2">
          <span className="text-kv-green tabular-nums tracking-widest">
            {index.toString().padStart(2, "0")}
          </span>
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
