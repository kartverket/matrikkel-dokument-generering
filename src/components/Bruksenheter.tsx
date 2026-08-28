import { Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bruksenhet } from "../lib/schema/reports/bygg/shared/bruksenhet.schema.ts"

type Props = Readonly<{
  bruksenheter: (Bruksenhet | undefined)[]
}>

export function Bruksenheter({ bruksenheter }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.byggEndringer.bruksenheter" as const

  const filtrerteEnheter = bruksenheter.filter(
    (u): u is Bruksenhet => u?.bruksenhetsnummer != null,
  )

  if (filtrerteEnheter.length === 0) {
    return null
  }

  const cellClass = "px-2 py-2"
  const headerClass = `${cellClass} font-semibold text-sm`
  const numberCellClass = `${cellClass} text-right`

  return (
    <section className="space-y-2">
      <span className="flex break-after-avoid items-center gap-4">
        <Heading level={3} data-size="2xs" className="min-w-max font-medium">
          {t(`${tKey}.tittel_other`)}
        </Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-kv-green-border border-b">
              <th className={`text-left ${headerClass}`}>
                {t(`${tKey}.bruksenhetsNr`)}
              </th>
              <th className={`text-left ${headerClass}`}>
                {t(`${tKey}.bruksenhetsTypeKode`)}
              </th>
              <th className={`text-right ${headerClass}`}>
                {t(`${tKey}.bruksAreal`)}
              </th>
              <th className={`text-right ${headerClass}`}>
                {t(`${tKey}.antallRom`)}
              </th>
              <th className={`text-right ${headerClass}`}>
                {t(`${tKey}.antallBad`)}
              </th>
              <th className={`text-right ${headerClass}`}>
                {t(`${tKey}.antallWC`)}
              </th>
              <th className={`text-left ${headerClass}`}>
                {t(`${tKey}.kjokkenTilgangKode`)}
              </th>
              <th className={`text-left ${headerClass}`}>
                {t(`${tKey}.adresse`)}
              </th>
              <th className={`text-left ${headerClass}`}>
                {t(`${tKey}.matrikkelNr`)}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtrerteEnheter.map((enhet) => (
              <tr key={enhet.bruksenhetsnummer} className="text-sm">
                <td className={cellClass}>{enhet.bruksenhetsnummer}</td>
                <td className={cellClass}>
                  {enhet.bruksenhetsTypeKode?.displayTekst ?? "-"}
                </td>
                <td className={numberCellClass}>
                  {enhet.bruksareal != null ? `${enhet.bruksareal} m²` : "-"}
                </td>
                <td className={numberCellClass}>{enhet.antallRom ?? "-"}</td>
                <td className={numberCellClass}>{enhet.antallBad ?? "-"}</td>
                <td className={numberCellClass}>{enhet.antallWC ?? "-"}</td>
                <td className={cellClass}>
                  {enhet.kjokkentilgang?.displayTekst ?? "-"}
                </td>
                <td className={cellClass}>
                  {enhet.adresseIdentRapportInfo?.adresseAsString ?? "-"}
                </td>
                <td className={cellClass}>
                  {enhet.matrikkelnrRapportInfo?.matrikkelNummer ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
