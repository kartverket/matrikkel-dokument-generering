import { z } from "zod"

const EUREF89_UTM_EPSG_CODES = [
  25829, 25830, 25831, 25832, 25833, 25834, 25835, 25836,
] as const
const WGS84_UTM_EPSG_CODES = [
  32629, 32630, 32631, 32632, 32633, 32634, 32635, 32636,
] as const
const EUREF89_NTM_EPSG_CODES = [
  5105, 5106, 5107, 5108, 5109, 5110, 5111, 5112, 5113, 5114, 5115, 5116, 5117,
  5118, 5119, 5120, 5121, 5122, 5123, 5124, 5125, 5126, 5127, 5128, 5129, 5130,
] as const

const SUPPORTED_EPSG_CODES = [
  ...EUREF89_UTM_EPSG_CODES,
  ...WGS84_UTM_EPSG_CODES,
  ...EUREF89_NTM_EPSG_CODES,
] as const

export const epsgCodeSchema = z.literal(SUPPORTED_EPSG_CODES)
export type EpsgCode = z.infer<typeof epsgCodeSchema>

function parseEpsgCode(value: number): EpsgCode | undefined {
  const result = epsgCodeSchema.safeParse(value)
  return result.success ? result.data : undefined
}

export function resolveEpsg(koordinatsystem: string): EpsgCode | undefined {
  const explicitEpsg = koordinatsystem.match(/^\s*EPSG\s*:?\s*(\d{4,5})\s*$/i)

  if (explicitEpsg) {
    return parseEpsgCode(Number(explicitEpsg[1]))
  }

  const system = koordinatsystem.match(
    /^\s*(\d+)\s*-\s*(EUREF89|WGS84)\s+(UTM|NTM)\s+sone\s+(\d+)\s*$/i,
  )

  if (!system) {
    return undefined
  }

  const kode = Number(system[1])
  const datum = system[2].toUpperCase()
  const projeksjon = system[3].toUpperCase()
  const sone = Number(system[4])

  if (datum === "EUREF89" && projeksjon === "UTM" && kode === sone - 10) {
    return parseEpsgCode(25800 + sone)
  }

  if (datum === "EUREF89" && projeksjon === "NTM" && kode === 100 + sone) {
    return parseEpsgCode(5100 + sone)
  }

  if (datum === "WGS84" && projeksjon === "UTM" && kode === 300 + sone) {
    return parseEpsgCode(32600 + sone)
  }

  return undefined
}

export const koordinatsystemSchema = z.string().min(1).refine(resolveEpsg, {
  message: "Koordinatsystemet støttes ikke",
})
