import { Divider } from "@digdir/designsystemet-react"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/byggoversikt/ArealFordeling"
import BygningHeader from "../components/byggoversikt/BygningHeader"
import Historikk from "../components/byggoversikt/Historikk"
import Nokkeltall from "../components/byggoversikt/Nokkeltall"
import Oversiktsfelt from "../components/byggoversikt/Oversiktsfelt"
import { aggregerGjeldendeTilstand } from "../components/byggoversikt/utils/gjeldendeTilstand.ts"
import { Section } from "../components/Section"
import type { BygningsEndring } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"

interface Props {
  index: number
  byggNr: string
  byggEndringer: BygningsEndring[]
}

export default function Byggoversikt({ byggEndringer, index, byggNr }: Props) {
  const { t } = useTranslation()

  // Den gjeldende tilstanden til bygget aggregert fra basisregistreringen og ferdigstilte/tatte-i-bruk endringer
  const gjeldendeTilstand = aggregerGjeldendeTilstand(byggEndringer)

  return (
    <Section index={index} title={t("rapport.BYG0011.byggoversikt.title")}>
      <div className="mt-8 space-y-8 rounded-xl border border-kv-blue-subtle p-8">
        <BygningHeader
          byggNr={byggNr}
          gjeldendeTypeKode={
            gjeldendeTilstand?.byggMetaEndring?.bygningsTypeKode
          }
          gjeldendeStatusKode={
            gjeldendeTilstand?.byggMetaEndring?.bygningsStatusKode
          }
        />
        <Divider />

        {gjeldendeTilstand && (
          <>
            <Nokkeltall gjeldendeEndring={gjeldendeTilstand} />
            <Oversiktsfelt
              byggNr={byggNr}
              gjeldendeEndring={gjeldendeTilstand}
            />
            <ArealFordeling etasjePlan={gjeldendeTilstand.etasjePlan} />
          </>
        )}
        <Historikk byggEndringer={byggEndringer} />
      </div>
    </Section>
  )
}
