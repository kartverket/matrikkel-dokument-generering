import { Label, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Bygningstypekode } from "../../lib/schema/reports/bygg/koder/bygningsTypeKodeSchema.ts"

interface Props {
  byggTypeKode?: Bygningstypekode
  antallBoenheter?: number
  antallBruksenheter?: number
  naeringsgruppe?: string
  koordinater?: {
    nord?: number
    ost?: number
  }
  // etasjeKoder?: string[]
}

export default function Oversiktsfelt(props: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"
  const tom = t("tom")

  // const oversikt = {
  //   bygningstype: formaterBygningstype(
  //     t,
  //     gjeldendeEndring.byggMetaEndring?.bygningsTypeKode,
  //   ),
  //   antallBruksenheter: gjeldendeEndring.bruksenheter.length,
  //   antallBoenheter: gjeldendeEndring.byggMetaEndring?.antallBoenheter,
  //   naeringsgruppe: gjeldendeEndring.byggMetaEndring?.naeringsgruppe,
  //   koordinater,
  //   etasjer,
  //   bygningsnr: byggNr,
  // }

  return (
    <ul className="flex flex-row justify-between gap-4">
      <li>
        <Label>{t(`${key}.bygningstype`)}</Label>
        <Paragraph data-size="sm">
          {props.byggTypeKode
            ? t(`koder.bygningstype.${props.byggTypeKode}`)
            : tom}
        </Paragraph>
      </li>

      <li>
        <Label>{t(`${key}.antallBruksenheter`)}</Label>
        <Paragraph data-size="sm">{props.antallBruksenheter ?? tom}</Paragraph>
      </li>

      <li>
        <Label>{t(`${key}.antallBoenheter`)}</Label>
        <Paragraph data-size="sm">{props.antallBoenheter ?? tom}</Paragraph>
      </li>

      <li>
        <Label>{t(`${key}.naeringsgruppe`)}</Label>
        <Paragraph data-size="sm">{props.naeringsgruppe ?? tom}</Paragraph>
      </li>

      <li>
        <Label>{t(`${key}.koordinater`)}</Label>
        <Paragraph data-size="sm">
          {props.koordinater?.nord && props.koordinater?.ost
            ? `${props.koordinater.nord}, ${props.koordinater.ost}`
            : tom}
        </Paragraph>
      </li>
      {/* 
      <li>
        <Label>{t(`${key}.etasjer`)}</Label>
        <Paragraph data-size="sm">
          {props.etasjeKoder && props.etasjeKoder.length > 0
            ? props.etasjeKoder
                .map((kode) => t(`koder.etasje.${kode}`))
                .join(", ")
            : tom}
        </Paragraph>
      </li> */}
    </ul>
  )
}
