import { cn } from "../../lib/utils/cn.ts"

interface Props {
  label: string
  value: string | number | (string | number)[] | undefined
  className?: string
}

export function LabelValue({ label, value, className }: Props) {
  const values = (Array.isArray(value) ? value : [value]).filter(
    (v): v is string | number => v != null,
  )

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="font-bold text-xs">{label}</span>
      {values.length > 0 ? (
        values.map((v) => (
          <span key={v} className="text-xs">
            {v}
          </span>
        ))
      ) : (
        <span className="text-xs">–</span>
      )}
    </div>
  )
}
