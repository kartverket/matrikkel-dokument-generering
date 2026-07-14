import { Card } from "@kv-designsystem/react"
import { CompassIcon } from "@navikt/aksel-icons"
import type { PropsWithChildren } from "react"
import type { EpsgCode } from "../../lib/schema/rapportSchema"

interface Props extends PropsWithChildren {
  imageUrl: string
  epsg: EpsgCode
  fallbackText: string
  accessibleLabel: string
}

export function Kart({
  imageUrl,
  epsg,
  fallbackText,
  accessibleLabel,
  children,
}: Props) {
  return (
    <Card className="overflow-hidden border border-kv-border">
      <Card.Block className="p-0">
        <figure
          className="relative aspect-video overflow-hidden bg-[#e8edf0]"
          aria-label={accessibleLabel}
        >
          <div
            className="absolute inset-0 flex items-center justify-center text-kv-subtle text-sm"
            aria-hidden="true"
          >
            {fallbackText}
          </div>

          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 size-full object-cover"
            decoding="sync"
            fetchPriority="high"
          />

          {children}

          <span className="absolute top-3 left-3 z-30 flex size-11 items-center justify-center rounded-full border border-black/20 bg-white/95 text-kv-blue shadow-sm">
            <CompassIcon aria-hidden className="size-7" />
          </span>
          <span className="absolute top-3 right-3 z-30 rounded-md border border-black/15 bg-white/95 px-2.5 py-1 font-semibold text-[#34454f] text-[0.625rem] tracking-wide shadow-sm">
            EPSG:{epsg}
          </span>
        </figure>
      </Card.Block>
    </Card>
  )
}
