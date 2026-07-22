import { Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { formatDate } from "../../lib/utils/formatDate"
import { byggHistorikk } from "./utils/byggHistorikk.ts"

interface Props {
  byggEndringer: BygningsEndring[]
}

export default function Historikk({ byggEndringer }: Props) {
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
            beroerteEtasjer,
            beroerteBruksenheter,
            erFoersteVedtak,
          }) => {
            const beskrivelse = erFoersteVedtak
              ? t(`${h}.foersteVedtak`)
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

            const beroerer =
              beroerteEtasjer.length > 0
                ? t(
                    `${h}.${
                      beroerteEtasjer.length === 1
                        ? "beroererEtasje"
                        : "beroererEtasjer"
                    }`,
                    {
                      etasjer: beroerteEtasjer
                        .map(({ etasje }) => etasje)
                        .join(", "),
                    },
                  )
                : beroerteBruksenheter.length > 0
                  ? t(`${h}.beroererBruksenheter`, {
                      bruksenheter: beroerteBruksenheter.join(", "),
                    })
                  : null

            const trunctateBruksenheter =
              beroerteBruksenheter.length > 5
                ? [...beroerteBruksenheter.slice(0, 5), "..."]
                : beroerteBruksenheter

            return (
              <div key={lopeNr}>
                <li className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex justify-between w-full">
                      <div className="flex gap-2">
                        <p className="font-semibold">
                          {lopeNr === 0
                            ? "Første matrikkelføring"
                            : "Endring " + lopeNr}
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
                              byggStatusKode === "FA" || byggStatusKode === "TB"
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
                      <span className="flex gap-1 items-center">
                        {formatDate(i18n, dato, tom, { dateStyle: "short" })}
                      </span>
                    </div>
                  </div>
                  {beskrivelse && <Paragraph>{beskrivelse}</Paragraph>}
                  {beroerer && (
                    <Paragraph
                      data-size="sm"
                      className="text-kv-subtle truncate"
                    >
                      {beroerer}...<span className="text-xs">+14</span>
                    </Paragraph>
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
