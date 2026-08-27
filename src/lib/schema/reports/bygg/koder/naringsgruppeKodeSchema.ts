import { z } from "@hono/zod-openapi"

const naringsgruppeKoder = [
  " ", // Ikke oppgitt
  "X", // Bolig
  "A", // Jordbruk, skogbruk og fiske
  "B", // Bergverksdrift og utvinning
  "C", // Industri
  "D", // Elektrisitets-, gass-, damp- og varmtvannsforsyning
  "F", // Bygge- og anleggsvirksomhet
  "G", // Varehandel, reparasjon av motorvogner
  "I", // Overnattings- og serveringsvirksomhet
  "H", // Transport og lagring
  "K", // Finansierings- og forsikringsvirksomhet
  "L", // Omsetning og drift av fast eiendom
  "O", // Offentlig forvaltning
  "P", // Undervisning
  "Q", // Helse- og sosialtjenester
  "U", // Internasjonale organisasjoner og organer
  "Y", // Annet som ikke er næring
  "T", // Lønnet arbeid i private husholdninger
  "E", // Vannforsyning, avløps- og renovasjonsvirksomhet
  "J", // Informasjon og kommunikasjon
  "M", // Faglig, vitenskapelig og teknisk tjenesteyting
  "N", // Forretningsmessig tjenesteyting
  "R", // Kulturell virksomhet, underholdning og fritidsaktiviteter
  "S", // Annen tjenesteyting
  "-", // Ukjent
] as const

// ref: NaringsgruppeKodeId.java
export const naringsgruppeKodeSchema = z.enum(naringsgruppeKoder).meta({
  id: "NaringsgruppeKode",
  description: `Angir hvilken næringsgruppe bygget tilhører. Kodelisten bygger på SN2007.

Koder:

\`\`\`
<blank>: Ikke oppgitt
X: Bolig
A: Jordbruk, skogbruk og fiske
B: Bergverksdrift og utvinning
C: Industri
D: Elektrisitets-, gass-, damp- og varmtvannsforsyning
F: Bygge- og anleggsvirksomhet
G: Varehandel, reparasjon av motorvogner
I: Overnattings- og serveringsvirksomhet
H: Transport og lagring
K: Finansierings- og forsikringsvirksomhet
L: Omsetning og drift av fast eiendom
O: Offentlig administrasjon og forsvar, og trygdeordninger underlagt offentlig forvaltning
P: Undervisning
Q: Helse- og sosialtjenester
U: Internasjonale organisasjoner og organer
Y: Annet som ikke er næring
T: Lønnet arbeid i private husholdninger
E: Vannforsyning, avløps- og renovasjonsvirksomhet
J: Informasjon og kommunikasjon
M: Faglig, vitenskapelig og teknisk tjenesteyting
N: Forretningsmessig tjenesteyting
R: Kulturell virksomhet, underholdning og fritidsaktiviteter
S: Annen tjenesteyting
-: Ukjent
\`\`\``,
  example: "X",
})

export type NaringsgruppeKode = z.infer<typeof naringsgruppeKodeSchema>
