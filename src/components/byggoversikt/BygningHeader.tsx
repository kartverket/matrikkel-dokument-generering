import { Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"

interface Props {
  gjeldendeStatusKode?: string
  byggNr: string
}

export default function BygningHeader({ gjeldendeStatusKode, byggNr }: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"

  return (
    <div className="flex flex-col gap-2 bg-kv-green-tinted py-2">
      <div>
        <p className="text-kv-subtle">
          {t(`${key}.header.bygningsNr`, {
            bygningsnr: byggNr,
          })}
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <h3 className="text-2xl font-medium">
          {/* Formatterings Regex på formen XX XXX XXX */}
          {byggNr
            .replace(/\s/g, "")
            .replace(/^(\d{2})(?=\d)/, "$1 ")
            .replace(/(\d{3})(?=\d)/g, "$1 ")}
        </h3>

        <div className="flex flex-col gap-4">
          <Tag data-size="sm" data-color={"success"}>
            {gjeldendeStatusKode
              ? t(`koder.bygningsstatus.${gjeldendeStatusKode}`, {
                  defaultValue: gjeldendeStatusKode,
                })
              : t(`${key}.ukjentBygningsStatus`)}
          </Tag>
        </div>
      </div>
    </div>
  )
}
