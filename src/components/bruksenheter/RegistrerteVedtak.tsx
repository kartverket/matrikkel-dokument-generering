import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningsendring } from "../../lib/schema/byggRapportSchema"
import { Detaljgrid, lagDetaljfeltBuilder } from "../Detaljfelt"

interface Props {
  endring: Bygningsendring | undefined
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

export function RegistrerteVedtak({ endring }: Props) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.registrerteVedtak"
  const tom = t("tom")

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>
      {endring === undefined ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <Detaljgrid felter={getVedtakDetaljfelter(endring.datoer)} tom={tom} />
      )}
    </div>
  )
}
