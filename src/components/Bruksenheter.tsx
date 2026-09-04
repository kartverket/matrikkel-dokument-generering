import { useTranslation } from "react-i18next"
import type { Bruksenhet } from "../lib/schema/reports/bygg/shared/bruksenhet.schema.ts"
import { TableSection } from "./utils/TableSection.tsx"

type Props = Readonly<{
  bruksenheter: Bruksenhet[]
}>

export function Bruksenheter({ bruksenheter }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.byggEndringer.bruksenheter" as const

  const filtrerteEnheter: Bruksenhet[] =
    bruksenheter

  if (filtrerteEnheter.length === 0) {
    return null
  }

  const columns = [
    {
      key: "bruksenhetsnummer",
      labelKey: t(`${tKey}.bruksenhetsNr`),
      render: (item: Bruksenhet) => item.bruksenhetsnummer,
    },
    {
      key: "type",
      labelKey: t(`${tKey}.bruksenhetsTypeKode`),
      render: (item: Bruksenhet) =>
        item.bruksenhetsTypeKode?.displayTekst ?? "-",
    },
    {
      key: "areal",
      labelKey: t(`${tKey}.bruksAreal`),
      align: "right" as const,
      render: (item: Bruksenhet) =>
        item.bruksareal != null ? `${item.bruksareal} m²` : "-",
    },
    {
      key: "rom",
      labelKey: t(`${tKey}.antallRom`),
      align: "right" as const,
      render: (item: Bruksenhet) => item.antallRom ?? "-",
    },
    {
      key: "bad",
      labelKey: t(`${tKey}.antallBad`),
      align: "right" as const,
      render: (item: Bruksenhet) => item.antallBad ?? "-",
    },
    {
      key: "wc",
      labelKey: t(`${tKey}.antallWC`),
      align: "right" as const,
      render: (item: Bruksenhet) => item.antallWC ?? "-",
    },
    {
      key: "kjokken",
      labelKey: t(`${tKey}.kjokkenTilgangKode`),
      render: (item: Bruksenhet) => item.kjokkentilgang?.displayTekst ?? "-",
    },
    {
      key: "adresse",
      labelKey: t(`${tKey}.adresse`),
      render: (item: Bruksenhet) =>
        item.adresseIdentRapportInfo?.adresseAsString ?? "-",
    },
    {
      key: "matrikkelnr",
      labelKey: t(`${tKey}.matrikkelNr`),
      render: (item: Bruksenhet) =>
        item.matrikkelnrRapportInfo?.matrikkelNummer ?? "-",
    },
  ]

  return (
    <TableSection
      title={t(`${tKey}.tittel_other`)}
      items={filtrerteEnheter}
      columns={columns}
      rowKey={(item) => item.bruksenhetsnummer ?? Math.random().toString()}
    />
  )
}
