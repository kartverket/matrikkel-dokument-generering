import { Heading, Paragraph } from "@kv-designsystem/react"
import type { i18n as I18n } from "i18next"
import { useTranslation } from "react-i18next"
import type {
  ByggEndringsDatoer,
  BygningsEndring,
} from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { formatDate } from "../../lib/utils/formatDate"
import { Detaljgrid, lagDetaljfeltBuilder } from "../Detaljfelt"

interface Props {
  endring: BygningsEndring | undefined
}

const vedtakFelt = lagDetaljfeltBuilder("rapport.BYG0011.registrerteVedtak")

function getVedtakDetaljfelter(datoer: ByggEndringsDatoer, i18n: I18n) {
  const formatDato = (dato: string | undefined) =>
    dato === undefined
      ? null
      : formatDate(i18n, dato, "", { dateStyle: "short" })

  return [
    vedtakFelt("rammetillatelse", formatDato(datoer.rammetillatelse)),
    vedtakFelt(
      "igangsettingstillatelse",
      formatDato(datoer.igangsettingstillatelse),
    ),
    vedtakFelt(
      "midlertidigBrukstillatelse",
      formatDato(datoer.midlertidigBrukstillatelse),
    ),
    vedtakFelt("ferdigattest", formatDato(datoer.ferdigattest)),
    vedtakFelt("tattIBruk", formatDato(datoer.tattIBruk)),
    vedtakFelt("utgaattRevet", formatDato(datoer.utgaattRevet)),
  ]
}

export function RegistrerteVedtak({ endring }: Props) {
  const { i18n, t } = useTranslation()
  const translationKey = "rapport.BYG0011.registrerteVedtak"
  const tom = t("tom")
  const datoer = endring?.byggDatoEndring

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>
      {datoer === undefined ? (
        <Paragraph className="text-kv-subtle text-sm">{tom}</Paragraph>
      ) : (
        <Detaljgrid felter={getVedtakDetaljfelter(datoer, i18n)} tom={tom} />
      )}
    </div>
  )
}
