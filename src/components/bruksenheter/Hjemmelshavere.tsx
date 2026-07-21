import { useTranslation } from "react-i18next"
import type { Aktor } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { PersonCard } from "../PersonCard"
import { PersonGrid } from "../PersonGrid"

interface Props {
  aktorer: Aktor[] | undefined
}

export function Aktorere({ aktorer }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.hjemmelshavere"

  return (
    <PersonGrid title={t(`${translationKey}.title`)} tom={tom}>
      {aktorer && (
        <PersonCard
          navn={aktoer.navn ?? tom}
          erUtgatt={aktoer.erAvdoed}
          statuskode={null}
          utgattLabel={t(`${translationKey}.utgatt`)}
          felter={getHjemmelshaverDetaljfelter(aktoer, t)}
          tom={tom}
        />
      )}
    </PersonGrid>
  )
}
