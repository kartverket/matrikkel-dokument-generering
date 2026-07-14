import type { MapRectangle, ScaleBar } from "../../lib/map/types"

const LABEL_WIDTH = 210
const LABEL_HEIGHT = 32
const LABEL_GAP = 12
const SCALE_BAR_X = 32
const SCALE_BAR_BOTTOM = 32

interface Props {
  width: number
  height: number
  selection: MapRectangle
  selectionLabel: string
  scaleBar: ScaleBar
}

export function KartUtvalg({
  width,
  height,
  selection,
  selectionLabel,
  scaleBar,
}: Props) {
  const centerX = selection.x + selection.width / 2
  const labelX = centerX - LABEL_WIDTH / 2
  const labelY = selection.y - LABEL_HEIGHT - LABEL_GAP
  const scaleBarY = height - SCALE_BAR_BOTTOM
  const scaleBarCenter = SCALE_BAR_X + scaleBar.width / 2

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 z-20 size-full"
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect
        x={selection.x}
        y={selection.y}
        width={selection.width}
        height={selection.height}
        className="fill-kv-blue/15 stroke-6 stroke-kv-blue"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x={selection.x}
        y={selection.y}
        width={selection.width}
        height={selection.height}
        className="fill-none stroke-2 stroke-white"
        vectorEffect="non-scaling-stroke"
      />

      {[
        [selection.x, selection.y],
        [selection.x + selection.width, selection.y],
        [selection.x, selection.y + selection.height],
        [selection.x + selection.width, selection.y + selection.height],
      ].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={10}
          className="fill-kv-blue stroke-5 stroke-white"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <g>
        <rect
          x={labelX}
          y={labelY}
          width={LABEL_WIDTH}
          height={LABEL_HEIGHT}
          rx={LABEL_HEIGHT / 2}
          className="fill-kv-blue drop-shadow-sm"
        />
        <text
          x={centerX}
          y={labelY + LABEL_HEIGHT / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-semibold text-[16px] uppercase tracking-wider"
        >
          {selectionLabel}
        </text>
      </g>

      <g>
        <text
          x={scaleBarCenter}
          y={scaleBarY - 14}
          textAnchor="middle"
          className="fill-white stroke-3 stroke-black/70 font-semibold text-[16px] [paint-order:stroke]"
        >
          {scaleBar.label}
        </text>
        <path
          d={`M ${SCALE_BAR_X} ${scaleBarY - 10} V ${scaleBarY} H ${SCALE_BAR_X + scaleBar.width} V ${scaleBarY - 10}`}
          className="fill-none stroke-4 stroke-white drop-shadow-sm"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
