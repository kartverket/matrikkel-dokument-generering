import { Divider } from "@digdir/designsystemet-react"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/byggoversikt/ArealFordeling"
import BygningHeader from "../components/byggoversikt/BygningHeader"
import Historikk from "../components/byggoversikt/Historikk"
import Nokkeltall from "../components/byggoversikt/Nokkeltall"
import Oversiktsfelt from "../components/byggoversikt/Oversiktsfelt"
import { Section } from "../components/Section"
import type { Bygning } from "../lib/schema/byggRapportSchema"
import { finnGjeldendeBygningsendring } from "../lib/utils/isFerdigstilt"

interface Props {
  index: number
  bygning: Bygning
  koordinatsystem: string
}

export default function Byggoversikt({
  bygning,
  index,
  koordinatsystem,
}: Props) {
  const { t } = useTranslation()
  const gjeldende = finnGjeldendeBygningsendring(bygning.endringer)

  return (
    <Section index={index} title={t("rapport.BYG0011.byggoversikt.title")}>
      <div className="mt-8 space-y-8 rounded-xl border border-kv-blue-subtle p-8">
        <BygningHeader bygning={bygning} endring={gjeldende} />
        <Divider />
        <Nokkeltall endring={gjeldende} />
        <Oversiktsfelt
          bygning={bygning}
          endring={gjeldende}
          koordinatsystem={koordinatsystem}
        />
        <ArealFordeling endring={gjeldende} />
        <Historikk endringer={bygning.endringer} />
      </div>
    </Section>
  )
}
