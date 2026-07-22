import { Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { formatDate } from "../../lib/utils/formatDate"
import {
  finnSisteMilepael,
  lagHistorikkbeskrivelseForBygningsendring,
  type Milepael,
  sorterBygningsendringerKronologisk,
} from "./byggHistorikk"

interface Props {
  byggEndringer: BygningsEndring[]
}

const groenneMilepaeler = new Set<Milepael>(["ferdigattest", "tattIBruk"])

export default function Historikk({ byggEndringer }: Props) {
  const { i18n, t } = useTranslation()
  const tom = t("tom")
  const h = "rapport.BYG0011.byggoversikt.historikk"

  const endringer = byggEndringer.filter((endring) => endring !== undefined)
  if (endringer.length === 0) return null

  const kronologiskeEndringer = sorterBygningsendringerKronologisk(endringer)

  const rader = kronologiskeEndringer
    .map((rad, i) => ({
      ...rad,
      beskrivelse: lagHistorikkbeskrivelseForBygningsendring(
        t,
        h,
        rad.endring,
        kronologiskeEndringer[i - 1]?.endring,
      ),
    }))
    .toReversed()

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <Heading level={4} data-size="xs">
          {t(`${h}.title`)}
        </Heading>
        <Paragraph data-size="sm" className="text-kv-subtle">
          {t(`${h}.detaljer`)}
        </Paragraph>
      </div>

      <ul className="space-y-8 border-kv-green border-l-3 pl-6">
        {rader.map(({ endring, dato, beskrivelse }) => {
          // TODO: Denne historikken agregeres feil, og må ryddes opp i og standardiseres.
          const endringsKode = endring.byggMetaEndring?.endringsKode
          const milepael = finnSisteMilepael(endring)

          return (
            <li key={endring.lopeNr} className="space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    {formatDate(i18n, dato, tom, { dateStyle: "short" })}
                  </span>
                  {endringsKode !== undefined && (
                    <Tag data-color="success" variant="outline">
                      {oversettKode({
                        t,
                        kodeverk: "endring",
                        kode: endringsKode,
                      })}
                    </Tag>
                  )}
                </div>
                {milepael && (
                  <Tag
                    data-color={
                      groenneMilepaeler.has(milepael) ? "success" : "accent"
                    }
                    variant="outline"
                  >
                    {t(`rapport.BYG0011.registrerteVedtak.${milepael}`)}
                  </Tag>
                )}
              </div>
              {beskrivelse && <Paragraph>{beskrivelse}</Paragraph>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
