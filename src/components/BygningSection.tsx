import { Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import type { Kontaktperson } from "../lib/schema/reports/bygg/shared/kontaktperson.schema.ts"
import { ArealSection } from "./ArealSection.tsx"
import { Bruksenheter } from "./Bruksenheter.tsx"
import { BygningsstatuserSection } from "./BygningsstatuserSection.tsx"
import { EtasjerSection } from "./EtasjerSection.tsx"
import { Hjemmelshavere } from "./Hjemmelshavere.tsx"
import { Kontaktpersoner } from "./Kontaktpersoner.tsx"
import { Kulturminner } from "./KulturminneSection.tsx"
import { OmBygget } from "./OmBygget.tsx"
import { Tiltakshavere } from "./Tiltakshavere.tsx"

interface Props {
  readonly bygning: Bygning
}

export function BygningSection({ bygning }: Readonly<Props>) {
  const { t } = useTranslation()

  const bygningstype =
    bygning.bygningstypeKode?.kodeverdi != null
      ? `${bygning.bygningstypeKode.kodeverdi} ${bygning.bygningstypeKode.displayTekst ?? ""}`.trim()
      : ""
  const status = bygning.bygningstatusKode?.displayTekst ?? ""

  const tiltakshavere =
    bygning.kontaktpersoner?.filter(
      (k): k is Kontaktperson => k?.kontaktpersonKode?.kodeverdi === "T",
    ) ?? []

  const øvrigeKontaktpersoner =
    bygning.kontaktpersoner?.filter(
      (k): k is Kontaktperson => k?.kontaktpersonKode?.kodeverdi !== "T",
    ) ?? []

  return (
    <section className="flex flex-col gap-4">
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

        <div>
          {/* Section title with status */}
          <div className="mb-4 flex items-baseline gap-2">
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
            sefrakminner={bygning.sefrakminner}
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

            {tiltakshavere.length > 0 && (
              <Tiltakshavere tiltakshavere={tiltakshavere} />
            )}

            {øvrigeKontaktpersoner.length > 0 && (
              <Kontaktpersoner kontaktpersoner={øvrigeKontaktpersoner} />
            )}

            {bygning.hjemmelshavere && bygning.hjemmelshavere.length > 0 && (
              <Hjemmelshavere hjemmelshavere={bygning.hjemmelshavere} />
            )}

            {bygning.enkeltminner && bygning.enkeltminner.length > 0 && (
              <Kulturminner enkeltminner={bygning.enkeltminner} />
            )}
          </div>
      </div>
    </section>
  )
}
