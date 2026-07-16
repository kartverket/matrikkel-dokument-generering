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
    <Card className="pdf-keep-together min-w-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Paragraph className="wrap-break-word min-w-0 font-semibold">
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
        className="[&_dd]:wrap-anywhere grid-cols-1 *:min-w-0 sm:grid-cols-2 xl:grid-cols-3"
        felter={felter}
        tom={tom}
      />
    </Card>
  )
}
