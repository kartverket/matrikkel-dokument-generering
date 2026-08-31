import { useTranslation } from "react-i18next"
import type { Kontaktperson } from "../lib/schema/reports/bygg/shared/kontaktperson.schema.ts"

interface Props {
  readonly kontaktpersoner: Array<Kontaktperson>
}

export function Kontaktpersoner({ kontaktpersoner }: Readonly<Props>) {
  const { t } = useTranslation()

  if (!kontaktpersoner?.length) return null

  return (
    <section className="space-y-4">
      <h3 className="font-bold text-gray-900 text-lg">
        {t("rapport.BYG0011.kontaktpersoner.tittel")}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-kv-green">
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.kontaktpersoner.rolle")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.kontaktpersoner.fodselsnum")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.kontaktpersoner.navn")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.kontaktpersoner.addresse")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.kontaktpersoner.bruksenhet")}
              </th>
            </tr>
          </thead>
          <tbody>
            {kontaktpersoner.map((kontaktperson) => (
              <tr key={kontaktperson.eierident} className="border-b">
                <td className="border-b px-2 py-2">
                  {kontaktperson.kontaktpersonKode?.displayTekst}
                </td>
                <td className="border-b px-2 py-2">
                  {kontaktperson.eierident}
                </td>
                <td className="border-b px-2 py-2">{kontaktperson.navn}</td>
                <td className="border-b px-2 py-2">
                  {kontaktperson.eierAdresse}
                </td>
                <td className="border-b px-2 py-2">
                  {kontaktperson.bruksenhetsnummer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
