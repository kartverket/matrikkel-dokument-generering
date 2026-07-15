import type { EpsgCode } from "./koordinatsystem"

export interface Coordinate {
  nord: number
  ost: number
}

export interface SearchWindow {
  nedreVenstre: Coordinate
  ovreHoeyre: Coordinate
}

export interface MapRectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface ScaleBar {
  label: string
  width: number
}

export interface KartverketMapDefinition {
  width: number
  height: number
  epsg: EpsgCode
  imageUrl: string
  scaleBar: ScaleBar
  selection: MapRectangle
}
