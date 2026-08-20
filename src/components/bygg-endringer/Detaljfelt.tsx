import type { ParseKeys } from "i18next"
import { useTranslation } from "react-i18next"
import { cn } from "../../lib/utils/cn.ts"
import { getValueOrEmpty } from "../../lib/utils/getValueOrEmpty.ts"

interface Props {
  readonly label: string
  readonly value: string
  readonly className?: string
  readonly valueClassName?: string
  readonly erTom?: boolean
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
}: Readonly<Props>) {
  return (
    <div className={className}>
      <dt className="text-kv-subtle">{label}</dt>
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
  readonly felter: DetaljfeltData[]
  readonly tom: string
  readonly className?: string
}

export function Detaljgrid({
  felter,
  tom,
  className,
}: Readonly<DetaljgridProps>) {
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
