import { Card } from "@digdir/designsystemet-react"
import { Label, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningsendring } from "../../lib/schema/reports/bygg/byg0011/bygningsendring.schema"
import { formatArea } from "../../lib/utils/formatArea"

interface Props {
  endring: Bygningsendring
}

export default function Nokkeltall({ endring }: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"

  const kort = [
    {
      id: "bra",
      areal: endring.bruksareal.totalt,
      label: t(`${key}.bra`),
      beskrivelse: t(`${key}.nokkeltall.braBeskrivelse`),
    },
    {
      id: "bta",
      areal: endring.bruttoareal.totalt,
      label: t(`${key}.bta`),
      beskrivelse: t(`${key}.nokkeltall.btaBeskrivelse`),
    },
    {
      id: "bya",
      areal: endring.bebygdAreal,
      label: t(`${key}.bya`),
      beskrivelse: t(`${key}.nokkeltall.byaBeskrivelse`),
    },
  ]

  return (
    <ul className="grid grid-cols-3 gap-4">
      {kort.map(({ id, areal, label, beskrivelse }) => (
        <li key={id}>
          <Card>
            <Paragraph className="text-3xl">{formatArea(areal)}</Paragraph>
            <Label>{label}</Label>
            <Paragraph data-size="sm">{beskrivelse}</Paragraph>
          </Card>
        </li>
      ))}
    </ul>
  )
}
