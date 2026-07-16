import { Tag } from "@kv-designsystem/react"

interface Props {
  erUtgatt: boolean
  statuskode: string | null
  utgattLabel: string
  tom: string
}

export function PersonStatusTag({
  erUtgatt,
  statuskode,
  utgattLabel,
  tom,
}: Props) {
  return (
    <Tag data-color={erUtgatt ? "danger" : "success"} variant="outline">
      {erUtgatt ? utgattLabel : (statuskode ?? tom)}
    </Tag>
  )
}
