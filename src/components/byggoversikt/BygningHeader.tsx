import { Heading } from "@digdir/designsystemet-react"
import { Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Bygning } from "../../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formaterBygningstype } from "../../lib/utils/formaterBygningstype.ts"

interface Props {
  bygning: Bygning
  gjeldendeEndring: BygningsEndring
}

export default function BygningHeader({ bygning, gjeldendeEndring }: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt.header"
  const bygningstype = formaterBygningstype(
    t,
    gjeldendeEndring?.byggMetaEndring?.bygningsTypeKode,
  )

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-4">
          <Heading level={3}>{t(`${key}.bygg`)}</Heading>
          {bygningstype && (
            <Paragraph className="text-kv-subtle" data-size="sm">
              {bygningstype}
            </Paragraph>
          )}
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
