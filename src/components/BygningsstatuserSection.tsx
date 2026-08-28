import { Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatDate } from "../lib/utils/formatDate.ts"
import { LabelValue } from "./utils/LabelValue.tsx"

type Props = Pick<Bygning, "bygningsstatuser">

const STATUSREKKEFØLGE = ["RA", "IG", "MB", "FA", "TB", "BR"] as const

export function BygningsstatuserSection({ bygningsstatuser }: Props) {
  const { t, i18n } = useTranslation()
  const tKey = "rapport.BYG0011.bygningsstatuser" as const

  return (
    <section className="space-y-2">
      <span className="flex break-after-avoid items-center gap-4">
        <Heading level={3} data-size="2xs" className="min-w-max font-medium">
          {t(`${tKey}.tittel`)}
        </Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      <div className="grid grid-flow-col grid-cols-6 grid-rows-2 gap-x-4 gap-y-0.5">
        {STATUSREKKEFØLGE.map((kode) => (
          <LabelValue
            key={kode}
            className="contents"
            label={oversettKode({ t, kodeverk: "bygningsstatus", kode })}
            value={formatDate(i18n, bygningsstatuser?.[kode], "-", {
              dateStyle: "short",
            })}
          />
        ))}
      </div>
    </section>
  )
}
