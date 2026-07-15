import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

interface Props {
  label: ReactNode
  value: ReactNode
  className?: string
}

export function EndringsDetalje({ label, value, className = "" }: Props) {
  const { t } = useTranslation()

  return (
    <div className={className}>
      <dt className="text-kv-subtle text-sm">{label}</dt>
      <dd className="mt-1 font-medium">
        {value ?? t("rapport.BYG0011.bruksenheter.tom")}
      </dd>
    </div>
  )
}
