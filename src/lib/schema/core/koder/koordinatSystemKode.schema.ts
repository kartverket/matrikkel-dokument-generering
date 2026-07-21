import { z } from "@hono/zod-openapi"

const koordinatSystemKoder = [
  "1", // NGO1948 Gauss-K. akse 1
  "2", // NGO1948 Gauss-K. akse 2
  "3", // NGO1948 Gauss-K. akse 3
  "4", // NGO1948 Gauss-K. akse 4
  "5", // NGO1948 Gauss-K. akse 5
  "6", // NGO1948 Gauss-K. akse 6
  "7", // NGO1948 Gauss-K. akse 7
  "8", // NGO1948 Gauss-K. akse 8
  "9", // NGO1948 geografisk
  "21", // EUREF89 UTM sone 31
  "22", // EUREF89 UTM sone 32
  "23", // EUREF89 UTM sone 33
  "24", // EUREF89 UTM sone 34
  "25", // EUREF89 UTM sone 35
  "26", // EUREF89 UTM sone 36
  "31", // ED50 UTM sone 31
  "32", // ED50 UTM sone 32
  "33", // ED50 UTM sone 33
  "34", // ED50 UTM sone 34
  "35", // ED50 UTM sone 35
  "36", // ED50 UTM sone 36
  "50", // ED50 geografisk
  "51", // NGO 56A (Møre)
  "52", // NGO 56B (Møre)
  "53", // Møre A
  "54", // Møre B
  "84", // EUREF89 geografisk
] as const

// ref: KoordinatsystemKodeId.java
export const koordinatSystemKodeSchema = z.enum(koordinatSystemKoder).meta({
  id: "KoordinatSystemKode",
  description: `SOSI-kode som identifiserer koordinatsystemet koordinatene er oppgitt i.
Kodeverdien er en forhåndsdefinert identifikator og skal slås opp i listen nedenfor.
Den er ikke satt sammen av nummeret på referanserammen, projeksjonen eller sonen.

Navnet på et koordinatsystem kan vanligvis leses som:

\`<geodetisk referanseramme>\` + \`<projeksjon eller koordinattype>\` + \`<sone, akse eller lokal variant>\`

Geodetisk referanseramme beskriver hvordan koordinatene er knyttet til jordens form og plassering:

- EUREF89:
  Den moderne regionale referanserammen som brukes for kartlegging i Norge.
  EUREF89 tilsvarer det europeiske referansesystemet ETRS89.

- NGO1948:
  En eldre, lokal norsk referanseramme. Den ble brukt før EUREF89 og
  forekommer fortsatt i eldre norske kart og datasett.

- ED50:
  European Datum 1950. En eldre regional referanseramme for Europa,
  blant annet brukt i tidligere topografiske kart.

Projeksjon eller koordinattype beskriver hvordan jordoverflaten fremstilles:

- UTM:
  Universal Transverse Mercator. En kartprojeksjon som gir plane
  nord- og østkoordinater, normalt oppgitt i meter.

- Gauss-Krüger:
  En transversal Mercator-projeksjon brukt sammen med NGO1948.
  Norge ble delt inn i åtte akser, nummerert fra 1 til 8.

- Geografisk:
  Ingen plan kartprojeksjon. Posisjonen oppgis som geografisk
  breddegrad og lengdegrad, normalt i grader.

- NGO 56A, NGO 56B, Møre A og Møre B:
  Historiske, lokale koordinatsystemvarianter brukt for Møre.
  Betegnelser som 56A er variantnavn og ikke UTM-soner.

Sone eller akse angir hvilken del av projeksjonen som brukes:

- UTM-soner:
  Nummererte, seks grader brede belter i øst–vest-retning.
  «UTM sone 35» betyr at koordinatene bruker UTM-projeksjonens sone 35.

- Gauss-Krüger-akser:
  «Gauss-Krüger akse 3» betyr at NGO1948-projeksjonens akse 3 brukes.`,
  example: "22",
})

export type KoordinatSystemKode = z.infer<typeof koordinatSystemKodeSchema>
