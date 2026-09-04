import { Heading } from "@kv-designsystem/react"
import { cn } from "../../lib/utils/cn.ts"

interface Props {
  readonly title: string
  readonly className?: string
  readonly children?: React.ReactNode
}

export function UtvalgskriterieGruppe({
  title,
  className,
  children,
}: Readonly<Props>) {
  return (
    <section className={cn("space-y-3", className)}>
      <span className="flex break-after-avoid items-center gap-4">
        <Heading level={3} className="min-w-max text-base">
          {title}
        </Heading>
        <hr className="w-full border border-kv-green-border/90" />
      </span>
      {children}
    </section>
  )
}
