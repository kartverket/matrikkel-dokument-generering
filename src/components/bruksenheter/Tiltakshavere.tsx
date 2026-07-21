import { Card, Heading, Paragraph } from "@kv-designsystem/react"
import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { TiltaksHaver } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { Detaljgrid, lagDetaljfeltBuilder } from "../Detaljfelt.tsx"

interface Props {
  tiltakshavere: TiltaksHaver[] | undefined
}

const translationKey = "rapport.BYG0011.tiltakshavere"
const tiltakshaverFelt = lagDetaljfeltBuilder(translationKey)

function getTiltakshaverDetaljfelter(tiltakshaver: TiltaksHaver, t: TFunction) {
  return [
    tiltakshaverFelt(
      "rolle",
      tiltakshaver.kontaktPersonKode === undefined
        ? null
        : oversettKode({
            t,
            kodeverk: "kontaktperson",
            kode: tiltakshaver.kontaktPersonKode,
          }),
    ),
    tiltakshaverFelt("identifikasjonsNr", tiltakshaver.identifikasjonsNr),
    tiltakshaverFelt("adresse", tiltakshaver.adresse),
    tiltakshaverFelt("bruksenhetsnr", tiltakshaver.bruksenhetsNr),
  ]
}

export function Tiltakshavere({ tiltakshavere }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>

      {!tiltakshavere || tiltakshavere.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {tiltakshavere.map((tiltakshaver) => (
            <Card
              key={JSON.stringify(tiltakshaver)}
              className="pdf-keep-together min-w-0"
            >
              <Paragraph className="wrap-break-word mb-4 min-w-0 font-semibold">
                {tiltakshaver.navn ?? tom}
              </Paragraph>
              <Detaljgrid
                className="[&_dd]:wrap-anywhere grid-cols-1 *:min-w-0 sm:grid-cols-2 xl:grid-cols-3"
                felter={getTiltakshaverDetaljfelter(tiltakshaver, t)}
                tom={tom}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
