import { Heading } from "@kv-designsystem/react"
import { cn } from "../lib/utils/cn.ts"

interface Props {
  title: string
  className?: string
  children?: React.ReactNode
}

export function SubSection({ title, className, children }: Props) {
  return (
    <section className={cn(className, "space-y-2")}>
      <span className="flex break-after-avoid items-center gap-4">
        <Heading level={3} data-size="sm" className="min-w-max font-medium">
          {title}
        </Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>
      {children}
    </section>
  )
}
