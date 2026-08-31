import { useTranslation } from "react-i18next"
import type { Hjemmelshaver } from "../lib/schema/reports/bygg/shared/eierforholdSchema.ts"

interface Props {
  readonly hjemmelshavere: Array<Hjemmelshaver>
}

export function Hjemmelshavere({ hjemmelshavere }: Readonly<Props>) {
  const { t } = useTranslation()

  if (!hjemmelshavere?.length) return null

  const hjemmelshaverList = hjemmelshavere
    .flatMap((eierforhold) => eierforhold.matrikkelenhetEiereInfos || [])
    .flatMap((matrikkel) => matrikkel.personEierforhold || [])

  if (!hjemmelshaverList.length) return null

  return (
    <section className="space-y-4">
      <h3 className="font-bold text-gray-900 text-lg">
        {t("rapport.BYG0011.hjemmelshavere.tittel")}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-kv-green">
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.hjemmelshavere.rolle")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.hjemmelshavere.status")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.hjemmelshavere.fodselsnum")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.hjemmelshavere.navn")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.hjemmelshavere.addresse")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.hjemmelshavere.bruksenhet")}
              </th>
              <th className="border-b px-2 py-2 text-left font-bold">
                {t("rapport.BYG0011.hjemmelshavere.andel")}
              </th>
            </tr>
          </thead>
          <tbody>
            {hjemmelshaverList.map((person) => (
              <tr key={person.eierident} className="border-b">
                <td className="border-b px-2 py-2">
                  {person.eierforholdKode?.displayTekst}
                </td>
                <td className="border-b px-2 py-2">
                  {person.personStatusKode?.displayTekst || "-"}
                </td>
                <td className="border-b px-2 py-2">{person.eierident}</td>
                <td className="border-b px-2 py-2">{person.navn}</td>
                <td className="border-b px-2 py-2">{person.eierAdresse}</td>
                <td className="border-b px-2 py-2">
                  {person.bruksenhetsnummer || "-"}
                </td>
                <td className="border-b px-2 py-2">
                  {person.teller && person.nevner
                    ? `${person.teller}/${person.nevner}`
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
