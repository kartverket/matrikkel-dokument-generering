interface Props {
  label: string
  value: string
  className?: string
  erTom?: boolean
}

export function EndringsDetalje({
  label,
  value,
  className = "",
  erTom = false,
}: Props) {
  return (
    <div className={className}>
      <dt className="text-kv-subtle text-sm">{label}</dt>
      <dd className={erTom ? "mt-1 text-kv-subtle" : "mt-1 font-medium"}>
        {value}
      </dd>
    </div>
  )
}
