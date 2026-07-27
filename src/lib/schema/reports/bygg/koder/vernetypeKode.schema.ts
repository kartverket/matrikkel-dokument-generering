import { z } from "@hono/zod-openapi"

const vernetypeKoder = [
  "ADM", // Statlig listeført
  "FOR", // Forskriftsfredet
  "AUT", // Automatisk fredet
  "VED", // Vedtaksfredet
  "WHS", // Verdensarvstatus (UNESCO)
  "FPG", // Fredningssak pågår
  "LIST", // Listeført kirke
  "MID", // Midlertidig fredet
  "UAV", // Uavklart
  "OPP", // Opphevet fredning
  "FJE", // Fjernet (aut. fredet)
  "IKKE", // Ikke fredet
  "KOM", // Kommunalt vernet (PBL)
  "LOK", // Lokalt listeført
  "SAM", // Sammensatt
] as const

// ref: VernetypeKode.java / kodeverk-kulturminne.xml (Askeladden, RA)
export const vernetypeKodeSchema = z.enum(vernetypeKoder).meta({
  id: "VernetypeKode",
  description: `Kode for vernestatus. Angir hvilken type vern kulturminnet eventuelt har.

Koder:

\`\`\`
ADM: Statlig listeført
FOR: Forskriftsfredet
AUT: Automatisk fredet
VED: Vedtaksfredet
WHS: Verdensarvstatus (UNESCO)
FPG: Fredningssak pågår
LIST: Listeført kirke
MID: Midlertidig fredet
UAV: Uavklart
OPP: Opphevet fredning
FJE: Fjernet (aut. fredet)
IKKE: Ikke fredet
KOM: Kommunalt vernet (PBL)
LOK: Lokalt listeført
SAM: Sammensatt
\`\`\``,
  example: "VED",
})

export type VernetypeKode = z.infer<typeof vernetypeKodeSchema>
