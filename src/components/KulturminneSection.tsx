import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { LabelValue } from "./utils/LabelValue.tsx"
import { SectionTitle } from "./utils/SectionTitle.tsx"

type Props = Pick<Bygning, "enkeltminner">

export function Kulturminner({ enkeltminner }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.kulturminner" as const

  if (enkeltminner.length === 0) return null

  const enkeltminneNummer = enkeltminner
    .map((m) => m.enkeltminneNummer)
    .filter((v): v is string => v != null)

  const enkeltminneArtKoder = enkeltminner
    .map((m) => m.enkeltminneArtKode?.displayTekst)
    .filter((v): v is string => v != null)

  const vernetypeKoder = enkeltminner
    .map((m) => m.vernetypeKode?.displayTekst)
    .filter((v): v is string => v != null)

  const kulturminnekategoriKoder = enkeltminner
    .map((m) => m.kulturminnekategoriKode?.displayTekst)
    .filter((v): v is string => v != null)

  return (
    <div className="space-y-2">
      <SectionTitle>{t(`${tKey}.tittel`)}</SectionTitle>

      <div className="grid grid-cols-4 gap-4">
        <LabelValue
          label={t(`${tKey}.enkeltminneNr`)}
          value={enkeltminneNummer}
        />
        <LabelValue
          label={t(`${tKey}.enkeltminneArtKode`)}
          value={enkeltminneArtKoder}
        />
        <LabelValue label={t(`${tKey}.vernetypeKode`)} value={vernetypeKoder} />
        <LabelValue
          label={t(`${tKey}.kulturminnekategoriKode`)}
          value={kulturminnekategoriKoder}
        />
      </div>
    </div>
  )
}
