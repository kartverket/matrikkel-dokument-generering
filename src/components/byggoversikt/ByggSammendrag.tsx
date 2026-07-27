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

  const historikk = byggHistorikk(byggEndringer)

  return (
    <div className="space-y-4">
      <Heading level={4} data-size="xs">
        {t(`${h}.title`)}
      </Heading>

      {historikk.length === 0 ? (
        <p>{t(`${h}.ingenHistorikk`)}</p>
      ) : (
        <ul className="space-y-8 border-kv-green border-l-3 pl-6">
          {historikk.map((historikk) => {
            const beskrivelse = historikk.erForsteVedtak
              ? null
              : historikk.arealEndringer.length > 0
                ? historikk.arealEndringer
                    .map(({ areal, handling, type }) =>
                      t(`${h}.areal.${handling}`, {
                        areal,
                        type: t(`${h}.typer.${type}`),
                      }),
                    )
                    .join(" ")
                : historikk.byggStatusKode
                  ? t(`${h}.statusRegistrert`, {
                      status: oversettKode({
                        t,
                        kodeverk: "bygningsstatus",
                        kode: historikk.byggStatusKode,
                      }),
                    })
                  : null

            const berorteVerdier =
              historikk.berorteEtasjer.length > 0
                ? historikk.berorteEtasjer.map(({ etasje }) => etasje)
                : historikk.berorteBruksenheter
            const synligeBerorteVerdier = berorteVerdier.slice(
              0,
              MAKS_ANTALL_BERORTE,
            )
            const antallFlereBerorte =
              berorteVerdier.length - synligeBerorteVerdier.length

            const berorteEtasjerOgBruksenheter =
              historikk.berorteEtasjer.length > 0
                ? t(
                    `${h}.${
                      historikk.berorteEtasjer.length === 1
                        ? "berorteEtasje"
                        : "berorteEtasjer"
                    }`,
                    {
                      etasjer: synligeBerorteVerdier.join(", "),
                    },
                  )
                : historikk.berorteBruksenheter.length > 0
                  ? t(`${h}.berorteBruksenheter`, {
                      bruksenheter: synligeBerorteVerdier.join(", "),
                    })
                  : null

            return (
              <div key={historikk.lopeNr} className="break-inside-avoid">
                <li className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex w-full justify-between">
                      <div className="flex gap-2">
                        <p className="font-semibold">
                          {historikk.lopeNr === 0
                            ? t(`${h}.forsteVedtak`)
                            : `Endring ${historikk.lopeNr}`}
                        </p>

                        {historikk.byggEndringsKode !== undefined && (
                          <Tag data-color="success" variant="outline">
                            {oversettKode({
                              t,
                              kodeverk: "endring",
                              kode: historikk.byggEndringsKode,
                            })}
                          </Tag>
                        )}

                        {historikk.byggStatusKode && (
                          <Tag
                            data-color={
                              successStatuskoder.includes(
                                historikk.byggStatusKode,
                              )
                                ? "success"
                                : "accent"
                            }
                            variant="outline"
                          >
                            {oversettKode({
                              t,
                              kodeverk: "bygningsstatus",
                              kode: historikk.byggStatusKode,
                            })}
                          </Tag>
                        )}
                      </div>
                      <span className="flex items-center gap-1">
                        {formatDate(i18n, historikk.dato, tom, {
                          dateStyle: "short",
                        })}
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
          })}
        </ul>
      )}
    </div>
  )
}
