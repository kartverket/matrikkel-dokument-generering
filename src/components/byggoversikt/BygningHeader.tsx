import { Heading } from "@digdir/designsystemet-react"
import { Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../../lib/schema/reports/bygg/byg0011/bygning.schema"
import type { Bygningsendring } from "../../lib/schema/reports/bygg/byg0011/bygningsendring.schema"
import { formatDate } from "../../lib/utils/formatDate"

interface Props {
  bygning: Bygning
  endring: Bygningsendring
}

export default function BygningHeader({ bygning, endring }: Props) {
  const { i18n, t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt.header"

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-4">
          <Heading level={3}>
            {t(`${key}.bygg`, { lopenr: endring.lopenr })}
          </Heading>
          <Paragraph className="text-kv-subtle" data-size="sm">
            {bygning.bygningstype.kode} {bygning.bygningstype.navn}
          </Paragraph>
        </div>
        <Paragraph className="text-kv-subtle" data-size="sm">
          {t(`${key}.bygningsnrLopenr`, {
            bygningsnr: bygning.bygningsnr,
            lopenr: endring.lopenr,
          })}
        </Paragraph>
      </div>

      <div>
        <Paragraph data-size="sm" className="font-semibold text-kv-blue">
          {endring.bygningsstatus.navn}
        </Paragraph>
        {endring.datoer.ferdigattest && (
          <Paragraph className="text-kv-subtle" data-size="sm">
            {t(`${key}.ferdigattest`, {
              dato: formatDate(i18n, endring.datoer.ferdigattest, "—", {
                dateStyle: "short",
              }),
            })}
          </Paragraph>
        )}
      </div>
    </div>
  )
}
