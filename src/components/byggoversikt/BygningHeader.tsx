import { Tag, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"

interface Props {
  gjeldendeStatusKode?: string
  byggNr: string
}

export default function BygningHeader({ gjeldendeStatusKode, byggNr }: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"

  return (
    <div className="flex justify-between bg-kv-green-tinted px-4 py-2">
      <div className="flex gap-4">
        <Heading level={2} className="font-medium">
          {t(`${key}.header.bygningsNr`, {
            bygningsnr: byggNr,
          })}{" "}
          {byggNr
            .replace(/\s/g, "")
            .replace(/^(\d{2})(?=\d)/, "$1 ")
            .replace(/(\d{3})(?=\d)/g, "$1 ")}
        </Heading>
        <Tag data-size="sm" data-color={"success"}>
          {gjeldendeStatusKode
            ? t(`koder.bygningsstatus.${gjeldendeStatusKode}`, {
                defaultValue: gjeldendeStatusKode,
              })
            : t(`${key}.ukjentBygningsStatus`)}
        </Tag>
      </div>

      {/* <div>Bygg x av y</div> */}
    </div>
  )
}
