import { type EpsgCode, resolveEpsg } from "./koordinatsystem"
import type {
  KartverketMapDefinition,
  MapRectangle,
  SearchWindow,
} from "./types"

const KARTVERKET_WMS_URL = "https://wms.geonorge.no/skwms1/wms.topo"
const MAP_WIDTH = 1600
const MAP_HEIGHT = 900
const MAP_ASPECT_RATIO = MAP_WIDTH / MAP_HEIGHT
const CONTEXT_PADDING = 0.3
const MINIMUM_CONTEXT_METRES = 75

interface Viewport {
  minNord: number
  maxNord: number
  minOst: number
  maxOst: number
  width: number
  height: number
}

function createViewport(sokevindu: SearchWindow): Viewport {
  const minOst = Math.min(sokevindu.nedreVenstre.ost, sokevindu.ovreHoeyre.ost)
  const maxOst = Math.max(sokevindu.nedreVenstre.ost, sokevindu.ovreHoeyre.ost)
  const minNord = Math.min(
    sokevindu.nedreVenstre.nord,
    sokevindu.ovreHoeyre.nord,
  )
  const maxNord = Math.max(
    sokevindu.nedreVenstre.nord,
    sokevindu.ovreHoeyre.nord,
  )

  const selectionWidth = Math.max(maxOst - minOst, MINIMUM_CONTEXT_METRES)
  const selectionHeight = Math.max(maxNord - minNord, MINIMUM_CONTEXT_METRES)
  let width = selectionWidth * (1 + CONTEXT_PADDING * 2)
  let height = selectionHeight * (1 + CONTEXT_PADDING * 2)

  if (width / height < MAP_ASPECT_RATIO) {
    width = height * MAP_ASPECT_RATIO
  } else {
    height = width / MAP_ASPECT_RATIO
  }

  const centerOst = (minOst + maxOst) / 2
  const centerNord = (minNord + maxNord) / 2

  return {
    minOst: centerOst - width / 2,
    maxOst: centerOst + width / 2,
    minNord: centerNord - height / 2,
    maxNord: centerNord + height / 2,
    width,
    height,
  }
}

function createSelectionRectangle(
  sokevindu: SearchWindow,
  viewport: Viewport,
): MapRectangle {
  const minOst = Math.min(sokevindu.nedreVenstre.ost, sokevindu.ovreHoeyre.ost)
  const maxOst = Math.max(sokevindu.nedreVenstre.ost, sokevindu.ovreHoeyre.ost)
  const minNord = Math.min(
    sokevindu.nedreVenstre.nord,
    sokevindu.ovreHoeyre.nord,
  )
  const maxNord = Math.max(
    sokevindu.nedreVenstre.nord,
    sokevindu.ovreHoeyre.nord,
  )

  const x = ((minOst - viewport.minOst) / viewport.width) * MAP_WIDTH
  const y = ((viewport.maxNord - maxNord) / viewport.height) * MAP_HEIGHT

  return {
    x,
    y,
    width: ((maxOst - minOst) / viewport.width) * MAP_WIDTH,
    height: ((maxNord - minNord) / viewport.height) * MAP_HEIGHT,
  }
}

function formatWmsCoordinate(value: number): string {
  return Number(value.toFixed(2)).toString()
}

function createImageUrl(viewport: Viewport, epsg: EpsgCode): string {
  const parameters = new URLSearchParams({
    service: "WMS",
    version: "1.3.0",
    request: "GetMap",
    layers: "topo",
    styles: "",
    crs: `EPSG:${epsg}`,
    bbox: [viewport.minOst, viewport.minNord, viewport.maxOst, viewport.maxNord]
      .map(formatWmsCoordinate)
      .join(","),
    width: MAP_WIDTH.toString(),
    height: MAP_HEIGHT.toString(),
    format: "image/png",
    transparent: "false",
    exceptions: "INIMAGE",
  })

  return `${KARTVERKET_WMS_URL}?${parameters.toString()}`
}

function createScaleBar(viewportWidth: number): {
  label: string
  width: number
} {
  const targetLength = viewportWidth * 0.16
  const magnitude = 10 ** Math.floor(Math.log10(targetLength))
  const normalizedTarget = targetLength / magnitude
  const niceFactor = [1, 2, 5].reduce(
    (current, candidate) =>
      candidate <= normalizedTarget ? candidate : current,
    1,
  )
  const lengthInMetres = niceFactor * magnitude

  return {
    label:
      lengthInMetres >= 1000
        ? `${lengthInMetres / 1000} km`
        : `${lengthInMetres} m`,
    width: (lengthInMetres / viewportWidth) * MAP_WIDTH,
  }
}

export function createKartverketMap(
  sokevindu: SearchWindow,
  koordinatsystem: string,
): KartverketMapDefinition {
  const epsg = resolveEpsg(koordinatsystem)

  if (!epsg) {
    throw new Error(`Koordinatsystemet "${koordinatsystem}" støttes ikke`)
  }

  const viewport = createViewport(sokevindu)
  const scaleBar = createScaleBar(viewport.width)

  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    epsg,
    imageUrl: createImageUrl(viewport, epsg),
    scaleBar,
    selection: createSelectionRectangle(sokevindu, viewport),
  }
}
