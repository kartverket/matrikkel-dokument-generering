import type { BygningsEndring } from "../../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { BygningsStatusKode } from "../../../lib/schema/reports/bygg/koder/byggningsStatusKode.schema.ts"

type Endring = NonNullable<BygningsEndring>

// Statuskoder som tilsir at bygget er ferdigstilt
const ferdigstilteStatuser = new Set<BygningsStatusKode>([
  "MB",
  "TB",
  "FA",
  "MF",
  "IP",
  "FS",
  "DO",
])

// Sjekker om noen av endringens ferdigdatoer er satt, eller om statuskoden tilsier at bygget er ferdigstilt.
function erFerdigstilt(endring: Endring): boolean {
  const datoer = endring.byggDatoEndring
  const status = endring.byggMetaEndring?.bygningsStatusKode

  return Boolean(
    datoer?.midlertidigBrukstillatelse ??
      datoer?.tattIBruk ??
      datoer?.ferdigattest ??
      (status !== undefined && ferdigstilteStatuser.has(status)),
  )
}

function finnNyesteFerdigdato(endring: Endring): string | undefined {
  const datoer = endring.byggDatoEndring

  return [
    datoer?.midlertidigBrukstillatelse,
    datoer?.tattIBruk,
    datoer?.ferdigattest,
  ]
    .filter((dato): dato is string => dato !== undefined)
    .toSorted()
    .at(-1)
}

// Avgjør hvilken ferdigstilt bygningsendring som er nyest.
function sammenlignFerdigstilte(a: Endring, b: Endring): number {
  const aDato = finnNyesteFerdigdato(a)
  const bDato = finnNyesteFerdigdato(b)

  if (aDato !== undefined && bDato !== undefined) {
    const datoForskjell = aDato.localeCompare(bDato)
    if (datoForskjell !== 0) return datoForskjell
  }

  // Løpenummer er fallback for eldre ferdigstatuser uten en egen ferdigdato i
  // rapportformatet, f.eks. MF, IP og FS.
  return a.lopeNr - b.lopeNr
}

// Gjeldende tilstand er det nyeste tilstandsbildet som er tatt i bruk eller
// ferdigstilt. En pågående endring (RA/IG) vil ikke erstatte det bestående
// bygget i oversikten.
export function aggregerGjeldendeTilstand(
  endringer: BygningsEndring[],
): BygningsEndring {
  const registrerteEndringer = endringer.filter(
    (endring): endring is Endring => endring !== undefined,
  )

  const nyesteFerdigstilte = registrerteEndringer
    .filter(erFerdigstilt)
    .toSorted(sammenlignFerdigstilte)
    .at(-1)

  return (
    nyesteFerdigstilte ??
    registrerteEndringer.find((endring) => endring.lopeNr === 0)
  )
}
