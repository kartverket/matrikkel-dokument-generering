import { Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { Activity } from "react"
import { useTranslation } from "react-i18next"
import type { Bygningsendring } from "../../lib/schema/reports/BYG0011"
import { formatDate } from "../../lib/utils/formatDate"
import {
  lagHistorikkbeskrivelseForBygningsendring,
  sorterBygningsendringerKronologisk,
} from "./byggHistorikk"

interface Props {
  endringer: Bygningsendring[]
}

const groenneStatuser = new Set(["FA", "TB"])

export default function Historikk({ endringer }: Props) {
  const { i18n, t } = useTranslation()
  const tom = t("tom")
  const h = "rapport.BYG0011.byggoversikt.historikk"

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
          const beroerteBruksenhetsnumre = endring.bruksenheter.flatMap(
            ({ bruksenhetsnr }) => bruksenhetsnr ?? [],
          )
          const erGroennStatus = groenneStatuser.has(
            endring.bygningsstatus.kortkode,
          )

          return (
            <li key={endring.id} className="space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    {formatDate(i18n, dato, tom, { dateStyle: "short" })}
                  </span>
                  {endring.endringskode && (
                    <Tag data-color="success" variant="outline">
                      {endring.endringskode}
                    </Tag>
                  )}
                </div>
                <Tag
                  data-color={erGroennStatus ? "success" : "accent"}
                  variant="outline"
                >
                  {endring.bygningsstatus.navn}
                </Tag>
              </div>
              {beskrivelse && <Paragraph>{beskrivelse}</Paragraph>}
              <Activity
                mode={
                  beroerteBruksenhetsnumre.length > 0 ? "visible" : "hidden"
                }
              >
                <Paragraph data-size="sm" className="text-kv-subtle">
                  {t(`${h}.beroerer`, {
                    bruksenheter: beroerteBruksenhetsnumre.join(" "),
                  })}
                </Paragraph>
              </Activity>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
