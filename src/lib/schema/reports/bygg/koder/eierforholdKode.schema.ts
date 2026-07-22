import { z } from "@hono/zod-openapi"

const eierforholdKoder = [
  // Hjemmelshaver: Den som grunnboken utpeker som hjemmelshaver (eier).
  "0",
  // Fester: Andelshaveren har inngått festekontrakt med hjemmelshaver.
  "1",
  // Framfester: Andelshaveren har inngått festekontrakt med fester.
  "2",
  // Framfester 2: Andelshaveren har inngått festekontrakt med framfester.
  "3",
  // Framfester 3: Andelshaveren har inngått festekontrakt med framfester 2.
  "4",
  // Framfester 4: Andelshaveren har inngått festekontrakt med framfester 3.
  "5",
  // Framfester 5: Andelshaveren har inngått festekontrakt med framfester 4.
  "6",
  // Framfester 6: Andelshaveren har inngått festekontrakt med framfester 5.
  "7",
  // Framfester 7: Andelshaveren har inngått festekontrakt med framfester 6.
  "8",
  // Framfester 8: Andelshaveren har inngått festekontrakt med framfester 7.
  "9",
  // Framfester 9: Andelshaveren har inngått festekontrakt med framfester 8.
  "10",
  // Aktuell eier: Tilsvarer hjemmelshaver, men er ikke tinglyst.
  "11",
  // Aktuell fester: Tilsvarer fester, men er ikke tinglyst.
  "12",
  // Kontaktinstans eier: Kontaktinstans for eier.
  "13",
  // Kontaktinstans fester: Kontaktinstans for fester.
  "14",
  // Kommunal person 1: Første kommunale kontaktinstans. Kommunen bestemmer betydningen av de kommunale kontaktinstansene.
  "15",
  // Kommunal person 2: Andre kommunale kontaktinstans. Kommunen bestemmer betydningen av de kommunale kontaktinstansene.
  "16",
  // Kommunal person 3: Tredje kommunale kontaktinstans. Kommunen bestemmer betydningen av de kommunale kontaktinstansene.
  "17",
  // Skatteregistrert eier: Rettighetshaver til eiendomsrett registrert hos Skatteetaten.
  "18",
  // Skatteregistrert fester: Rettighetshaver til festerett registrert hos Skatteetaten.
  "19",
  // Skatteregistrert framfester: Rettighetshaver til framfesterett registrert hos Skatteetaten.
  "20",
  // Skatteregistrert framfester 2: Rettighetshaver til framfesterett 2 registrert hos Skatteetaten.
  "21",
  // Skatteregistrert framfester 3: Rettighetshaver til framfesterett 3 registrert hos Skatteetaten.
  "22",
] as const

// ref: EierforholdKodeId.java
export const eierforholdKodeSchema = z.enum(eierforholdKoder).meta({
  id: "EierforholdKode",
  description: `Angir typen eierforhold som kommer fra tinglysingssystemet eller ved registrering i matrikkelen.

Koder:

\`\`\`
0: Hjemmelshaver
1: Fester
2: Framfester
3: Framfester 2
4: Framfester 3
5: Framfester 4
6: Framfester 5
7: Framfester 6
8: Framfester 7
9: Framfester 8
10: Framfester 9
11: Aktuell eier
12: Aktuell fester
13: Kontaktinstans eier
14: Kontaktinstans fester
15: Kommunal person 1
16: Kommunal person 2
17: Kommunal person 3
18: Skatteregistrert eier
19: Skatteregistrert fester
20: Skatteregistrert framfester
21: Skatteregistrert framfester 2
22: Skatteregistrert framfester 3
\`\`\``,
})

export type EierforholdKode = z.infer<typeof eierforholdKodeSchema>
