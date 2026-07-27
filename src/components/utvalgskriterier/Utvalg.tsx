import { Checkbox } from "@kv-designsystem/react"
import { cn } from "../../lib/utils/cn.ts"
import { SubSection } from "../SubSection.tsx"
import { erAngitt } from "./utils/erAngitt.ts"

export type Kriterium = {
  label: string
  value: boolean | string | number | null | undefined
  fullBredde?: boolean
}

type AngittKriterium = Kriterium & { value: NonNullable<Kriterium["value"]> }

type Props = {
  title: string
  kriterier: Kriterium[]
  className?: string
  inlineVerdier?: boolean
}

export function Utvalg({ title, kriterier, className, inlineVerdier }: Props) {
  const angitte = kriterier.filter((kriterium): kriterium is AngittKriterium =>
    erAngitt(kriterium.value),
  )

  if (angitte.length === 0) return null

  return (
    <SubSection title={title}>
      <div className={cn("grid grid-cols-4 gap-x-6 gap-y-4", className)}>
        {angitte.map(({ label, value, fullBredde }) =>
          typeof value === "boolean" ? (
            <Checkbox
              key={label}
              label={label}
              checked={value}
              className={cn(fullBredde && "col-span-full")}
            />
          ) : (
            <span
              key={label}
              className={cn(
                "flex",
                inlineVerdier ? "items-baseline gap-2" : "flex-col gap-1",
                fullBredde && "col-span-full",
              )}
            >
              <span className="text-kv-subtle">{label}</span>
              <span>{value}</span>
            </span>
          ),
        )}
      </div>
    </SubSection>
  )
}
