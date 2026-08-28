import { cn } from "../../lib/utils/cn.ts"

interface Props {
  label: string
  value: string | number | undefined
  className?: string
}

export function LabelValue({ label, value, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="font-bold text-xs">{label}</span>
      <span className="text-xs">{value ?? "–"}</span>
    </div>
  )
}
