import { Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { ArealSection } from "./ArealSection.tsx"
import { Bruksenheter } from "./Bruksenheter.tsx"
import { BygningsstatuserSection } from "./BygningsstatuserSection.tsx"
import { EtasjerSection } from "./EtasjerSection.tsx"
import { OmBygget } from "./OmBygget.tsx"

interface Props {
  readonly bygning: Bygning
}

export function BygningsendringSection({ bygning }: Readonly<Props>) {
  const { t } = useTranslation()

  const tittel = t(
    "rapport.BYG0011.bygningsendring",
    "Bygningsendring {{lopenummer}}",
    { lopenummer: bygning.lopenummer },
  )
  const status = bygning.bygningstatusKode?.displayTekst

  return (
    <section className="flex gap-6" data-color="neutral">
      <div className="bg-gray-200 p-4 text-right [writing-mode:sideways-lr]">
        <p className="text-xs uppercase">{tittel}</p>
        <p className="ml-2 text-xs">
          {t("rapport.BYG0011.bygningsnummer")}:
          <span className="font-semibold">{` ${bygning.bygningsnummer}`}</span>
        </p>
      </div>

      <div className="flex-1 space-y-8">
        <div className="flex items-baseline gap-2">
          <h2 className="font-bold text-gray-900 text-lg">{tittel}</h2>
          {status && <Tag>{status}</Tag>}
        </div>

        <OmBygget
          bygningstypeKode={bygning.bygningstypeKode}
          naringsgruppeKode={bygning.naringsgruppeKode}
          etasjedata={bygning.etasjedata}
          representasjonspunkt={bygning.representasjonspunkt}
        />

        {bygning.etasjedata != null && (
          <ArealSection etasjedata={bygning.etasjedata} />
        )}

        {bygning.bygningsstatuser != null && (
          <BygningsstatuserSection
            bygningsstatuser={bygning.bygningsstatuser}
          />
        )}

        {bygning.etasjer != null && bygning.etasjer.length > 0 && (
          <EtasjerSection etasjer={bygning.etasjer} />
        )}

        {bygning.bruksenheter.length > 0 && (
          <Bruksenheter bruksenheter={bygning.bruksenheter} />
        )}
      </div>
    </section>
  )
}
