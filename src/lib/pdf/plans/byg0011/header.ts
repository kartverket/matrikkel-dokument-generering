import type { TFunction } from "i18next"
import { oversettKode } from "../../../i18n/koder/oversettKode.ts"
import type { RapportMeta } from "../../../schema/core/meta.schema.ts"
import type {
  Byg0011Rapport,
  Bygning,
} from "../../../schema/reports/bygg/byg0011/byggRapport.schema.ts"
import type { PageBoxes, PageDef } from "../../pagePlan"

function buildHeader(
  metadata: RapportMeta,
  bygning: Bygning | undefined,
  t: TFunction,
): PageBoxes {
  const { kommune, koordinatSystemKode } = metadata
  const koordinatSystemNavn = oversettKode({
    t,
    kodeverk: "koordinat",
    kode: koordinatSystemKode,
  })

  const venstreSide = [
    t("pdf.header.kommune", {
      kommuneNr: kommune.kommuneNr,
      kommuneNavn:
        kommune.kommuneNavn.charAt(0).toUpperCase() +
        kommune.kommuneNavn.slice(1).toLowerCase(),
    }),
    t("pdf.header.koordinatsystem", {
      kode: koordinatSystemKode,
      navn: koordinatSystemNavn,
    }),
  ].join(" ")

  const hoyreSide = bygning
    ? t("pdf.header.bygg", { bygningsnr: bygning.bygningsnr })
    : undefined

  return {
    left: venstreSide,
    right: hoyreSide,
  }
}

export function buildByg0011HeaderPages(
  rapport: Byg0011Rapport,
  t: TFunction,
): PageDef[] {
  const { metadata, bygninger } = rapport
  const enesteBygning = bygninger.length === 1 ? bygninger[0] : undefined
  const pages: PageDef[] = [
    {
      name: "utvalgskriterier",
      header: buildHeader(metadata, enesteBygning, t),
    },
  ]

  bygninger.forEach((bygning, index) => {
    const pagePrefix = `bygg-${index + 1}`
    const header = buildHeader(metadata, bygning, t)

    pages.push(
      { name: `${pagePrefix}-oversikt`, header },
      { name: `${pagePrefix}-bruksenhet`, header },
    )
  })

  return pages
}
