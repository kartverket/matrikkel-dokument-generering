import { joinStrings } from "./joinStrings"

type Adresselinje = string | null | undefined

export function formatAdresselinjer(
  adresselinjer: Adresselinje[],
  tom: string,
) {
  return joinStrings(adresselinjer, ", ", tom)
}

export function formatPoststed(
  postnummer: Adresselinje,
  poststed: Adresselinje,
  tom: string,
) {
  return joinStrings([postnummer, poststed], " ", tom)
}

export function formatAdresse(
  adresselinjer: Adresselinje[],
  postnummer: Adresselinje,
  poststed: Adresselinje,
  tom: string,
) {
  const postadresse = formatPoststed(postnummer, poststed, "")
  return joinStrings([...adresselinjer, postadresse], ", ", tom)
}
