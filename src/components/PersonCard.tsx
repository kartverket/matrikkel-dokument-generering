import { Card, Paragraph } from "@kv-designsystem/react"
import { PersonStatusTag } from "./bruksenheter/PersonStatusTag"
import { type DetaljfeltData, Detaljgrid } from "./Detaljfelt"

interface Props {
  navn: string
  erUtgatt: boolean
  statuskode: string | null
  utgattLabel: string
  felter: DetaljfeltData[]
  tom: string
}

export function PersonCard({
  navn,
  erUtgatt,
  statuskode,
  utgattLabel,
  felter,
  tom,
}: Props) {
  return (
    <Card className="min-w-0 pdf-keep-together">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Paragraph className="min-w-0 wrap-break-word font-semibold">
          {navn}
        </Paragraph>
        <PersonStatusTag
          erUtgatt={erUtgatt}
          statuskode={statuskode}
          utgattLabel={utgattLabel}
          tom={tom}
        />
      </div>

      <Detaljgrid
        className="grid-cols-1 *:min-w-0 [&_dd]:wrap-anywhere sm:grid-cols-2 xl:grid-cols-3"
        felter={felter}
        tom={tom}
      />
    </Card>
  )
}
