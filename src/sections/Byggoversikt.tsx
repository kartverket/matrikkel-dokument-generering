import { Divider } from "@digdir/designsystemet-react"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/byggoversikt/ArealFordeling"
import BygningHeader from "../components/byggoversikt/BygningHeader"
import Historikk from "../components/byggoversikt/Historikk"
import Nokkeltall from "../components/byggoversikt/Nokkeltall"
import Oversiktsfelt from "../components/byggoversikt/Oversiktsfelt"
import { Section } from "../components/Section"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byg0011.schema"
import { finnGjeldendeBygningsendring } from "../lib/utils/isFerdigstilt"

interface Props {
  index: number
  bygning: Bygning
}

export default function Byggoversikt({ bygning, index }: Props) {
  const { t } = useTranslation()
  const gjeldendeEndring = finnGjeldendeBygningsendring(bygning.endringer)

  return (
    <Section index={index} title={t("rapport.BYG0011.byggoversikt.title")}>
      <div className="mt-8 space-y-8 rounded-xl border border-kv-blue-subtle p-8">
        <BygningHeader bygning={bygning} />
        <Divider />
        <Nokkeltall gjeldendeEndring={gjeldendeEndring} />
        <Oversiktsfelt bygning={bygning} gjeldendeEndring={gjeldendeEndring} />
        <ArealFordeling etasjePlan={bygning.etasjePlan} />
        <Historikk byggEndringer={bygning.endringer} />
      </div>
    </Section>
  )
}
