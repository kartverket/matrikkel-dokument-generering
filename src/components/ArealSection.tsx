import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatAreal } from "../lib/utils/formatAreal.ts"
import { LabelValue } from "./utils/LabelValue.tsx"
import { SectionTitle } from "./utils/SectionTitle.tsx"

type Props = Pick<Bygning, "etasjedata">

export function ArealSection({ etasjedata }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.areal" as const
  const enhet = t(`${tKey}.enhet`)

  return (
    <section className="space-y-2">
      <SectionTitle>{t(`${tKey}.tittel`)}</SectionTitle>

      <div className="flex gap-8">
        <ArealGruppe
          tittel={t(`${tKey}.bruksareal`)}
          bolig={formatAreal(etasjedata?.bruksarealTilBolig, enhet)}
          annet={formatAreal(etasjedata?.bruksarealTilAnnet, enhet)}
          total={formatAreal(etasjedata?.bruksarealTotalt, enhet)}
          boligLabel={t(`${tKey}.bolig`)}
          annetLabel={t(`${tKey}.annet`)}
          totalLabel={t(`${tKey}.total`)}
        />
        <ArealGruppe
          tittel={t(`${tKey}.bruttoareal`)}
          bolig={formatAreal(etasjedata?.bruttoarealTilBolig, enhet)}
          annet={formatAreal(etasjedata?.bruttoarealTilAnnet, enhet)}
          total={formatAreal(etasjedata?.bruttoarealTotalt, enhet)}
          boligLabel={t(`${tKey}.bolig`)}
          annetLabel={t(`${tKey}.annet`)}
          totalLabel={t(`${tKey}.total`)}
        />
      </div>
    </section>
  )
}

export interface ArealGruppeProps {
  tittel: string
  bolig: string | undefined
  annet: string | undefined
  total: string | undefined
  boligLabel: string
  annetLabel: string
  totalLabel: string
}

export function ArealGruppe({
  tittel,
  bolig,
  annet,
  total,
  boligLabel,
  annetLabel,
  totalLabel,
}: ArealGruppeProps) {
  return (
    <div className="flex-1 space-y-1">
      <span className="flex items-center gap-2">
        <hr className="flex-1 border border-gray-300" />
        <span className="whitespace-nowrap text-xs">{tittel}</span>
        <hr className="flex-1 border border-gray-300" />
      </span>
      <div className="flex gap-4">
        <div className="flex-1">
          <LabelValue label={boligLabel} value={bolig} />
        </div>
        <div className="flex-1">
          <LabelValue label={annetLabel} value={annet} />
        </div>
        <div className="flex-1">
          <LabelValue label={totalLabel} value={total} />
        </div>
      </div>
    </div>
  )
}
