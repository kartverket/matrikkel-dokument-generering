import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningsendring } from "../../lib/schema/byggRapportSchema"
import { Detaljgrid, lagDetaljfeltBuilder } from "../Detaljfelt"

interface Props {
  endringer: Bygningsendring[]
}

const vedtakFelt = lagDetaljfeltBuilder("rapport.BYG0011.registrerteVedtak")

function getVedtakDetaljfelter(datoer: Bygningsendring["datoer"]) {
  return [
    vedtakFelt("rammetillatelse", datoer.rammetillatelse),
    vedtakFelt("igangsettingstillatelse", datoer.igangsettingstillatelse),
    vedtakFelt("midlertidigBrukstillatelse", datoer.midlertidigBrukstillatelse),
    vedtakFelt("ferdigattest", datoer.ferdigattest),
    vedtakFelt("tattIBruk", datoer.tattIBruk),
    vedtakFelt("utgaattRevet", datoer.utgaattRevet),
  ]
}

export function RegistrerteVedtak({ endringer }: Props) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.registrerteVedtak"
  const tom = t("tom")

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>
      {endringer.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <div className="flex flex-col gap-4">
          {endringer.map((endring) => (
            <div key={endring.id} className="break-inside-avoid">
              {endringer.length > 1 && (
                <Paragraph className="mb-3 font-semibold text-sm">
                  {t("rapport.BYG0011.bruksenheter.bygningsendring", {
                    nr: endring.lopenr,
                    type: endring.endringskode ?? tom,
                  })}
                </Paragraph>
              )}
              <Detaljgrid
                felter={getVedtakDetaljfelter(endring.datoer)}
                tom={tom}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
