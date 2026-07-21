import { z } from "@hono/zod-openapi"

// ref: BygningstatusKodeId.java
export const byggningsStatusKodeSchema = z
  .enum([
    "RA", // Rammetillatelse
    "IG", // Igangsettingstillatelse
    "MB", // Midlertidig brukstillatelse
    "FA", // Ferdigattest
    "TB", // Tatt i bruk
    "MT", // Meldingssak: registrer tiltak
    "MF", // Meldingssak: tiltak fullført
    "IP", // Ikke pliktig registrert
    "GR", // Bygning godkjent for revet/brent
    "BR", // Bygning revet/brent
    "BA", // Bygging avlyst
    "BF", // Bygning flyttet
    "BU", // Bygningsnummer utgått
    "FS", // Fritatt for søknadsplikt
    "EB", // Endre bygningsdata
    "TE", // Tilbygg opprettet som egen bygning
    "TA", // Bygg etablert som tilbygg på annen bygning
    "SB", // Splitt bygning
    "DO", // Data fra bygningsendring overført
  ])
  .meta({
    id: "Bygningsstatuskode",
    description: `Angir nåværende status for en bygning eller bygningsendring.

Koder:

\`\`\`
RA: Rammetillatelse
IG: Igangsettingstillatelse
MB: Midlertidig brukstillatelse
FA: Ferdigattest
TB: Tatt i bruk
MT: Meldingssak – registrer tiltak
MF: Meldingssak – tiltak fullført
IP: Ikke pliktig registrert (tiltak unntatt fra byggesaksbehandling)
GR: Bygning godkjent for riving eller brenning
BR: Bygning revet eller brent
BA: Bygging avlyst
BF: Bygning flyttet
BU: Bygningsnummer utgått
FS: Fritatt for søknadsplikt
EB: Endre bygningsdata
TE: Tilbygg opprettet som egen bygning
TA: Bygg etablert som tilbygg på annen bygning
SB: Splitt bygning
DO: Data fra bygningsendring overført
\`\`\``,
    example: "TB",
  })

export type BygningsStatusKode = z.infer<typeof byggningsStatusKodeSchema>
