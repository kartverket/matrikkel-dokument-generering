import { Heading } from "@digdir/designsystemet-react"
import { Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { formaterBygningstype } from "../../lib/utils/formaterBygningstype.ts"

interface Props {
  gjeldendeBygningsType?: string
  byggNr: string
}

export default function BygningHeader({
  gjeldendeBygningsType,
  byggNr,
}: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt.header"
  const bygningstype = formaterBygningstype(t, gjeldendeBygningsType)

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
            bygningsnr: byggNr,
          })}
        </Paragraph>
      </div>
    </div>
  )
}
