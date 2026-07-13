import { Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
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
  kriterier: UtvalgskriterierType
}

export function Utvalgskriterier({ kriterier }: Props) {
  const { t } = useTranslation()

  return (
    <section className="my-16 flex flex-col gap-10">
      <Heading className="font-normal text-kv-subtle text-lg">
        {t("rapport.BYG0011.utvalgskriterier.title")}
      </Heading>

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
    </section>
  )
}
