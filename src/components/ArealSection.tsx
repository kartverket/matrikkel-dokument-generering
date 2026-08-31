import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { LabelValue } from "./utils/LabelValue.tsx"
import { SectionTitle } from "./utils/SectionTitle.tsx"

type Props = Pick<Bygning, "etasjedata">

export function ArealSection({ etasjedata }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.areal" as const
  const enhet = t(`${tKey}.enhet`)

  const formatAreal = (value: number | undefined) =>
    value != null ? `${value} ${enhet}` : undefined

  return (
    <section className="space-y-2">
      <SectionTitle>{t(`${tKey}.tittel`)}</SectionTitle>

      <div className="flex gap-8">
        <ArealGruppe
          tittel={t(`${tKey}.bruksareal`)}
          bolig={formatAreal(etasjedata?.bruksarealTilBolig)}
          annet={formatAreal(etasjedata?.bruksarealTilAnnet)}
          total={formatAreal(etasjedata?.bruksarealTotalt)}
          boligLabel={t(`${tKey}.bolig`)}
          annetLabel={t(`${tKey}.annet`)}
          totalLabel={t(`${tKey}.total`)}
        />
        <ArealGruppe
          tittel={t(`${tKey}.bruttoareal`)}
          bolig={formatAreal(etasjedata?.bruttoarealTilBolig)}
          annet={formatAreal(etasjedata?.bruttoarealTilAnnet)}
          total={formatAreal(etasjedata?.bruttoarealTotalt)}
          boligLabel={t(`${tKey}.bolig`)}
          annetLabel={t(`${tKey}.annet`)}
          totalLabel={t(`${tKey}.total`)}
        />
      </div>
    </section>
  )
}

interface ArealGruppeProps {
  tittel: string
  bolig: string | undefined
  annet: string | undefined
  total: string | undefined
  boligLabel: string
  annetLabel: string
  totalLabel: string
}

function ArealGruppe({
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
        <hr className="flex-1 border-gray-300 border-b-4" />
        <span className="whitespace-nowrap text-kv-subtle text-xs">
          {tittel}
        </span>
        <hr className="flex-1 border-gray-300 border-b-4" />
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
