import { Checkbox } from "@kv-designsystem/react"
import type { ParseKeys } from "i18next"
import { useTranslation } from "react-i18next"
import { cn } from "../../lib/utils/cn.ts"
import { SubSection } from "../SubSection.tsx"
import { erAngitt } from "./utils/erAngitt.ts"

export type Kriterie = {
  label: string
  // boolean rendres som checkbox, lister avkortes til maks 5 verdier
  // med en "+N"-chip for resten.
  value: boolean | string | number | string[] | null | undefined
  fullBredde?: boolean
  // Trengs bare når flere kriterier i samme gruppe deler label
  key?: string
}

type Felter = Record<string, boolean | string | number | null | undefined>

type Props = {
  className?: string
  // Legger label og verdi på samme linje i stedet for stablet over hverandre
  inlineVerdier?: boolean
} & (
  | { title: string; gruppe?: never; kriterier: Kriterie[] }
  | { title?: string; gruppe: string; kriterier: Felter | null | undefined }
)

const uk = "rapport.BYG0011.utvalgskriterier"
const MAKS_VISTE_VERDIER = 5

export function Utvalg(props: Props) {
  const { t } = useTranslation()
  const { className, inlineVerdier } = props

  const oversett = (felt: string) =>
    t(`${uk}.${props.gruppe}.${felt}` as ParseKeys)

  const angitte: Kriterie[] = (
    Array.isArray(props.kriterier)
      ? props.kriterier
      : Object.entries(props.kriterier ?? {}).map(([felt, value]) => ({
          key: felt,
          label: oversett(felt),
          value,
        }))
  ).filter(({ value }) => erAngitt(value))

  if (angitte.length === 0) return null

  return (
    <SubSection title={props.title ?? oversett("tittel")}>
      <div className={cn("grid grid-cols-4 gap-x-6 gap-y-4", className)}>
        {angitte.map(({ key, label, value, fullBredde }) =>
          typeof value === "boolean" ? (
            <Checkbox
              key={key ?? label}
              label={label}
              checked={value}
              className={cn(fullBredde && "col-span-full")}
            />
          ) : (
            <span
              key={key ?? label}
              className={cn(
                "flex min-w-0",
                inlineVerdier ? "items-baseline gap-2" : "flex-col gap-1",
                fullBredde && "col-span-full",
              )}
            >
              <span className="text-kv-subtle">{label}</span>
              {Array.isArray(value) ? (
                <span className="flex min-w-0">
                  <span className="truncate">
                    {value.slice(0, MAKS_VISTE_VERDIER).join(", ")}
                    {value.length > MAKS_VISTE_VERDIER && "..."}
                  </span>
                  {value.length > MAKS_VISTE_VERDIER && (
                    <span className="ml-2 shrink-0 text-kv-subtle">
                      {`+ `}
                      {value.length - MAKS_VISTE_VERDIER}
                    </span>
                  )}
                </span>
              ) : (
                <span>{value}</span>
              )}
            </span>
          ),
        )}
      </div>
    </SubSection>
  )
}
