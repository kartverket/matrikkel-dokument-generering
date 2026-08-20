import { Heading, Paragraph } from "@kv-designsystem/react"

interface Props {
  readonly index: number
  readonly title: string
  readonly description?: string
  readonly showTitle?: boolean
  readonly children?: React.ReactNode
}

export function Section({
  index,
  title,
  description,
  showTitle = true,
  children,
}: Readonly<Props>) {
  return (
    <section className="mb-20">
      {showTitle && (
        <div className="mb-2 flex break-after-avoid items-baseline gap-4 border-kv-green border-b-2 pb-3">
          <Heading
            level={2}
            data-size="md"
            className="flex items-baseline gap-2"
          >
            <span className="text-kv-green tabular-nums tracking-widest">
              {index.toString().padStart(2, "0")}
            </span>
            {title}
          </Heading>
          {description && (
            <Paragraph className="ml-auto text-kv-subtle">
              {description}
            </Paragraph>
          )}
        </div>
      )}
      <div className="px-2.5">{children}</div>
    </section>
  )
}
