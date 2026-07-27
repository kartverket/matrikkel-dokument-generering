import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { Utvalg } from "./Utvalg.tsx"

interface Props {
  adresseKriterier: NonNullable<Utvalgskriterier>["adresse"]
}

export function AdresseKriterier({ adresseKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <Utvalg
      title={t(`${uk}.adresse.tittel`)}
      className="grid-cols-7"
      kriterier={[
        {
          label: t(`${uk}.adresse.adresseKode`),
          value: adresseKriterier?.adresseKode,
        },
        {
          label: t(`${uk}.adresse.adresseNavn`),
          value: adresseKriterier?.adresseNavn,
        },
        {
          label: t(`${uk}.adresse.bruksenhetsNr`),
          value: adresseKriterier?.bruksenhetsNr,
        },
        {
          label: t(`${uk}.adresse.adresseTilleggsNavn`),
          value: adresseKriterier?.adresseTilleggsNavn,
        },
        {
          label: t(`${uk}.adresse.adresseNr`),
          value: adresseKriterier?.adresseNr,
        },
        {
          label: t(`${uk}.adresse.adresseBokstav`),
          value: adresseKriterier?.adresseBokstav,
        },
        {
          label: t(`${uk}.adresse.utenBokstav`),
          value: adresseKriterier?.utenBokstav,
        },
      ]}
    />
  )
}
