import { useTranslation } from "react-i18next"
import { Section } from "../components/Section.tsx"
import { BygningsstatusKriterier } from "../components/utvalgskriterier/BygningsstatusKriterier"
import { OmfangsKriterier } from "../components/utvalgskriterier/OmfangsKriterier.tsx"
import { SokevinduKriterier } from "../components/utvalgskriterier/SokevinduKriterier"
import { Utvalg } from "../components/utvalgskriterier/Utvalg.tsx"
import type { ByggUtvalgskriterier as UtvalgskriterierType } from "../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"

interface Props {
  index: number
  kriterier: UtvalgskriterierType
}

export function ByggUtvalgskriterier({ index, kriterier }: Props) {
  const { t } = useTranslation()

  return (
    <Section index={index} title={t("rapport.BYG0011.utvalgskriterier.title")}>
      {kriterier && (
        <div className="flex flex-col gap-10 mb-2">
          <OmfangsKriterier
            omfangsKriterier={kriterier.omfang}
            bygningKriterier={kriterier.bygning}
          />
          <Utvalg gruppe="subrapporter" kriterier={kriterier.subrapporter} />

          <Utvalg
            gruppe="adresse"
            className="grid-cols-7"
            kriterier={kriterier.adresse}
          />

          <div className="grid grid-cols-2 gap-10">
            <Utvalg
              gruppe="matrikkelenhet"
              kriterier={kriterier.matrikkelenhet}
            />
            <Utvalg gruppe="aktor" kriterier={kriterier.aktor} />
            <BygningsstatusKriterier
              bygningsstatusKriterier={kriterier.bygningsstatus}
            />
            <SokevinduKriterier sokevinduKriterier={kriterier.sokevindu} />
          </div>
        </div>
      )}
    </Section>
  )
}
