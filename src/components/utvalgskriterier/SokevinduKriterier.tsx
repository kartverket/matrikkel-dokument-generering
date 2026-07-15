import { Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { createKartverketMap } from "../../lib/map/kartverketWms"
import type { Utvalgskriterier } from "../../lib/schema/byggRapportSchema"
import { Kart } from "../kart/Kart"
import { KartUtvalg } from "../kart/KartUtvalg"
import { KoordinatKort } from "../kart/KoordinatKort"

interface Props {
  sokevinduKriterier: Utvalgskriterier["sokevindu"]
  koordinatsystem: string
}

export function SokevinduKriterier({
  sokevinduKriterier,
  koordinatsystem,
}: Props) {
  const { t, i18n } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const locale = i18n.resolvedLanguage ?? i18n.language
  const { nedreVenstre, ovreHoeyre } = sokevinduKriterier
  const map = createKartverketMap(sokevinduKriterier, koordinatsystem)

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.sokevindu`)}
      </Heading>

      <Kart
        imageUrl={map.imageUrl}
        epsg={map.epsg}
        fallbackText={t(`${uk}.sokevindu.kartIkkeTilgjengelig`)}
        accessibleLabel={t(`${uk}.grupper.sokevindu`)}
      >
        <KartUtvalg
          width={map.width}
          height={map.height}
          selection={map.selection}
          selectionLabel={t(`${uk}.sokevindu.valgtOmraade`)}
          scaleBar={map.scaleBar}
        />
        <div className="absolute top-14 right-3 z-30">
          <KoordinatKort
            label={t(`${uk}.sokevindu.ovreHoeyre`)}
            nordLabel={t(`${uk}.felt.nord`)}
            ostLabel={t(`${uk}.felt.ost`)}
            koordinat={ovreHoeyre}
            locale={locale}
          />
        </div>
        <div className="absolute bottom-14 left-3 z-30">
          <KoordinatKort
            label={t(`${uk}.sokevindu.nedreVenstre`)}
            nordLabel={t(`${uk}.felt.nord`)}
            ostLabel={t(`${uk}.felt.ost`)}
            koordinat={nedreVenstre}
            locale={locale}
          />
        </div>
      </Kart>
    </section>
  )
}
