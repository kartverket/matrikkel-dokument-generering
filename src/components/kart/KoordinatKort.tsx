import type { Coordinate } from "../../lib/map/types"

interface Props {
  label: string
  nordLabel: string
  ostLabel: string
  koordinat: Coordinate
  locale: string
}

export function KoordinatKort({
  label,
  nordLabel,
  ostLabel,
  koordinat,
  locale,
}: Props) {
  const numberFormatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  })

  return (
    <div className="min-w-52 rounded-md border border-black/20 bg-white/95 px-3 py-2.5 shadow-md backdrop-blur-sm">
      <p className="mb-1.5 flex items-center gap-2 font-semibold text-[#1f2b33] text-[0.625rem] uppercase tracking-widest">
        <span className="size-2 rounded-full bg-kv-blue" aria-hidden="true" />
        {label}
      </p>
      <dl className="grid grid-cols-2 gap-4">
        <div className="flex items-baseline gap-1.5">
          <dt className="text-[#52636d] text-xs">{nordLabel}</dt>
          <dd className="font-semibold text-[#1f2b33] text-sm tabular-nums">
            {numberFormatter.format(koordinat.nord)}
          </dd>
        </div>
        <div className="flex items-baseline gap-1.5">
          <dt className="text-[#52636d] text-xs">{ostLabel}</dt>
          <dd className="font-semibold text-[#1f2b33] text-sm tabular-nums">
            {numberFormatter.format(koordinat.ost)}
          </dd>
        </div>
      </dl>
    </div>
  )
}
