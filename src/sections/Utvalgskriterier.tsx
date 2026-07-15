import { useTranslation } from "react-i18next"
import { Section } from "../components/Section.tsx"
import { AdresseKriterier } from "../components/utvalgskriterier/AdresseKriterier"
import { BygningKriterier } from "../components/utvalgskriterier/BygningKriterier"
import { BygningsstatusKriterier } from "../components/utvalgskriterier/BygningsstatusKriterier"
import { HjemmelshaverKriterier } from "../components/utvalgskriterier/HjemmelshaverKriterier"
import { MatrikkelenhetKriterier } from "../components/utvalgskriterier/MatrikkelenhetKriterier"
import { RapportutvalgKriterier } from "../components/utvalgskriterier/RapportutvalgKriterier"
import { SokevinduKriterier } from "../components/utvalgskriterier/SokevinduKriterier"
import { SubrapporterKriterier } from "../components/utvalgskriterier/SubrapporterKriterier"
import type { Utvalgskriterier as UtvalgskriterierType } from "../lib/schema/byggRapportSchema"

interface Props {
  index: number
  kriterier: UtvalgskriterierType
}

export function Utvalgskriterier({ index, kriterier }: Props) {
  const { t } = useTranslation()

  return (
    <Section index={index} title={t("rapport.BYG0011.utvalgskriterier.title")}>
      <div className="flex flex-col gap-10">
        <RapportutvalgKriterier omfangsKriterier={kriterier.omfang} />
        <BygningKriterier bygningKriterier={kriterier.bygning} />
        <AdresseKriterier adresseKriterier={kriterier.adresse} />

        <div className="grid break-inside-avoid grid-cols-2 gap-6">
          <MatrikkelenhetKriterier
            matrikkelenhetKriterier={kriterier.matrikkelenhet}
          />
          <HjemmelshaverKriterier
            hjemmelshaverKriterier={kriterier.hjemmelshaver}
          />
        </div>

        <BygningsstatusKriterier
          bygningsstatusKriterier={kriterier.bygningsstatus}
        />
        <SokevinduKriterier sokevinduKriterier={kriterier.sokevindu} />
        <SubrapporterKriterier subrapporterKriterier={kriterier.subrapporter} />
      </div>
    </Section>
  )
}
