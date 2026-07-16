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
    <Card className="pdf-keep-together">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Paragraph className="font-semibold">{navn}</Paragraph>
        <PersonStatusTag
          erUtgatt={erUtgatt}
          statuskode={statuskode}
          utgattLabel={utgattLabel}
          tom={tom}
        />
      </div>

      <Detaljgrid felter={felter} tom={tom} />
    </Card>
  )
}
