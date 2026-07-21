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

Navnet på et koordinatsystem kan vanligvis leses som:

\`<geodetisk referanseramme>\` + \`<projeksjon eller koordinattype>\` + \`<sone, akse eller lokal variant>\`

Koder:

\`\`\`
1: NGO1948 Gauss-K. akse 1
2: NGO1948 Gauss-K. akse 2
3: NGO1948 Gauss-K. akse 3
4: NGO1948 Gauss-K. akse 4
5: NGO1948 Gauss-K. akse 5
6: NGO1948 Gauss-K. akse 6
7: NGO1948 Gauss-K. akse 7
8: NGO1948 Gauss-K. akse 8
9: NGO1948 geografisk
21: EUREF89 UTM sone 31
22: EUREF89 UTM sone 32
23: EUREF89 UTM sone 33
24: EUREF89 UTM sone 34
25: EUREF89 UTM sone 35
26: EUREF89 UTM sone 36
31: ED50 UTM sone 31
32: ED50 UTM sone 32
33: ED50 UTM sone 33
34: ED50 UTM sone 34
35: ED50 UTM sone 35
36: ED50 UTM sone 36
50: ED50 geografisk
51: NGO 56A (Møre)
52: NGO 56B (Møre)
53: Møre A
54: Møre B
84: EUREF89 geografisk
\`\`\``,

  example: "22",
})

export type KoordinatSystemKode = z.infer<typeof koordinatSystemKodeSchema>
