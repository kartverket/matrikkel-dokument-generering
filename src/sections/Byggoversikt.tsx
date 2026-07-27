import { useTranslation } from "react-i18next"
import BygningHeader from "../components/bygg/BygningHeader.tsx"
import ByggOversiktAreal from "../components/byggoversikt/ByggOversiktAreal.tsx"
import ByggSammendrag from "../components/byggoversikt/ByggSammendrag"
import Oversiktsfelt from "../components/byggoversikt/Oversiktsfelt"
import { aggregerGjeldendeTilstand } from "../components/byggoversikt/utils/gjeldendeTilstand.ts"
import { Section } from "../components/Section"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

interface Props {
  index: number
  bygning: Bygning
  bygningIndeks: number
  antallBygninger: number
}

export default function Byggoversikt({
  index,
  bygning,
  bygningIndeks,
  antallBygninger,
}: Props) {
  const { t } = useTranslation()

  // Den gjeldende tilstanden til bygget aggregert fra basisregistreringen og ferdigstilte/tatte-i-bruk endringer
  // Dette vil si hvordan bygget ser ut i dag, med alle endringer som er registrert i matrikkelen.
  const gjeldendeTilstand = aggregerGjeldendeTilstand(bygning.endringer)

  const innhold = (
    <div className="space-y-8">
      <div className="break-inside-avoid space-y-8">
        <BygningHeader
          byggNr={bygning.bygningsnr}
          bygningIndeks={bygningIndeks}
          antallBygninger={antallBygninger}
          bygningsTypeKode={
            gjeldendeTilstand?.byggMetaEndring?.bygningsTypeKode
          }
          gjeldendeStatusKode={
            gjeldendeTilstand?.byggMetaEndring?.bygningsStatusKode
          }
        />

        {gjeldendeTilstand && (
          <>
            <Oversiktsfelt
              byggTypeKode={
                gjeldendeTilstand?.byggMetaEndring?.bygningsTypeKode
              }
              antallBoenheter={
                gjeldendeTilstand?.byggMetaEndring?.antallBoenheter
              }
              antallBruksenheter={gjeldendeTilstand?.bruksenheter.length}
              antallEtasjer={gjeldendeTilstand?.etasjePlan?.length}
              naringsgruppeKode={
                gjeldendeTilstand?.byggMetaEndring?.naringsgruppeKode
              }
              koordinater={gjeldendeTilstand?.byggKoordinatEndring}
            />
            <ByggOversiktAreal etasjePlan={gjeldendeTilstand.etasjePlan} />
          </>
        )}
      </div>
      <ByggSammendrag byggEndringer={bygning.endringer} />
    </div>
  )

  // Seksjonstittelen vises kun for første bygning, ellers vises kun innholdet.
  if (bygningIndeks > 1) {
    return <section className="mt-20">{innhold}</section>
  }

  return (
    <Section index={index} title={t("rapport.BYG0011.byggoversikt.title")}>
      {innhold}
    </Section>
  )
}
