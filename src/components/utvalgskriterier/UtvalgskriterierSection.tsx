import { cn } from "../../lib/utils/cn.ts"

interface Props {
  readonly className?: string
  readonly children?: React.ReactNode
}

export function UtvalgskriterierSection({
  className,
  children,
}: Readonly<Props>) {
  return <section className={cn("mb-20", className)}>{children}</section>
}
