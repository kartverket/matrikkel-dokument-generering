import { useTranslation } from "react-i18next"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { LabelValue } from "./utils/LabelValue.tsx"
import { SectionTitle } from "./utils/SectionTitle.tsx"

type Props = Pick<
  Bygning,
  | "bygningstypeKode"
  | "naringsgruppeKode"
  | "etasjedata"
  | "representasjonspunkt"
>

export function OmBygget({
  bygningstypeKode,
  naringsgruppeKode,
  etasjedata,
  representasjonspunkt,
}: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.omBygget" as const
  const bygningstype =
    bygningstypeKode?.kodeverdi != null
      ? `${bygningstypeKode.kodeverdi} ${oversettKode({ t, kodeverk: "bygningstype", kode: bygningstypeKode.kodeverdi })}`
      : undefined

  const naringsgruppe =
    naringsgruppeKode?.kodeverdi != null
      ? `${oversettKode({ t, kodeverk: "naringsgruppe", kode: naringsgruppeKode.kodeverdi })}`
      : undefined

  const koordinater =
    representasjonspunkt?.nord != null && representasjonspunkt?.ost != null
      ? `${representasjonspunkt.nord}, ${representasjonspunkt.ost}`
      : undefined

  return (
    <div className="space-y-2">
      <SectionTitle>{t(`${tKey}.tittel`)}</SectionTitle>

      <div className="grid grid-cols-4 gap-4">
        <LabelValue label={t(`${tKey}.bygningstype`)} value={bygningstype} />
        <LabelValue label={t(`${tKey}.naringsgruppe`)} value={naringsgruppe} />
        <LabelValue
          label={t(`${tKey}.boenheter`)}
          value={etasjedata?.antallBoenheter}
        />
        <LabelValue
          label={t(`${tKey}.representasjonspunkt`)}
          value={koordinater}
        />
      </div>
    </div>
  )
}
