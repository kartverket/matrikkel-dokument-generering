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
} from "../../shared/zodUtils.ts"
import { byggningsStatusKodeSchema } from "../koder/byggningsStatusKode.schema.ts"
import { bygningsTypeKodeSchema } from "../koder/bygningsTypeKodeSchema.ts"

// Felles utvalgskriterier for all bygg rapporter (BYGXXXX)
export const byggUtvalgskriterierSchema = valgfriObjekt({
  // Omfang filter-kriterier
  omfang: z
    .object({
      inkluderBestaaendeBygg: valgfriBool.meta({
        title: "Inkluder bestående bygg",
        description:
          "Angir om rapporten skal inkludere bygg som ikke er registrert som utgått.",
      }),
      inkluderUtgaatteBygg: valgfriBool.meta({
        title: "Inkluder utgåtte bygg",
        description:
          "Angir om rapporten skal inkludere bygg som er registrert som utgått, for eksempel revet eller brent.",
      }),
      inkluderBygninger: valgfriBool.meta({
        title: "Inkluder bygninger",
        description:
          "Angir om rapporten skal inkludere selve bygningene (løpenummer er ikke angitt).",
      }),
      inkluderBygningsendringer: valgfriBool.meta({
        title: "Inkluder bygningsendringer",
        description:
          "Angir om rapporten skal inkludere registrerte endringer på bygninger, for eksempel tilbygg eller påbygg.",
      }),
      inkluderFrededeBygninger: valgfriBool.meta({
        title: "Inkluder fredede bygninger",
        description:
          "Angir om rapporten skal inkludere bygninger som er registrert som fredet.",
      }),
    })
    .meta({
      title: "Omfang",
      description: "Angir hvilke hovedkategorier rapporten skal omfatte.",
    }),

  //Bygg filter-kriterier
  bygning: valgfriObjekt({
    bygningsNr: valgfriString.meta({
      example: "123456789",
      description:
        "En entydig identifikasjon av bygningen som er unik på landsbasis og tildeles automatisk.",
    }),
    bygningstyper: valgfriListe(bygningsTypeKodeSchema).meta({
      title: "Bygningstyper",
      description:
        "Bygningstypene som skal inkluderes i rapporten. Hver type oppgis med kode fra Matrikkelens bygningsklassifikasjon.",
      example: [{ kode: "111" }],
    }),
    lopeNr: valgfriHeltall.meta({
      title: "Løpenummer",
      description:
        "Løpenummeret til en bygningsendring under et bygningsnummer. Utelates for selve bygningen.",
      example: 1,
    }),
  }),

  // Adresse filter-kriterier
  adresse: valgfriObjekt({
    adresseKode: valgfriString.meta({
      example: "1000",
      description:
        "Adressekode (tidligere gatekode) er et nummer som entydig identifiserer adresserbare\n" +
        "gater, veger, stier, plasser og områder som er ført i matrikkelen.",
    }),
    adresseNavn: valgfriString.meta({
      example: "Storgata",
      description:
        "Adressenavn er definert i matrikkelforskriften § 2 bokstav e som navn på gate, veg, sti,\n" +
        "plass eller område, brukt som del av den offisielle adressen. Et adressenavn skal være\n" +
        "entydig innenfor samme kommune. To gater kan således ikke ha samme navn i samme\n" +
        "kommune. Dersom to eller flere kommuner har et felles adresseringsområde skal navnet\n" +
        "være entydig innenfor alle de aktuelle kommunene. Dersom navnet er på flere enn 22\n" +
        "posisjoner, skal det i tillegg tildeles en offisiell forkortelse for navnet. Nærmere regler om\n" +
        "tildeling av adressenavn framgår av matrikkelforskriften § 51.",
    }),
    adresseNr: valgfriHeltall.meta({
      example: 1,
      description:
        "Adressenummer er definert i matrikkelforskriften § 2 bokstav f, som et nummer og en\n" +
        "eventuell bokstav som entydig identifiserer matrikkelenheter, anlegg, bygninger eller\n" +
        "innganger til bygninger innenfor en adresserbar gate, veg, sti, plass eller område.\n" +
        "Adressenummeret kan peke til områder, plasser og objekter hvor det ikke finnes noe bygg.",
    }),
    adresseTilleggsNavn: valgfriString.meta({
      example: "Solgløtt",
      description:
        "Etter matrikkelforskriften § 54 er det åpnet for at vegadresser kan ha et tilleggsnavn,\n" +
        "adressetilleggsnavn, som inngår i den offisielle adressen. Bakgrunnen for dette er et ønske\n" +
        "om å kunne ta vare på bruksnavn av kulturhistorisk verdi, slik at disse kan komme i vanlig\n" +
        "bruk som en del av den offisielle adressen. Dersom matrikkeladresser ikke har et\n" +
        "adressetilleggsnavn kan de tildeles matrikkeladressenavn.",
    }),

    adresseBokstav: valgfriString.meta({
      example: "A",
      description:
        "En eventuell bokstav etter adressenummeret. Eksempel: A i «Storgata 15A",
    }),

    bruksenhetsNr: valgfriString.meta({
      example: "H0101",
      description:
        "Nummeret som identifiserer en bestemt leilighet eller annen bruksenhet når flere enheter har samme gateadresse" +
        "Eksempelvis betyr H0203 normalt hovedetasje, etasje 2, bruksenhet 03.",
    }),

    utenBokstav: z
      .boolean()
      .nullable()
      .optional()
      .default(null)
      .meta({
        description:
          "Betyr at søket skal omfatte adresser som bare har nummer, uten bokstav.\n" +
          "true: Bare adresser uten bokstav, for eksempel Storgata 15" +
          "false: Bare adresser med bokstav, for eksempel Storgata 15A" +
          "null: Både adresser med og uten bokstav tas med" +
          "Eksempel: «Storgata 15», men ikke «Storgata 15A».",
      }),
  }),

  // Matrikkelenhet filter-kriterier
  matrikkelenhet: valgfriObjekt({
    gnr: valgfriHeltall.meta({
      title: "Gårdsnummer",
      description: "Nummeret på et større geografisk område innen kommunen.",
    }),
    bnr: valgfriHeltall.meta({
      title: "Bruksnummer",
      description: "Nummeret på den enkelte eiendommen innenfor gårdsnummeret.",
    }),
    fnr: valgfriHeltall.meta({
      title: "Festenummer",
      description:
        "Nummeret brukes når tomten er festet, altså leid på lang tid, i stedet for eid som egen grunneiendom.",
    }),
    snr: valgfriHeltall.meta({
      title: "Seksjonsnummer",
      description:
        "Nummeret brukes når eiendommen er seksjonert, for eksempel en eierleilighet eller næringsseksjon i et sameie.",
    }),
  }),

  // Aktør filter-kriterier
  aktoer: valgfriObjekt({
    identifikasjonsNr: valgfriString.meta({
      title: "Fødsels- eller organisasjonsnummer",
      description:
        "Fødselsnummer eller organisasjonsnummer til hjemmelshaveren eller kontaktpersonen det skal søkes etter.",
      example: "999999999",
    }),
    etternavn: valgfriString.meta({
      title: "Etternavn eller foretaksnavn",
      description:
        "Etternavn til personen, eller navn på foretaket, det skal søkes etter.",
      example: "Nordmann",
    }),
    fornavn: valgfriString.meta({
      title: "Fornavn",
      description: "Fornavn til personen det skal søkes etter.",
      example: "Ola",
    }),
  }).meta({
    title: "Aktør",
    description:
      "En aktør kan være en person eller virksomhet og opptre i én eller flere roller, som hjemmelshaver, kontaktperson eller tiltakshaver.",
  }),

  // Byggningsstatus filter-kriterier
  bygningsstatus: valgfriObjekt({
    naavaerende: valgfriListe(valgfriSchema(byggningsStatusKodeSchema)).meta({
      description: "Én eller flere statuser som bygningen skal ha nå.",
    }),
    tidligere: valgfriSchema(byggningsStatusKodeSchema).meta({
      description:
        "Én eller flere tidligere statuser som skal finnes i bygningens statushistorikk. ",
    }),
    periodeFra: valgfriDato.meta({
      title: "Statusperiode fra",
      description:
        "Starttidspunkt for perioden som søket i bygningens statushistorikk skal avgrenses til.",
    }),
    periodeTil: valgfriDato.meta({
      title: "Statusperiode til",
      description:
        "Sluttidspunkt for perioden som søket i bygningens statushistorikk skal avgrenses til.",
      example: "2026-07-17T00:00:00Z",
    }),
  }),

  // Søkevindu filter-kriterier
  sokevindu: valgfriObjekt({
    nord: valgfriNummer.meta({
      title: "Nordlig grense",
      description:
        "Nordlig grense for søkevinduet (største nordkoordinat/Y-verdi).",
      example: 6642200,
    }),
    ost: valgfriNummer.meta({
      title: "Østlig grense",
      description:
        "Østlig grense for søkevinduet (største østkoordinat/X-verdi).",
      example: 597500,
    }),
    vest: valgfriNummer.meta({
      title: "Vestlig grense",
      description:
        "Vestlig grense for søkevinduet (minste østkoordinat/X-verdi).",
      example: 597300,
    }),
    syd: valgfriNummer.meta({
      title: "Sørlig grense",
      description:
        "Sørlig grense for søkevinduet (minste nordkoordinat/Y-verdi).",
      example: 6642000,
    }),
  }).meta({
    title: "Søkevindu",
    description:
      "Rektangulært geografisk område som rapporten skal omfatte. Koordinatene oppgis i koordinatsystemet valgt for rapporten; vest må være mindre enn øst, og syd må være mindre enn nord.",
    example: {
      nord: 6642200,
      ost: 597500,
      vest: 597300,
      syd: 6642000,
    },
  }),

  // Subrapporter filter-kriterier
  subrapporter: valgfriObjekt({
    inkluderEtasjer: valgfriBool.meta({
      title: "Inkluder etasjer",
      description:
        "Angir om rapporten skal vise registrerte etasjer med blant annet etasjeplan og arealopplysninger.",
      example: true,
    }),
    inkluderBruksenheter: valgfriBool.meta({
      title: "Inkluder bruksenheter",
      description:
        "Angir om rapporten skal vise registrerte bruksenheter, for eksempel boliger og næringsenheter.",
      example: true,
    }),
    inkluderTiltakshavere: valgfriBool.meta({
      title: "Inkluder tiltakshavere",
      description:
        "Angir om rapporten skal vise registrerte tiltakshavere for bygningsendringer.",
      example: true,
    }),
    inkluderKontaktpersoner: valgfriBool.meta({
      title: "Inkluder kontaktpersoner",
      description:
        "Angir om rapporten skal vise registrerte kontaktpersoner eller kontaktinstanser.",
      example: true,
    }),
    inkluderHjemmelshavere: valgfriBool.meta({
      title: "Inkluder hjemmelshavere",
      description:
        "Angir om rapporten skal vise registrerte hjemmelshavere eller aktuelle eiere.",
      example: true,
    }),
    inkluderKulturminner: valgfriBool.meta({
      title: "Inkluder kulturminner",
      description:
        "Angir om rapporten skal vise registrerte kulturminneopplysninger, for eksempel SEFRAK-identifikatorer.",
      example: true,
    }),
  }).meta({
    title: "Subrapporter",
    description:
      "Angir hvilke detaljerte opplysninger som skal tas med for hvert bygg i rapporten.",
  }),
}).meta({
  id: "ByggUtvalgskriterier",
  description:
    "Felles utvalgskriterier for byggrapporter (BYGXXXX). Kun oppgitte kriterier brukes til å avgrense rapporten.",
})

export type ByggUtvalgskriterier = z.infer<typeof byggUtvalgskriterierSchema>
