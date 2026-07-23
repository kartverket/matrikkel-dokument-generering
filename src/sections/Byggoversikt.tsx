import { Divider } from "@digdir/designsystemet-react"
import { useTranslation } from "react-i18next"
import ArealFordeling from "../components/byggoversikt/ArealFordeling"
import ByggSammendrag from "../components/byggoversikt/ByggSammendrag"
import BygningHeader from "../components/byggoversikt/BygningHeader"
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
  // Dette vil si hvordan bygget ser ut i dag, med alle endringer som er registrert i matrikkelen.
  const gjeldendeTilstand = aggregerGjeldendeTilstand(byggEndringer)

  return (
    <Section index={index} title={t("rapport.BYG0011.byggoversikt.title")}>
      <div className="mt-8 space-y-8">
        <BygningHeader
          byggNr={byggNr}
          gjeldendeStatusKode={
            gjeldendeTilstand?.byggMetaEndring?.bygningsStatusKode
          }
        />
        <Divider />

        <div className="flex flex-col gap-8 p-8">
          {gjeldendeTilstand && (
            <>
              <Nokkeltall gjeldendeEndring={gjeldendeTilstand} />
              <Oversiktsfelt
                byggTypeKode={
                  gjeldendeTilstand?.byggMetaEndring?.bygningsTypeKode
                }
                antallBoenheter={
                  gjeldendeTilstand?.byggMetaEndring?.antallBoenheter
                }
                antallBruksenheter={gjeldendeTilstand?.bruksenheter.length}
                naeringsgruppe={
                  gjeldendeTilstand?.byggMetaEndring?.naeringsgruppe
                }
                koordinater={gjeldendeTilstand?.byggKoordinatEndring}
              />
              <ArealFordeling etasjePlan={gjeldendeTilstand.etasjePlan} />
            </>
          )}
          <ByggSammendrag byggEndringer={byggEndringer} />
        </div>
      </div>
    </Section>
  )
}
