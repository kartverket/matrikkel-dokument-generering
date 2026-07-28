import { useTranslation } from "react-i18next"
import BygningHeader from "../components/bygg/BygningHeader.tsx"
import Oversiktsfelt from "../components/byggoversikt/Oversiktsfelt.tsx"
import { Section } from "../components/Section.tsx"
import type { BygningMassiv } from "../lib/schema/reports/bygg/byg0001/bygningMassiv.schema.ts"

type NonNullBygningMassiv = NonNullable<BygningMassiv>

interface Props {
  index: number
  bygning: NonNullBygningMassiv
  bygningIndeks: number
  antallBygninger: number
}

export default function ByggoversiktMassiv({
  index,
  bygning,
  bygningIndeks,
  antallBygninger,
}: Props) {
  const { t } = useTranslation()

  const koordinater =
    bygning.nord !== undefined && bygning.ost !== undefined
      ? { nord: bygning.nord, ost: bygning.ost }
      : undefined

  return (
    <Section
      index={index}
      title={t("rapport.BYG0011.byggoversikt.title")}
      showTitle={bygningIndeks === 1}
    >
      <div className="space-y-8 px-2.5">
        <BygningHeader
          byggNr={bygning.bygningsnr}
          bygningIndeks={bygningIndeks}
          antallBygninger={antallBygninger}
          bygningsTypeKode={bygning.bygningsTypeKode}
          gjeldendeStatusKode={bygning.bygningsStatusKode}
        />
        <Oversiktsfelt
          byggTypeKode={bygning.bygningsTypeKode}
          antallBoenheter={bygning.antallBoenheter}
          antallBruksenheter={bygning.bruksenheter?.length}
          naringsgruppeKode={bygning.naringsgruppeKode}
          koordinater={koordinater}
          bruksareal={bygning.bruksareal}
          visEtasjer={false}
        />
      </div>
    </Section>
  )
}
