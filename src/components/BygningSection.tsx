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

export function BygningSection({ bygning }: Readonly<Props>) {
  const { t } = useTranslation()

  if (!bygning) return null

  const bygningstype = bygning.bygningstypeKode?.displayTekst ?? ""
  const status = bygning.bygningstatusKode?.displayTekst ?? ""

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center justify-between bg-kv-green px-6 py-4">
        <div>
          <p className="font-medium text-white text-xs opacity-80">
            {t("rapport.BYG0011.bygningsnummer")}
          </p>
          <p className="font-bold text-3xl text-white">
            {bygning.bygningsnummer}
          </p>
        </div>

        <div className="flex gap-2">
          {bygningstype && <Tag>{bygningstype}</Tag>}

          {status && <Tag>{status}</Tag>}
        </div>
      </div>

      <div className="flex gap-6">
        <div className="bg-kv-green-subtle p-4 text-right [writing-mode:sideways-lr]">
          <p className="text-xs uppercase">
            {t("rapport.BYG0011.naavarendeBygning")}
          </p>
          <p className="ml-2 text-xs">
            {t("rapport.BYG0011.bygningsnummer")}:
            <span className="font-semibold">{` ${bygning.bygningsnummer}`}</span>
          </p>
        </div>

        <div>
          {/* Section title with status */}
          <div className="mb-6 flex items-baseline gap-2">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("rapport.BYG0011.naavarendeBygning")}
            </h2>
            {status && <Tag>{status}</Tag>}
          </div>

          <OmBygget
            bygningstypeKode={bygning.bygningstypeKode}
            naringsgruppeKode={bygning.naringsgruppeKode}
            etasjedata={bygning.etasjedata}
            representasjonspunkt={bygning.representasjonspunkt}
          />

          <div className="space-y-8">
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
        </div>
      </div>
    </section>
  )
}
