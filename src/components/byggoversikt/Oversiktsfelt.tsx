import { Label, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Bygning } from "../../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { getBygningstype } from "../../lib/schema/reports/bygg/koder/bygningsTypeKodeSchema.ts"

interface Props {
  bygning: Bygning
  gjeldendeEndring: BygningsEndring
}

export default function Oversiktsfelt({ bygning, gjeldendeEndring }: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"

  const oversikt = {
    bygningsstatus: gjeldendeEndring.bygningsstatus.navn,
    bygningstype: `${bygning.bygningsType.kode} ${getBygningstype(bygning.bygningsType.kode, t)}`,
    antallBruksenheter: gjeldendeEndring.bruksenheter.length,
    antallBoenheter: gjeldendeEndring.antallBoenheter,
    naeringsgruppe: bygning.naeringsgruppe,
    koordinater: `${gjeldendeEndring.koordinat.nord} N / ${gjeldendeEndring.koordinat.ost} Ø`,
    etasjer: bygning.etasjePlan
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
