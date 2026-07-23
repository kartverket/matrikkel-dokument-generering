import { z } from "@hono/zod-openapi"

const eierforholdKoder = [
  // Hjemmelshaver: Den som grunnboken utpeker som hjemmelshaver (eier).
  "H",
  // Fester: Andelshaveren har inngått festekontrakt med hjemmelshaver.
  "F",
  // Framfester: Andelshaveren har inngått festekontrakt med fester.
  "F1",
  // Framfester 2: Andelshaveren har inngått festekontrakt med framfester.
  "F2",
  // Framfester 3: Andelshaveren har inngått festekontrakt med framfester 2.
  "F3",
  // Framfester 4: Andelshaveren har inngått festekontrakt med framfester 3.
  "F4",
  // Framfester 5: Andelshaveren har inngått festekontrakt med framfester 4.
  "F5",
  // Framfester 6: Andelshaveren har inngått festekontrakt med framfester 5.
  "F6",
  // Framfester 7: Andelshaveren har inngått festekontrakt med framfester 6.
  "F7",
  // Framfester 8: Andelshaveren har inngått festekontrakt med framfester 7.
  "F8",
  // Framfester 9: Andelshaveren har inngått festekontrakt med framfester 8.
  "F9",
  // Aktuell eier: Tilsvarer hjemmelshaver, men er ikke tinglyst.
  "AE",
  // Aktuell fester: Tilsvarer fester, men er ikke tinglyst.
  "AF",
  // Kontaktinstans eier: Kontaktinstans for eier.
  "KE",
  // Kontaktinstans fester: Kontaktinstans for fester.
  "KF",
  // Kommunal person 1: Første kommunale kontaktinstans. Kommunen bestemmer betydningen av de kommunale kontaktinstansene.
  "K1",
  // Kommunal person 2: Andre kommunale kontaktinstans. Kommunen bestemmer betydningen av de kommunale kontaktinstansene.
  "K2",
  // Kommunal person 3: Tredje kommunale kontaktinstans. Kommunen bestemmer betydningen av de kommunale kontaktinstansene.
  "K3",
  // Skatteregistrert eier: Rettighetshaver til eiendomsrett registrert hos Skatteetaten.
  "SE",
  // Skatteregistrert fester: Rettighetshaver til festerett registrert hos Skatteetaten.
  "SF",
  // Skatteregistrert framfester: Rettighetshaver til framfesterett registrert hos Skatteetaten.
  "SF1",
  // Skatteregistrert framfester 2: Rettighetshaver til framfesterett 2 registrert hos Skatteetaten.
  "SF2",
  // Skatteregistrert framfester 3: Rettighetshaver til framfesterett 3 registrert hos Skatteetaten.
  "SF3",
] as const

// ref: EierforholdKodeId.java
export const eierforholdKodeSchema = z.enum(eierforholdKoder).meta({
  id: "EierforholdKode",
  description: `Angir typen eierforhold som kommer fra tinglysingssystemet eller ved registrering i matrikkelen.

Koder:

\`\`\`
H: Hjemmelshaver
F: Fester
F1: Framfester
F2: Framfester 2
F3: Framfester 3
F4: Framfester 4
F5: Framfester 5
F6: Framfester 6
F7: Framfester 7
F8: Framfester 8
F9: Framfester 9
AE: Aktuell eier
AF: Aktuell fester
KE: Kontaktinstans eier
KF: Kontaktinstans fester
K1: Kommunal person 1
K2: Kommunal person 2
K3: Kommunal person 3
SE: Skatteregistrert eier
SF: Skatteregistrert fester
SF1: Skatteregistrert framfester
SF2: Skatteregistrert framfester 2
SF3: Skatteregistrert framfester 3
\`\`\``,
})

export type EierforholdKode = z.infer<typeof eierforholdKodeSchema>
