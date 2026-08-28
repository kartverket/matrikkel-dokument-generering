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
            <tr className="border-b border-kv-green-border">
              <th className="text-left py-2 px-0 font-semibold text-sm">
                {t(`${tKey}.bruksenhetsNr`)}
              </th>
              <th className="text-left py-2 px-0 font-semibold text-sm">
                {t(`${tKey}.bruksenhetsTypeKode`)}
              </th>
              <th className="text-left py-2 px-0 font-semibold text-sm">
                {t(`${tKey}.bruksAreal`)}
              </th>
              <th className="text-left py-2 px-0 font-semibold text-sm">
                {t(`${tKey}.antallRom`)}
              </th>
              <th className="text-left py-2 px-0 font-semibold text-sm">
                {t(`${tKey}.antallBad`)}
              </th>
              <th className="text-left py-2 px-0 font-semibold text-sm">
                {t(`${tKey}.antallWC`)}
              </th>
              <th className="text-left py-2 px-0 font-semibold text-sm">
                {t(`${tKey}.kjokkenTilgangKode`)}
              </th>
              <th className="text-left py-2 px-0 font-semibold text-sm">
                {t(`${tKey}.adresse`)}
              </th>
              <th className="text-left py-2 px-0 font-semibold text-sm">
                {t(`${tKey}.matrikkelNr`)}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtrerteEnheter.map((enhet) => (
              <tr key={enhet.bruksenhetsnummer} className="border-b text-sm">
                <td className="py-2 px-0">{enhet.bruksenhetsnummer}</td>
                <td className="py-2 px-0">
                  {enhet.bruksenhetsTypeKode?.displayTekst ?? "-"}
                </td>
                <td className="py-2 px-0">
                  {enhet.bruksareal != null ? `${enhet.bruksareal} m²` : "-"}
                </td>
                <td className="py-2 px-0">{enhet.antallRom ?? "-"}</td>
                <td className="py-2 px-0">{enhet.antallBad ?? "-"}</td>
                <td className="py-2 px-0">{enhet.antallWC ?? "-"}</td>
                <td className="py-2 px-0">
                  {enhet.kjokkentilgang?.displayTekst ?? "-"}
                </td>
                <td className="py-2 px-0">
                  {enhet.adresseIdentRapportInfo?.adresseAsString ?? "-"}
                </td>
                <td className="py-2 px-0">
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
