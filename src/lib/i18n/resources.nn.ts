import { koderNn } from "./koder/resources.koder.nn.ts"
import { shared } from "./resources.shared"
import type { ValidRapportResources } from "./validRapportResources.ts"

export const nn = {
  ...shared,
  tom: "tom",
  koder: koderNn,
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
        title: "Utvalskriterier",
        avgrensning: "Avgrensing",
        filtrering: "Filtrering",
        innholdIRapporten: "Innhald i rapporten",
        innhold: "Innhald",
        byggstatus: "Byggstatus",
        periode: "Periode",
        ikkeAngitt: "Ikkje oppgitt",
        omfang: {
          tittel: "Bygningar valde",
          inkluderBestaaendeBygg: "Eksisterande bygg",
          inkluderUtgaatteBygg: "Utgåtte bygg",
          inkluderBygninger: "Bygningar",
          inkluderBygningsendringer: "Bygningsendringar",
          inkluderFrededeBygninger: "Freda bygningar",
        },
        bygning: {
          tittel: "Bygning",
          bygningsNr: "Bygningsnr",
          bygningstyper: "Bygningstypar",
          lopeNr: "Løpenr",
        },
        adresse: {
          tittel: "Adresse",
          adresseKode: "Adressekode",
          adresseNavn: "Adressenamn",
          adresseNr: "Nr",
          adresseTilleggsNavn: "Tilleggsnamn",
          adresseBokstav: "Bokstav",
          bruksenhetsNr: "Brukseiningsnr",
          utenBokstav: "Utan bokstav",
        },
        matrikkelenhet: {
          tittel: "Matrikkeleining",
          gnr: "Gnr",
          bnr: "Bnr",
          fnr: "Fnr",
          snr: "Snr",
        },

        bygningsstatus: {
          tittel: "Bygningsstatus",
          naavaerende: "Noverande",
          tidligere: "Tidlegare",
          periodeFra: "Periode frå",
          periodeTil: "Til",
        },
        sokevindu: {
          tittel: "Søkjevindauge",
          nord: "Nord",
          ost: "Aust",
          vest: "Vest",
          syd: "Sør",
        },
        subrapporter: {
          tittel: "Delrapportar",
          inkluderEtasjer: "Etasjar",
          inkluderBruksenheter: "Brukseiningar",
          inkluderTiltakshavere: "Tiltakshavarar",
          inkluderKontaktpersoner: "Kontaktpersonar",
          inkluderHjemmelshavere: "Heimelshavarar",
          inkluderKulturminner: "Kulturminne",
        },
      },
      matrikkelenhet: "Matrikkeleining",
      bygningsnummer: "Bygningsnummer",
      naavarendeBygning: "Nåverande bygning",
      omBygget: {
        tittel: "Om bygget",
        bygningstype: "Bygningstype",
        naringsgruppe: "Næringsgruppe",
        boenheter: "Bygningar",
        representasjonspunkt: "Representasjonspunkt",
      },
      areal: {
        tittel: "Areal",
        bruksareal: "Bruksareal",
        bruttoareal: "Bruttoareal",
        bolig: "Bustad",
        annet: "Anna",
        total: "Totalt",
        enhet: "m²",
      },
      bygningsstatuser: {
        tittel: "Bygningsstatuser",
      },

      etasjer: {
        title: "Etasjar",
        etasjeplan: "Etasjeplan",
        etasje: "Etasje",
        antallBoenheter: "Bueiningar",
      },
      byggEndringer: {
        bruksenheter: {
          tittel_one: "Berørt brukseining",
          tittel_other: "Brukseiningar",
          ingenEndring: "Ingen endringar registrerte på bygget.",
          bruksenhetsNr: "Brukseining",
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
        navn: "Namn",
        adresse: "Adresse",
      },
      kontaktpersoner: {
        tittel: "Kontaktpersonar",
        bruksenhet: "Knytt brukseining",
      },
      tiltakshavere: {
        tittel: "Tiltakshavarar",
        bruksenhet: "Knytt brukseining",
      },
      hjemmelshavere: {
        tittel: "Heimelshavarar",
        status: "Status",
        identifikasjonsNr: "Fødselsnr/orgnr",
        andel: "Andel",
        bruksenhet: "Tilknytt brukseining",
      },
    },
    metaData: {},
    // biome-ignore lint/suspicious/noExplicitAny: metaData type varies by rapport
  } satisfies ValidRapportResources & { metaData: any },
} as const
