import { useTranslation } from "react-i18next"
import { Section } from "../components/Section.tsx"
import { AdresseKriterier } from "../components/utvalgskriterier/AdresseKriterier"
import { AktorKriterier } from "../components/utvalgskriterier/AktorKriterier.tsx"
import { BygningKriterier } from "../components/utvalgskriterier/BygningKriterier"
import { BygningsstatusKriterier } from "../components/utvalgskriterier/BygningsstatusKriterier"
import { MatrikkelenhetKriterier } from "../components/utvalgskriterier/MatrikkelenhetKriterier"
import { RapportutvalgKriterier } from "../components/utvalgskriterier/RapportutvalgKriterier"
import { SokevinduKriterier } from "../components/utvalgskriterier/SokevinduKriterier"
import { SubrapporterKriterier } from "../components/utvalgskriterier/SubrapporterKriterier"
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
        <div className="flex flex-col gap-10">
          <RapportutvalgKriterier omfangsKriterier={kriterier.omfang} />
          <BygningKriterier bygningKriterier={kriterier.bygning} />
          <AdresseKriterier adresseKriterier={kriterier.adresse} />

          <div className="grid grid-cols-2 gap-6">
            <MatrikkelenhetKriterier
              matrikkelenhetKriterier={kriterier.matrikkelenhet}
            />
            <AktorKriterier aktorKriterier={kriterier.aktor} />
          </div>

          <BygningsstatusKriterier
            bygningsstatusKriterier={kriterier.bygningsstatus}
          />
          <SokevinduKriterier sokevinduKriterier={kriterier.sokevindu} />
          <SubrapporterKriterier
            subrapporterKriterier={kriterier.subrapporter}
          />
        </div>
      )}
    </Section>
  )
}
