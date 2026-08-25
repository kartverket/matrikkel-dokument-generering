import { z } from "@hono/zod-openapi"

const opprinnelsesKoder = [
  " ",
  "F",
  "S",
  "T",
  "R",
  "V",
  "M",
] as const

export const opprinnelsesKodeSchema = z.enum(opprinnelsesKoder).meta({
  id: "OpprinnelsesKode",
  description: `Angir hvordan bygget opprinnelig ble registrert i GAB eller matrikkel.

Koder:

\`\`\`
<blank>: Ikke oppgitt
F: Fylkesforsyningsnemnda
S: SEFRAK
T: Generert Pga Tilbygg
R: Ruin Ved Registreringspunkt SEFRAK
V: Vanlig Registrering
M: Massivregistrering
\`\`\``,
  example: "V",
})

export type OpprinnelsesKode = z.infer<typeof opprinnelsesKodeSchema>
