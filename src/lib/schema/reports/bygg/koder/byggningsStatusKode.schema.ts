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
    description:
      "Angir nåværende status for en bygning eller bygningsendring. Koder:\n" +
      "RA: Rammetillatelse\n" +
      "IG: Igangsettingstillatelse\n" +
      "MB: Midlertidig brukstillatelse\n" +
      "FA: Ferdigattest\n" +
      "TB: Tatt i bruk\n" +
      "MT: Meldingssak – registrer tiltak\n" +
      "MF: Meldingssak – tiltak fullført\n" +
      "IP: Ikke pliktig registrert (tiltak unntatt fra byggesaksbehandling)\n" +
      "GR: Bygning godkjent for riving eller brenning\n" +
      "BR: Bygning revet eller brent\n" +
      "BA: Bygging avlyst\n" +
      "BF: Bygning flyttet\n" +
      "BU: Bygningsnummer utgått\n" +
      "FS: Fritatt for søknadsplikt\n" +
      "EB: Endre bygningsdata\n" +
      "TE: Tilbygg opprettet som egen bygning\n" +
      "TA: Bygg etablert som tilbygg på annen bygning\n" +
      "SB: Splitt bygning\n" +
      "DO: Data fra bygningsendring overført",
    example: "TB",
  })
