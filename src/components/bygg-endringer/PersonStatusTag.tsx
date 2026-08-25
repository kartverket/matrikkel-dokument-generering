import { Tag } from "@kv-designsystem/react"

interface Props {
  readonly erUtgatt: boolean
  readonly statuskode: string | null | undefined
  readonly utgattLabel: string
  readonly tom: string
}

export function PersonStatusTag({
  erUtgatt,
  statuskode,
  utgattLabel,
  tom,
}: Readonly<Props>) {
  return (
    <Tag data-color={erUtgatt ? "danger" : "success"} variant="outline">
      {erUtgatt ? utgattLabel : (statuskode ?? tom)}
    </Tag>
  )
}
