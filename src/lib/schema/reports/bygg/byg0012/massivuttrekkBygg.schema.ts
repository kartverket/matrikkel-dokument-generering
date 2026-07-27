import { z } from "@hono/zod-openapi"
import {
  valgfriBool,
  valgfriDato,
  valgfriHeltall,
  valgfriListe,
  valgfriNummer,
  valgfriObjekt,
  valgfriSchema,
  valgfriString,
} from "../../../core/utils/zodUtils.ts"
import { avlopsKodeSchema } from "../koder/avlopsKode.schema.ts"
import { bruksenhetsKodeSchema } from "../koder/bruksenhetsTypeKode.schema.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"
import { etasjeplanKodeSchema } from "../koder/etasjeplanKode.schema.ts"
import { kjokkenTilgangKodeSchema } from "../koder/kjokkenTilgangKode.ts"
import { naringsgruppeKodeSchema } from "../koder/naringsgruppeKode.schema.ts"
import { vannforsyningsKodeSchema } from "../koder/vannforsyningsKode.schema.ts"
import { arealFordelingSchema } from "../shared/arealFordeling.schema.ts"

const byggTyper = [
  "Bygning", // Selve bygningen (grunnregistreringen)
  "Bygningsendring",
] as const

export const byggTypeSchema = z.enum(byggTyper).meta({
  id: "ByggType",
  description: `Angir om raden gjelder selve bygningen eller en bygningsendring.

Koder:

\`\`\`
Bygning: Selve bygningen (grunnregistreringen)
Bygningsendring: En registrert endring på bygningen, for eksempel tilbygg eller påbygg
\`\`\``,
  example: "Bygning",
})

// ref: MassivuttrekkBruksenhet.vm / MassivuttrekkP13Bruksenhet.vm
const massivuttrekkBruksenhetSchema = valgfriObjekt({
  bruksenhetsNr: valgfriString.meta({
    title: "Bruksenhetsnummer",
    description:
      "Bruksenhetsnummer, sammensatt av etasjeplan, etasjenummer og løpenummer.",
    example: "H0101",
  }),

  matrikkelNr: z.string().min(1).meta({
    title: "Matrikkelnummer",
    example: "5001-12/34/0/2",
    description:
      "Matrikkelnummeret til matrikkelenheten bruksenheten tilhører. KommuneNr-GårdsNr/BruksNr/Festenr/SeksjonsNr",
  }),

  adresse: valgfriString.meta({
    description: "Adressen bruksenheten tilhører.",
    example: "Storgata 15A, 0155 Oslo",
  }),

  bruksenhetsTypeKode: valgfriSchema(bruksenhetsKodeSchema),

  antallRom: valgfriHeltall.meta({ description: "Antall rom." }),
  antallBad: valgfriHeltall.meta({ description: "Antall bad." }),
  antallWC: valgfriHeltall.meta({ description: "Antall WC." }),

  bruksAreal: valgfriNummer.meta({
    description: "Bruksarealet til bruksenheten. Oppgis i kvadratmeter.",
  }),

  kjokkenTilgangKode: valgfriSchema(kjokkenTilgangKodeSchema),
}).meta({
  title: "Bruksenhet",
  description:
    "Bruksenhet i bygget. Bruksenhetsnummer, matrikkelnummer og adresse kan utleveres etter paragraf 13; øvrige opplysninger kun etter søknad.",
})

// ref: MassivuttrekkEtasje.vm
const massivuttrekkEtasjeSchema = valgfriObjekt({
  etasjeplanKode: etasjeplanKodeSchema,
  etasje: z.number().int().nonnegative().meta({
    title: "Etasjenummer",
    description: "Etasjenummeret innenfor etasjeplanet.",
    example: 1,
  }),
  antallBoenheter: valgfriHeltall.meta({
    description: "Antall boenheter i etasjen.",
  }),
  bruksareal: arealFordelingSchema, // bolig/annet/totalt
}).meta({
  title: "Etasje",
  description:
    "Etasje i bygget med arealopplysninger. Kan kun utleveres etter søknad.",
})

// ref: MassivuttrekkBygg.vm / MassivuttrekkP13Bygg.vm
export const massivuttrekkByggSchema = valgfriObjekt({
  type: byggTypeSchema,

  kommuneNr: valgfriString.meta({
    title: "Kommunenummer",
    description:
      "Kommunenummeret til kommunen bygget ligger i. Uttrekket kan omfatte flere kommuner.",
    example: "0301",
  }),

  bygningsnr: z.string().min(1).meta({
    title: "Bygningsnummer",
    description:
      "En entydig identifikasjon av bygningen som er unik på landsbasis og tildeles automatisk.",
    example: "12 345 678",
  }),

  lopeNr: valgfriHeltall.meta({
    title: "Løpenummer",
    description:
      "Løpenummeret til en bygningsendring under et bygningsnummer. Utelates for selve bygningen.",
    example: 1,
  }),

  bygningsStatusKode: valgfriSchema(byggningsStatusKodeSchema),

  statusDato: valgfriDato.meta({
    title: "Statusdato",
    description: "Dato for siste registrerte bygningsstatus.",
  }),

  bygningsTypeKode: valgfriSchema(bygningsTypeKodeSchema),
  naringsgruppeKode: valgfriSchema(naringsgruppeKodeSchema),

  nord: valgfriNummer.meta({
    description:
      "Koordinatverdien for nord gitt valgt koordinatSystem (se KoordinatSystemKode for mer beskrivelse)",
    example: 6642100,
  }),
  ost: valgfriNummer.meta({
    description:
      "Koordinatverdien for øst gitt valgt koordinatSystem (se KoordinatSystemKode for mer beskrivelse)",
    example: 597400,
  }),

  vannforsyningsKode: valgfriSchema(vannforsyningsKodeSchema),
  avlopsKode: valgfriSchema(avlopsKodeSchema),

  harHeis: valgfriBool.meta({
    description: "Angir om bygget har heis.",
  }),

  bebygdAreal: valgfriNummer.meta({
    description: "Bebygd areal i kvadratmeter.",
    example: 95,
  }),

  bruksenheter: valgfriListe(massivuttrekkBruksenhetSchema),
  etasjer: valgfriListe(massivuttrekkEtasjeSchema),
}).meta({
  title: "Massivuttrekk bygg",
  description: `Ett bygg (bygning eller bygningsendring) i massivuttrekket, med tilhørende bruksenheter og etasjer.
    Identifikasjon, bygningstype, næringsgruppe og koordinater kan utleveres etter paragraf 13; 
    statusdato, vannforsyning, avløp, heis og bebygd areal kun etter søknad.`,
})

export type ByggType = z.infer<typeof byggTypeSchema>
export type MassivuttrekkBygg = z.infer<typeof massivuttrekkByggSchema>

type MassivuttrekkBruksenheter = NonNullable<
  NonNullable<MassivuttrekkBygg>["bruksenheter"]
>
export type MassivuttrekkBruksenhet = NonNullable<
  MassivuttrekkBruksenheter[number]
>

type MassivuttrekkEtasjer = NonNullable<
  NonNullable<MassivuttrekkBygg>["etasjer"]
>
export type MassivuttrekkEtasje = NonNullable<MassivuttrekkEtasjer[number]>
