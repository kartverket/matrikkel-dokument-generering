import type { ParseKeys } from "i18next"
import { useTranslation } from "react-i18next"
import { cn } from "../lib/utils/cn"
import { getValueOrEmpty } from "../lib/utils/getValueOrEmpty.ts"

interface Props {
  label: string
  value: string
  className?: string
  valueClassName?: string
  erTom?: boolean
}

export interface DetaljfeltData {
  key: string
  labelKey: ParseKeys
  value: string | null | undefined
  className?: string
  valueClassName?: string
}

type DetaljfeltOptions = Pick<DetaljfeltData, "className" | "valueClassName">
type TranslationKey = Extract<ParseKeys, string>
type DetaljfeltKey<
  Prefix extends string,
  Key = TranslationKey,
> = Key extends `${Prefix}.${infer Suffix}` ? Suffix : never

export function lagDetaljfelt(
  labelKey: ParseKeys,
  value: DetaljfeltData["value"],
  options: DetaljfeltOptions = {},
): DetaljfeltData {
  return { key: labelKey, labelKey, value, ...options }
}

export function lagDetaljfeltBuilder<const Prefix extends string>(
  prefix: Prefix,
) {
  return (
    key: DetaljfeltKey<Prefix>,
    value: DetaljfeltData["value"],
    options: DetaljfeltOptions = {},
  ) => lagDetaljfelt(`${prefix}.${key}` as ParseKeys, value, options)
}

export function Detaljfelt({
  label,
  value,
  className = "",
  valueClassName = "",
  erTom = false,
}: Props) {
  return (
    <div className={className}>
      <dt className="text-kv-subtle text-sm">{label}</dt>
      <dd
        className={cn(
          "mt-1",
          erTom ? "text-kv-subtle" : "font-medium",
          valueClassName,
        )}
      >
        {value}
      </dd>
    </div>
  )
}

interface DetaljgridProps {
  felter: DetaljfeltData[]
  tom: string
  className?: string
}

export function Detaljgrid({ felter, tom, className }: DetaljgridProps) {
  const { t } = useTranslation()

  return (
    <dl className={cn("grid grid-cols-4 gap-x-7 gap-y-4", className)}>
      {felter.map(
        ({
          key,
          labelKey,
          value,
          className: feltClassName,
          valueClassName,
        }) => (
          <Detaljfelt
            key={key}
            label={t(labelKey)}
            className={feltClassName}
            valueClassName={valueClassName}
            {...getValueOrEmpty(value, tom)}
          />
        ),
      )}
    </dl>
  )
}
