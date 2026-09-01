import { koderNb } from "./koder/resources.koder.nb.ts"
import { shared } from "./resources.shared"
import type { ValidRapportResources } from "./validRapportResources.ts"

export const nb = {
  ...shared,
  tom: "tom",
  koder: koderNb,
  pdf: {
    footer: {
      side: "Side",
      av: "av",
    },
  },
  rapport: {
    BYG0011: {
      rapportTittel: "Byggrapport",
      title: "Bygning {{bygningsnr}} – {{bygningstype}}",
      utvalgskriterier: {
        title: "Utvalgskriterier",
        avgrensning: "Avgrensning",
        filtrering: "Filtrering",
        innholdIRapporten: "Innhold i rapporten",
        innhold: "Innhold",
        byggstatus: "Byggstatus",
        periode: "Periode",
        ikkeAngitt: "Ikke angitt",
        omfang: {
          tittel: "Bygninger valgt",
          inkluderBestaaendeBygg: "Bestående bygninger",
          inkluderUtgaatteBygg: "Utgåtte bygg",
          inkluderBygninger: "Bygninger",
          inkluderBygningsendringer: "Bygningsendringer",
          inkluderFrededeBygninger: "Fredede bygninger",
        },
        bygning: {
          tittel: "Bygning",
          bygningsNr: "Bygningsnr",
          bygningstyper: "Bygningstyper",
          lopeNr: "Løpenr",
        },
        adresse: {
          tittel: "Adresse",
          adresseKode: "Adressekode",
          adresseNavn: "Adressenavn",
          adresseNr: "Nr",
          adresseTilleggsNavn: "Tilleggsnavn",
          adresseBokstav: "Bokstav",
          bruksenhetsNr: "Bruksenhetsnr",
          utenBokstav: "Uten bokstav",
        },
        matrikkelenhet: {
          tittel: "Matrikkelenhet",
          gnr: "Gnr",
          bnr: "Bnr",
          fnr: "Fnr",
          snr: "Snr",
        },

        bygningsstatus: {
          tittel: "Bygningsstatus",
          naavaerende: "Nåværende",
          tidligere: "Tidligere",
          periodeFra: "Periode fra",
          periodeTil: "Til",
        },
        sokevindu: {
          tittel: "Søkevindu",
          nord: "Nord",
          ost: "Øst",
          vest: "Vest",
          syd: "Syd",
        },
        subrapporter: {
          tittel: "Subrapporter",
          inkluderEtasjer: "Etasjer",
          inkluderBruksenheter: "Bruksenheter",
          inkluderTiltakshavere: "Tiltakshavere",
          inkluderKontaktpersoner: "Kontaktpersoner",
          inkluderHjemmelshavere: "Hjemmelshavere",
          inkluderKulturminner: "Kulturminner",
        },
      },
      matrikkelenhet: "Matrikkelenhet",
      bygningsnummer: "Bygningsnummer",
      naavarendeBygning: "Nåværende bygning",
      omBygget: {
        tittel: "Om bygget",
        bygningstype: "Bygningstype",
        naringsgruppe: "Næringsgruppe",
        boenheter: "Boenheter",
        representasjonspunkt: "Representasjonspunkt",
      },
      areal: {
        tittel: "Areal",
        bruksareal: "Bruksareal",
        bruttoareal: "Bruttoareal",
        bolig: "Bolig",
        annet: "Annet",
        total: "Total",
        enhet: "m²",
      },
      bygningsstatuser: {
        tittel: "Bygningsstatuser",
      },

      etasjer: {
        title: "Etasjer",
        etasjeplan: "Etasjeplan",
        etasje: "Etasje",
        antallBoenheter: "Boenheter",
      },
      byggEndringer: {
        bruksenheter: {
          tittel_one: "Bruksenhet",
          tittel_other: "Bruksenheter",
          ingenEndring: "Ingen endringer registrert på bygget.",
          bruksenhetsNr: "Bruksenhet",
          bruksenhetsTypeKode: "Type",
          bruksAreal: "Bruksareal",
          antallRom: "Antall rom",
          antallBad: "Antall bad",
          antallWC: "Antall WC",
          kjokkenTilgangKode: "Kjøkkentilgang",
          adresse: "Adresse",
          matrikkelNr: "Matrikkelenhet",
        },
      },
      person: {
        rolle: "Rolle",
        identifikasjonsNr: "Fødsels-/org.nr",
        navn: "Navn",
        adresse: "Adresse",
      },
      kontaktpersoner: {
        tittel: "Kontaktpersoner",
        bruksenhet: "Knyttet bruksenhet",
      },
      tiltakshavere: {
        tittel: "Tiltakshavere",
        bruksenhet: "Knyttet bruksenhet",
      },
      hjemmelshavere: {
        tittel: "Hjemmelshavere",
        status: "Status",
        identifikasjonsNr: "Fødselsnr/orgnr",
        andel: "Andel",
        bruksenhet: "Tilknyttet bruksenhet",
      },
    },
    metaData: {},
    // biome-ignore lint/suspicious/noExplicitAny: metaData type varies by rapport
  } satisfies ValidRapportResources & { metaData: any },
} as const
