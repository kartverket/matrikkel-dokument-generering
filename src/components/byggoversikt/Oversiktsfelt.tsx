import { Label, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Bygning } from "../../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formaterBygningstype } from "../../lib/utils/formaterBygningstype.ts"

interface Props {
  bygning: Bygning
  gjeldendeEndring: NonNullable<BygningsEndring>
}

export default function Oversiktsfelt({ bygning, gjeldendeEndring }: Props) {
  const { t } = useTranslation()
  const key = "rapport.BYG0011.byggoversikt"
  const tom = t("tom")

  const koordinat = gjeldendeEndring.byggKoordinatEndring
  const koordinater =
    koordinat?.nord === undefined || koordinat.ost === undefined
      ? null
      : `${koordinat.nord} N / ${koordinat.ost} Ø`

  const etasjer = gjeldendeEndring.etasjePlan
    .filter((etasje) => etasje !== undefined)
    .map((etasje) => `${etasje.etasjeplan} (${etasje.etasje})`)
    .join(", ")

  const oversikt = {
    bygningstype: formaterBygningstype(
      t,
      gjeldendeEndring.byggMetaEndring?.bygningsTypeKode,
    ),
    antallBruksenheter: gjeldendeEndring.bruksenheter.length,
    antallBoenheter: gjeldendeEndring.byggMetaEndring?.antallBoenheter,
    naeringsgruppe: gjeldendeEndring.byggMetaEndring?.naeringsgruppe,
    koordinater,
    etasjer,
    bygningsnr: bygning.bygningsnr,
  }

  return (
    <ul className="grid grid-cols-2 gap-4">
      {(
        Object.entries(oversikt) as Array<
          [keyof typeof oversikt, string | number | null | undefined]
        >
      ).map(([k, value]) => (
        <li key={k}>
          <Label>{t(`${key}.${k}`)}</Label>
          <Paragraph data-size="sm">
            {value == null || value === "" ? tom : value}
          </Paragraph>
        </li>
      ))}
    </ul>
  )
}
