import { Card, Heading, Paragraph } from "@kv-designsystem/react"
import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { TiltaksHaver } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { Detaljgrid, lagDetaljfeltBuilder } from "../Detaljfelt.tsx"

interface Props {
  kontaktpersoner: TiltaksHaver[] | undefined
}

const translationKey = "rapport.BYG0011.kontaktpersoner"
const kontaktpersonFelt = lagDetaljfeltBuilder(translationKey)

function getKontaktpersonDetaljfelter(
  kontaktperson: TiltaksHaver,
  t: TFunction,
) {
  return [
    kontaktpersonFelt(
      "rolle",
      kontaktperson.kontaktPersonKode === undefined
        ? null
        : oversettKode({
            t,
            kodeverk: "kontaktperson",
            kode: kontaktperson.kontaktPersonKode,
          }),
    ),
    kontaktpersonFelt("identifikasjonsNr", kontaktperson.identifikasjonsNr),
    kontaktpersonFelt("adresselinjer", kontaktperson.adresse),
    kontaktpersonFelt("bruksenhetsnr", kontaktperson.bruksenhetsNr),
  ]
}

export function Kontaktpersoner({ kontaktpersoner }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>

      {!kontaktpersoner || kontaktpersoner.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {kontaktpersoner.map((kontaktperson) => (
            <Card
              key={JSON.stringify(kontaktperson)}
              className="pdf-keep-together min-w-0"
            >
              <Paragraph className="wrap-break-word mb-4 min-w-0 font-semibold">
                {kontaktperson.navn ?? tom}
              </Paragraph>
              <Detaljgrid
                className="[&_dd]:wrap-anywhere grid-cols-1 *:min-w-0 sm:grid-cols-2 xl:grid-cols-3"
                felter={getKontaktpersonDetaljfelter(kontaktperson, t)}
                tom={tom}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
