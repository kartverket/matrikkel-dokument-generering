import { Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { formatDate } from "../../lib/utils/formatDate.ts"
import { byggHistorikk } from "./utils/byggHistorikk.ts"

interface Props {
  byggEndringer: BygningsEndring[]
}

const MAKS_ANTALL_BERORTE = 5

const successStatuskoder = ["FA", "TB"]

export default function ByggSammendrag({ byggEndringer }: Props) {
  const { i18n, t } = useTranslation()
  const tom = t("tom")
  const h = "rapport.BYG0011.byggoversikt.historikk"

  const rader = byggHistorikk(byggEndringer)
  if (rader.length === 0) return null

  return (
    <div className="space-y-4">
      <Heading level={4} data-size="xs">
        {t(`${h}.title`)}
      </Heading>

      <ul className="space-y-8 border-kv-green border-l-3 pl-6">
        {rader.map(
          ({
            lopeNr,
            byggEndringsKode,
            byggStatusKode,
            dato,
            arealEndringer,
            berorteEtasjer,
            berorteBruksenheter,
            erForsteVedtak,
          }) => {
            const beskrivelse = erForsteVedtak
              ? null
              : arealEndringer.length > 0
                ? arealEndringer
                    .map(({ areal, handling, type }) =>
                      t(`${h}.areal.${handling}`, {
                        areal,
                        type: t(`${h}.typer.${type}`),
                      }),
                    )
                    .join(" ")
                : byggStatusKode
                  ? t(`${h}.statusRegistrert`, {
                      status: oversettKode({
                        t,
                        kodeverk: "bygningsstatus",
                        kode: byggStatusKode,
                      }),
                    })
                  : null

            const berorteVerdier =
              berorteEtasjer.length > 0
                ? berorteEtasjer.map(({ etasje }) => etasje)
                : berorteBruksenheter
            const synligeBerorteVerdier = berorteVerdier.slice(
              0,
              MAKS_ANTALL_BERORTE,
            )
            const antallFlereBerorte =
              berorteVerdier.length - synligeBerorteVerdier.length

            const berorteEtasjerOgBruksenheter =
              berorteEtasjer.length > 0
                ? t(
                    `${h}.${
                      berorteEtasjer.length === 1
                        ? "berorteEtasje"
                        : "berorteEtasjer"
                    }`,
                    {
                      etasjer: synligeBerorteVerdier.join(", "),
                    },
                  )
                : berorteBruksenheter.length > 0
                  ? t(`${h}.berorteBruksenheter`, {
                      bruksenheter: synligeBerorteVerdier.join(", "),
                    })
                  : null

            return (
              <div key={lopeNr}>
                <li className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex w-full justify-between">
                      <div className="flex gap-2">
                        <p className="font-semibold">
                          {lopeNr === 0
                            ? t(`${h}.forsteVedtak`)
                            : `Endring ${lopeNr}`}
                        </p>

                        {byggEndringsKode !== undefined && (
                          <Tag data-color="success" variant="outline">
                            {oversettKode({
                              t,
                              kodeverk: "endring",
                              kode: byggEndringsKode,
                            })}
                          </Tag>
                        )}

                        {byggStatusKode && (
                          <Tag
                            data-color={
                              successStatuskoder.includes(byggStatusKode)
                                ? "success"
                                : "accent"
                            }
                            variant="outline"
                          >
                            {oversettKode({
                              t,
                              kodeverk: "bygningsstatus",
                              kode: byggStatusKode,
                            })}
                          </Tag>
                        )}
                      </div>
                      <span className="flex items-center gap-1">
                        {formatDate(i18n, dato, tom, { dateStyle: "short" })}
                      </span>
                    </div>
                  </div>
                  {beskrivelse && <Paragraph>{beskrivelse}</Paragraph>}
                  {berorteEtasjerOgBruksenheter && (
                    <div className="flex flex-wrap items-center gap-2 text-kv-subtle">
                      <Paragraph data-size="sm">
                        {berorteEtasjerOgBruksenheter}
                      </Paragraph>
                      {antallFlereBerorte > 0 && (
                        <Tag
                          data-size="sm"
                          className="shrink-0"
                          variant="outline"
                        >
                          {t(`${h}.flereBerorte`, {
                            antall: antallFlereBerorte,
                          })}
                        </Tag>
                      )}
                    </div>
                  )}
                </li>
              </div>
            )
          },
        )}
      </ul>
    </div>
  )
}
