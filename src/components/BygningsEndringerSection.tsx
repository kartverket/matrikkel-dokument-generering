import { Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { ArealSection } from "./ArealSection.tsx"
import { Bruksenheter } from "./Bruksenheter.tsx"
import { BygningsstatuserSection } from "./BygningsstatuserSection.tsx"
import { OmBygget } from "./OmBygget.tsx"

type Props = Pick<Bygning, "bygningsendringer">

export function BygningsEndringerSection({ bygningsendringer }: Props) {
  const { t } = useTranslation()

  return (
    <>
      {bygningsendringer
        .filter((endring) => endring != null)
        .map((endring) => {
          const tittel = t(
            "rapport.BYG0011.bygningsendring",
            "Bygningsendring {{lopenummer}}",
            { lopenummer: endring.lopenummer },
          )
          const status = endring.bygningstatusKode?.displayTekst

          return (
            <section
              key={endring.lopenummer}
              className="flex gap-6"
              data-color="neutral"
            >
              <div className="bg-gray-200 p-4 text-right [writing-mode:sideways-lr]">
                <p className="text-xs uppercase">{tittel}</p>
                <p className="ml-2 text-xs">
                  {t("rapport.BYG0011.bygningsnummer")}:
                  <span className="font-semibold">{` ${endring.bygningsnummer}`}</span>
                </p>
              </div>

              <div className="flex-1 space-y-8">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-bold text-gray-900 text-lg">{tittel}</h2>
                  {status && <Tag>{status}</Tag>}
                </div>

                <OmBygget
                  bygningstypeKode={endring.bygningstypeKode}
                  naringsgruppeKode={endring.naeringsgruppeKode}
                  etasjedata={endring.etasjedata}
                  representasjonspunkt={undefined}
                />

                {endring.etasjedata != null && (
                  <ArealSection etasjedata={endring.etasjedata} />
                )}

                {endring.bygningsstatuser != null && (
                  <BygningsstatuserSection
                    bygningsstatuser={endring.bygningsstatuser}
                  />
                )}

                {endring.bruksenheter && endring.bruksenheter.length > 0 && (
                  <Bruksenheter bruksenheter={endring.bruksenheter} />
                )}
              </div>
            </section>
          )
        })}
    </>
  )
}
