import { Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningsendring } from "../../lib/schema/byggRapportSchema"
import { formatDate } from "../../lib/utils/formatDate"

interface Props {
  endringer: Bygningsendring[]
}

const groenneStatuser = new Set(["FA", "TB"])

const kortDato: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Oslo",
}

function primaerDato(endring: Bygningsendring): string | null {
  const d = endring.datoer
  const byKortkode: Record<string, string | null | undefined> = {
    FA: d.ferdigattest,
    MB: d.midlertidigBrukstillatelse,
    IG: d.igangsettingstillatelse,
    RA: d.rammetillatelse,
    TB: d.tattIBruk,
    BR: d.utgaattRevet,
  }
  return (
    byKortkode[endring.bygningsstatus.kortkode] ??
    d.ferdigattest ??
    d.midlertidigBrukstillatelse ??
    d.igangsettingstillatelse ??
    d.rammetillatelse ??
    d.tattIBruk ??
    d.utgaattRevet ??
    null
  )
}

export default function Historikk({ endringer }: Props) {
  const { t } = useTranslation()
  const h = "rapport.BYG0011.byggoversikt.historikk"

  if (endringer.length === 0) return null

  const sortert = endringer
    .map((endring) => ({ endring, dato: primaerDato(endring) }))
    .toSorted((a, b) => {
      if (a.dato && b.dato) return b.dato.localeCompare(a.dato)
      if (a.dato) return -1
      if (b.dato) return 1
      return b.endring.lopenr - a.endring.lopenr
    })

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

      <ul className="space-y-8 border-l-3 border-kv-green pl-6">
        {sortert.map(({ endring, dato }) => {
          const bruksenhetsnr = endring.bruksenheter
            .map((b) => b.bruksenhetsnr)
            .filter((v): v is string => Boolean(v))
          const erGroennStatus = groenneStatuser.has(
            endring.bygningsstatus.kortkode,
          )
          const beskrivelse =
            endring.beskrivelse ??
            (endring.lopenr === 0 ? t(`${h}.foersteVedtak`) : null)

          return (
            <li key={endring.id} className="space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    {formatDate(t, dato, "—", kortDato)}
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
              {bruksenhetsnr.length > 0 && (
                <Paragraph data-size="sm" className="text-kv-subtle">
                  {t(`${h}.beroerer`, {
                    bruksenheter: bruksenhetsnr.join(" "),
                  })}
                </Paragraph>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
