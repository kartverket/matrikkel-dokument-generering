import { Label, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning, Bygningsendring } from "../../lib/schema/reports/bygg/bygg0011/index"

interface Props {
  bygning: Bygning
  endring: Bygningsendring
  koordinatsystem: string
}

export default function Oversiktsfelt({
  bygning,
  endring,
  koordinatsystem,
}: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"

  const oversikt = {
    bygningsstatus: endring.bygningsstatus.navn,
    bygningstype: `${bygning.bygningstype.kode} ${bygning.bygningstype.navn}`,
    antallBruksenheter: endring.bruksenheter.length,
    antallBoenheter: endring.antallBoenheter,
    naeringsgruppe: bygning.naeringsgruppe,
    koordinater: `${endring.koordinat.nord} N / ${endring.koordinat.ost} Ø`,
    koordinatsystem,
    etasjer: endring.etasjeplan
      .map((e) => `${e.etasjeplan} (${e.etasje})`)
      .join(", "),
    bygningsnr: bygning.bygningsnr,
  }

  return (
    <ul className="grid grid-cols-2 gap-4">
      {(
        Object.entries(oversikt) as Array<
          [keyof typeof oversikt, string | number]
        >
      ).map(([k, value]) => (
        <li key={k}>
          <Label>{t(`${key}.${k}`)}</Label>
          <Paragraph data-size="sm">{value}</Paragraph>
        </li>
      ))}
    </ul>
  )
}
