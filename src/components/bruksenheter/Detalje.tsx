import type { ReactNode } from "react"

interface Props {
  label: ReactNode
  value: ReactNode
  className?: string
}

export function Detail({ label, value, className = "" }: Props) {
  return (
    <div className={className}>
      <dt className="text-kv-subtle text-sm">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  )
}
