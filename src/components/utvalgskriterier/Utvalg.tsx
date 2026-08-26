import { Paragraph } from "@kv-designsystem/react"
import type { ComponentPropsWithoutRef } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "../../lib/utils/cn.ts"
import { UtvalgskriterieGruppe } from "./UtvalgskriterieGruppe.tsx"
import { erAngitt } from "./utils/erAngitt.ts"
import { formatKriterieVerdi } from "./utils/formatKriterier.ts"

export type Kriterie = {
  label: string
  // Verdier rendres på tekstform som "label: verdi".
  value: boolean | string | number | string[] | null | undefined
  // Trengs bare når flere kriterier i samme gruppe deler label
  key?: string
}

type Props = {
  readonly title: string
  readonly kriterier: Kriterie[]
} & Pick<ComponentPropsWithoutRef<"div">, "className">

export function Utvalg({ title, kriterier, className }: Readonly<Props>) {
  const { t } = useTranslation()

  const angitte = kriterier.filter(({ value }) => erAngitt(value))

  if (angitte.length === 0) return null

  return (
    <UtvalgskriterieGruppe title={title}>
      <div className={cn("space-y-2", className)}>
        {angitte.map(({ key, label, value }) => {
          const verdi = formatKriterieVerdi(value, t)
          if (!erAngitt(verdi)) return null

          return (
            <Paragraph
              key={key ?? label}
              data-size="sm"
              className="text-[0.625rem] leading-snug"
            >
              <span className="font-semibold">{label}: </span>
              {verdi}
            </Paragraph>
          )
        })}
      </div>
    </UtvalgskriterieGruppe>
  )
}
