import { z } from "@hono/zod-openapi"

// ref: KoordinatsystemKodeId.java
export const koordinatSystemKodeSchema = z
  .union([
    z.literal(1), // NGO1948 Gauss-K. akse 1
    z.literal(2), // NGO1948 Gauss-K. akse 2
    z.literal(3), // NGO1948 Gauss-K. akse 3
    z.literal(4), // NGO1948 Gauss-K. akse 4
    z.literal(5), // NGO1948 Gauss-K. akse 5
    z.literal(6), // NGO1948 Gauss-K. akse 6
    z.literal(7), // NGO1948 Gauss-K. akse 7
    z.literal(8), // NGO1948 Gauss-K. akse 8
    z.literal(9), // NGO1948 geografisk
    z.literal(21), // EUREF89 UTM sone 31
    z.literal(22), // EUREF89 UTM sone 32
    z.literal(23), // EUREF89 UTM sone 33
    z.literal(24), // EUREF89 UTM sone 34
    z.literal(25), // EUREF89 UTM sone 35
    z.literal(26), // EUREF89 UTM sone 36
    z.literal(31), // ED50 UTM sone 31
    z.literal(32), // ED50 UTM sone 32
    z.literal(33), // ED50 UTM sone 33
    z.literal(34), // ED50 UTM sone 34
    z.literal(35), // ED50 UTM sone 35
    z.literal(36), // ED50 UTM sone 36
    z.literal(50), // ED50 geografisk
    z.literal(51), // NGO 56A (Møre)
    z.literal(52), // NGO 56B (Møre)
    z.literal(53), // Møre A
    z.literal(54), // Møre B
    z.literal(84), // EUREF89 geografisk
  ])
  .meta({
    id: "KoordinatSystemKode",
    description:
      "SOSI-kode som identifiserer koordinatsystemet koordinatene er oppgitt i.\n" +
      "Kodeverdien er en forhåndsdefinert identifikator og skal slås opp i listen nedenfor.\n" +
      "Den er ikke satt sammen av nummeret på referanserammen, projeksjonen eller sonen.\n" +
      "\n" +
      "Navnet på et koordinatsystem kan vanligvis leses som:\n" +
      "\n" +
      "<geodetisk referanseramme> + <projeksjon eller koordinattype> + <sone, akse eller lokal variant>\n" +
      "\n" +
      "Geodetisk referanseramme beskriver hvordan koordinatene er knyttet til jordens form og plassering:\n" +
      "\n" +
      "- EUREF89:\n" +
      "  Den moderne regionale referanserammen som brukes for kartlegging i Norge.\n" +
      "  EUREF89 tilsvarer det europeiske referansesystemet ETRS89.\n" +
      "\n" +
      "- NGO1948:\n" +
      "  En eldre, lokal norsk referanseramme. Den ble brukt før EUREF89 og\n" +
      "  forekommer fortsatt i eldre norske kart og datasett.\n" +
      "\n" +
      "- ED50:\n" +
      "  European Datum 1950. En eldre regional referanseramme for Europa,\n" +
      "  blant annet brukt i tidligere topografiske kart.\n" +
      "\n" +
      "Projeksjon eller koordinattype beskriver hvordan jordoverflaten fremstilles:\n" +
      "\n" +
      "- UTM:\n" +
      "  Universal Transverse Mercator. En kartprojeksjon som gir plane\n" +
      "  nord- og østkoordinater, normalt oppgitt i meter.\n" +
      "\n" +
      "- Gauss-Krüger:\n" +
      "  En transversal Mercator-projeksjon brukt sammen med NGO1948.\n" +
      "  Norge ble delt inn i åtte akser, nummerert fra 1 til 8.\n" +
      "\n" +
      "- Geografisk:\n" +
      "  Ingen plan kartprojeksjon. Posisjonen oppgis som geografisk\n" +
      "  breddegrad og lengdegrad, normalt i grader.\n" +
      "\n" +
      "- NGO 56A, NGO 56B, Møre A og Møre B:\n" +
      "  Historiske, lokale koordinatsystemvarianter brukt for Møre.\n" +
      "  Betegnelser som 56A er variantnavn og ikke UTM-soner.\n" +
      "\n" +
      "Sone eller akse angir hvilken del av projeksjonen som brukes:\n" +
      "\n" +
      "- UTM-soner:\n" +
      "  Nummererte, seks grader brede belter i øst–vest-retning.\n" +
      "  «UTM sone 35» betyr at koordinatene bruker UTM-projeksjonens sone 35.\n" +
      "\n" +
      "- Gauss-Krüger-akser:\n" +
      "  «Gauss-Krüger akse 3» betyr at NGO1948-projeksjonens akse 3 brukes.",
    example: 22,
  })

export type KoordinatSystemKode = z.infer<typeof koordinatSystemKodeSchema>
