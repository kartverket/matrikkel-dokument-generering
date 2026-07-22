import { Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"

interface Props {
  gjeldendeTypeKode?: string
  gjeldendeStatusKode?: string
  byggNr: string
}

export default function BygningHeader({
  gjeldendeTypeKode,
  gjeldendeStatusKode,
  byggNr,
}: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"

  return (
    <div>
      <div className="flex flex-col  gap-4">
        <Paragraph className="text-kv-subtle" data-size="sm">
          Type:{" "}
          {gjeldendeTypeKode
            ? t(`koder.bygningstype.${gjeldendeTypeKode}`, {
                defaultValue: gjeldendeTypeKode,
              })
            : t(`${key}.ukjentByggningsType`)}
        </Paragraph>

        <Paragraph className="text-kv-subtle" data-size="sm">
          Status:{" "}
          {gjeldendeStatusKode
            ? t(`koder.bygningsstatus.${gjeldendeStatusKode}`, {
                defaultValue: gjeldendeStatusKode,
              })
            : t(`${key}.ukjentBygningsStatus`)}
        </Paragraph>
      </div>
      <Paragraph className="text-kv-subtle" data-size="sm">
        {t(`${key}.header.bygningsNr`, {
          bygningsnr: byggNr,
        })}
      </Paragraph>
    </div>
  )
}
