import { useTranslation } from "react-i18next"
import type { Kontaktperson } from "../lib/schema/reports/bygg/shared/kontaktperson.schema.ts"

interface Props {
  readonly tiltakshavere: Array<Kontaktperson>
}

export function Tiltakshavere({ tiltakshavere }: Readonly<Props>) {
  const { t } = useTranslation()

  if (!tiltakshavere?.length) return null

  return (
    <section className="space-y-4">
      <h3 className="font-bold text-gray-900 text-lg">
        {t("rapport.BYG0011.tiltakshavere.tittel")}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-kv-green">
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.tiltakshavere.rolle")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.tiltakshavere.fodselsnum")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.tiltakshavere.navn")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.tiltakshavere.addresse")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.tiltakshavere.bruksenhet")}
              </th>
            </tr>
          </thead>
          <tbody>
            {tiltakshavere.map((tiltakshaver) => (
              <tr key={tiltakshaver.eierident} className="border-b">
                <td className="border-b px-2 py-2">
                  {tiltakshaver.kontaktpersonKode?.displayTekst}
                </td>
                <td className="border-b px-2 py-2">{tiltakshaver.eierident}</td>
                <td className="border-b px-2 py-2">{tiltakshaver.navn}</td>
                <td className="border-b px-2 py-2">
                  {tiltakshaver.eierAdresse}
                </td>
                <td className="border-b px-2 py-2">
                  {tiltakshaver.bruksenhetsnummer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
