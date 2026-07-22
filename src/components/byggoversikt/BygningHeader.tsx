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
    <div className="bg-kv-green-tinted flex flex-row gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-kv-subtle">
          {t(`${key}.header.bygningsNr`, {
            bygningsnr: byggNr,
          })}
        </p>

        <h3 className="text-3xl ">{byggNr}</h3>
      </div>

      <div className="flex flex-col gap-4">
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
    </div>
  )
}
