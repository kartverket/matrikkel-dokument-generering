import { Label, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningstypekode } from "../../lib/schema/reports/bygg/koder/bygningsTypeKodeSchema.ts"
import type { NaringsgruppeKode } from "../../lib/schema/reports/bygg/koder/naringsgruppeKode.schema.ts"
import type { ArealFordeling } from "../../lib/schema/reports/bygg/shared/arealFordeling.schema.ts"

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
  bruksareal?: ArealFordeling
  visEtasjer?: boolean
}

export default function Oversiktsfelt(props: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"
  const tom = t("tom")
  const visEtasjer = props.visEtasjer ?? true
  const { bruksareal } = props

  return (
    <ul className="grid break-inside-avoid grid-cols-4 px-2.5">
      <li>
        <Label>{t(`${key}.bygningstype`)}</Label>
        <Paragraph>
          {props.byggTypeKode
            ? t(`koder.bygningstype.${props.byggTypeKode}`)
            : tom}
        </Paragraph>
      </li>

      <li>
        <Label>{t(`${key}.antallBruksenheter`)}</Label>
        <Paragraph>{props.antallBruksenheter ?? tom}</Paragraph>
      </li>

      <li>
        <Label>{t(`${key}.antallBoenheter`)}</Label>
        <Paragraph>{props.antallBoenheter ?? tom}</Paragraph>
      </li>

      {visEtasjer && (
        <li>
          <Label>{t(`${key}.antallEtasjer`)}</Label>
          <Paragraph>{props.antallEtasjer ?? tom}</Paragraph>
        </li>
      )}

      <li>
        <Label>{t(`${key}.naringsgruppe`)}</Label>
        <Paragraph>
          {props.naringsgruppeKode
            ? t(`koder.naringsgruppe.${props.naringsgruppeKode}`)
            : tom}
        </Paragraph>
      </li>

      <li>
        <Label>{t(`${key}.koordinater`)}</Label>
        <Paragraph>
          {props.koordinater?.nord && props.koordinater?.ost
            ? `${props.koordinater.nord}, ${props.koordinater.ost}`
            : tom}
        </Paragraph>
      </li>

      {bruksareal && (
        <>
          <li>
            <Label>{t(`${key}.arealfordeling.bolig`)}</Label>
            <Paragraph>{bruksareal.boligAreal ?? tom}</Paragraph>
          </li>
          <li>
            <Label>{t(`${key}.arealfordeling.annet`)}</Label>
            <Paragraph>{bruksareal.annetAreal ?? tom}</Paragraph>
          </li>
          <li>
            <Label>{t(`${key}.arealfordeling.totalt`)}</Label>
            <Paragraph>{bruksareal.totaltAreal ?? tom}</Paragraph>
          </li>
        </>
      )}
    </ul>
  )
}
