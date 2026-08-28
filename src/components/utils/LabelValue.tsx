interface Props {
  label: string
  value: string | number | undefined
}

export function LabelValue({ label, value }: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-bold text-xs">{label}</span>
      <span className="text-xs">{value ?? "–"}</span>
    </div>
  )
}
