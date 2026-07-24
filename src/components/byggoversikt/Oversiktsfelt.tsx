import { Label, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningstypekode } from "../../lib/schema/reports/bygg/koder/bygningsTypeKodeSchema.ts"
import type { NaringsgruppeKode } from "../../lib/schema/reports/bygg/koder/naringsgruppeKode.schema.ts"

interface Props {
  byggTypeKode?: Bygningstypekode
  antallBoenheter?: number
  antallBruksenheter?: number
  antallEtasjer?: number
  naringsgruppeKode?: NaringsgruppeKode
  koordinater?: {
    nord?: number
    ost?: number
  }
}

export default function Oversiktsfelt(props: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"
  const tom = t("tom")

  return (
    <ul className="flex flex-row justify-between gap-4 break-inside-avoid">
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
        <Label>{t(`${key}.antallEtasjer`)}</Label>
        <Paragraph data-size="sm">{props.antallEtasjer ?? tom}</Paragraph>
      </li>

      <li>
        <Label>{t(`${key}.naringsgruppe`)}</Label>
        <Paragraph data-size="sm">
          {props.naringsgruppeKode
            ? t(`koder.naringsgruppe.${props.naringsgruppeKode}`)
            : tom}
        </Paragraph>
      </li>

      <li>
        <Label>{t(`${key}.koordinater`)}</Label>
        <Paragraph data-size="sm">
          {props.koordinater?.nord && props.koordinater?.ost
            ? `${props.koordinater.nord}, ${props.koordinater.ost}`
            : tom}
        </Paragraph>
      </li>
    </ul>
  )
}
