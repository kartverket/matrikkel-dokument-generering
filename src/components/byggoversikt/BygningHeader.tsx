import { Heading } from "@digdir/designsystemet-react"
import { Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../../lib/schema/reports/bygg/byg0011/byg0011.schema"
import { getBygningstype } from "../../lib/schema/reports/bygg/shared/bygningstype.schema"

interface Props {
  bygning: Bygning
}

export default function BygningHeader({ bygning }: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt.header"

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-4">
          <Heading level={3}>{t(`${key}.bygg`)}</Heading>
          <Paragraph className="text-kv-subtle" data-size="sm">
            {bygning.bygningsType.kode}{" "}
            {getBygningstype(bygning.bygningsType.kode, t)}
          </Paragraph>
        </div>
        <Paragraph className="text-kv-subtle" data-size="sm">
          {t(`${key}.bygningsNr`, {
            bygningsnr: bygning.bygningsnr,
          })}
        </Paragraph>
      </div>
    </div>
  )
}
