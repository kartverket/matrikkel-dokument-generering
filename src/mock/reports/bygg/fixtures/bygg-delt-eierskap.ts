import type { LegacyFixtureByggRapport } from "../../../types"

type Bygning = LegacyFixtureByggRapport["bygninger"][number]
type BygningstatusKode = Exclude<
  NonNullable<Bygning["bygningstatusKode"]>["kodeverdi"],
  undefined
>
type BygningstypeKode = Exclude<
  NonNullable<Bygning["bygningstypeKode"]>["kodeverdi"],
  undefined
>
type NaringsgruppeKode = Exclude<
  NonNullable<Bygning["naringsgruppeKode"]>["kodeverdi"],
  undefined
>
type EndringsKode = Exclude<
  NonNullable<Bygning["bygningsendringsKode"]>["kodeverdi"],
  undefined
>

const kode = <T extends string>(
  kodeverdi: T,
  displayTekst: string = kodeverdi,
) => ({
  kodeverdi,
  displayTekst,
})

function isoDate(date: string) {
  return `${date}T00:00:00Z`
}

function createBygning(input: {
  kommuneNr: string
  gnr: string
  bnr: string
  adresseNavn: string
  adresseNr: number
  bygningsnummer: string
  bygningstypeKode: BygningstypeKode
  bygningstatusKode: BygningstatusKode
  naringsgruppeKode: NaringsgruppeKode
  endringsKode?: EndringsKode
  bruksareal: number
  antallBoenheter: number
  nord: number
  ost: number
}): Bygning {
  const numericBygningsnummer = Number(input.bygningsnummer)
  const matrikkelNummer = `${input.kommuneNr}-${input.gnr}/${input.bnr}/0/0`
  const statusDato = isoDate("2024-01-01")
  const bruksenhetsnummer = input.antallBoenheter > 0 ? "H0101" : undefined

  return {
    bygningsnummer: input.bygningsnummer,
    lopenummer: 0,
    bygningsendringsKode: kode(input.endringsKode ?? "X", "Bygningsendring"),
    harUfullstendigAreal: "Nei",
    bygningstypeKode: kode(input.bygningstypeKode, "Bygningstype"),
    naringsgruppeKode: kode(input.naringsgruppeKode, "Naringsgruppe"),
    bygningstatusKode: kode(input.bygningstatusKode, "Bygningsstatus"),
    bebygdAreal: Math.max(1, Math.round(input.bruksareal * 0.7)),
    harHeis: false,
    vannforsyningsKode: kode("1", "Offentlig"),
    avlopsKode: kode("1", "Offentlig"),
    etasjedata: {
      antallBoenheter: input.antallBoenheter,
      bruksarealTilBolig: input.bruksareal,
      bruksarealTilAnnet: 0,
      bruksarealTotalt: input.bruksareal,
      alternativtAreal: 0,
      alternativtAreal2: 0,
      bruttoarealTilBolig: input.bruksareal,
      bruttoarealTilAnnet: 0,
      bruttoarealTotalt: input.bruksareal,
    },
    kommunenummer: input.kommuneNr,
    opprinnelsesKode: kode("T", "Tiltak"),
    representasjonspunkt: {
      koordinatsystemKode: kode("22", "EUREF89 UTM sone 32"),
      originalKoordinatsystemKode: kode("22", "EUREF89 UTM sone 32"),
      stedfestingVerifisert: true,
      nord: input.nord,
      ost: input.ost,
      hoyde: 120,
    },
    bruksenheter: [
      {
        bruksenhetsnummer,
        bruksenhetsTypeKode: kode(
          input.antallBoenheter > 0 ? "B" : "U",
          "Bruksenhet",
        ),
        etasjeplanKode: kode("H", "Hovedetasje"),
        bruksareal: input.bruksareal,
        antallRom: input.antallBoenheter > 0 ? 3 : 0,
        antallBad: input.antallBoenheter > 0 ? 1 : 0,
        antallWC: input.antallBoenheter > 0 ? 1 : 0,
        etasjenummer: "1",
        lopenummer: "1",
        kjokkentilgang: kode("1", "Kjokken"),
        matrikkelnrRapportInfo: {
          kommunenummer: input.kommuneNr,
          gnr: Number(input.gnr),
          bnr: Number(input.bnr),
          fnr: 0,
          snr: 0,
          matrikkelNummer,
          annenKommune: false,
        },
        adresseIdentRapportInfo: {
          matrikkelnrRapportInfo: {
            kommunenummer: input.kommuneNr,
            gnr: Number(input.gnr),
            bnr: Number(input.bnr),
          },
          adresseNavn: input.adresseNavn,
          nummer: input.adresseNr,
          erVegadresse: true,
          adressekodeGardsnr: 1000,
          nrBruksnr: 1,
          bokstavFestenr: "",
          undernr: "0",
          adresseAsString: `${input.adresseNavn} ${input.adresseNr}`,
          adresseAsStringUtenAdressekode: `${input.adresseNavn} ${input.adresseNr}`,
        },
        kostraFunksjonKode: {
          kode: "100",
          kodeverdi: "100",
          beskrivelse: "Kostra funksjon",
          nyEndretSlettet: "N",
        },
        kostraLeieareal: "0",
        kostraVirksomhetNummer: "999999999",
        kostraVirksomhetNavn: "Mock virksomhet",
        nyEndretSlettet: "N",
      },
    ],
    sefrakminner: [
      {
        objektnr: `SEFRAK-${input.bygningsnummer}`,
        objektnavn: "Sefrak registrering",
        kommunenr: input.kommuneNr,
        registreringskretsnr: 1,
        huslopenr: 1,
      },
    ],
    etasjer: [
      {
        etasjeplanKode: "H",
        etasjenummer: 1,
        bruttoarealTotalt: input.bruksareal,
        etasjedata: {
          antallBoenheter: input.antallBoenheter,
          bruksarealTilBolig: input.bruksareal,
          bruksarealTilAnnet: 0,
          bruksarealTotalt: input.bruksareal,
          alternativtAreal: 0,
          alternativtAreal2: 0,
          bruttoarealTilBolig: input.bruksareal,
          bruttoarealTilAnnet: 0,
          bruttoarealTotalt: input.bruksareal,
        },
        nyEndretSlettet: "N",
      },
    ],
    // Kontaktpersoner: både Tiltakshaver (T) og Kontaktperson (K)
    kontaktpersoner: [
      // Tiltakshaver
      {
        eierident: "01010012345",
        navn: "Kari Nordmann",
        kategoriKode: "P",
        fortrolig: false,
        personStatusKode: kode("B", "Bosatt"),
        personStatus: "Bosatt",
        bruksenhetsnummer,
        postadresse: {
          adresselinje1: `${input.adresseNavn} ${input.adresseNr}`,
          adresselinje2: "1305 Sandvika",
          adresselinje3: "Norge",
          fullAdresse: `${input.adresseNavn} ${input.adresseNr}, 1305 Sandvika, Norge`,
          adresse: `${input.adresseNavn} ${input.adresseNr}, 1305 Sandvika`,
          adresseUtenPostnummeromrade: `${input.adresseNavn} ${input.adresseNr}`,
          harFullstendigPostadresse: true,
          harInnhold: true,
          bareLandkodeId: false,
        },
        postnummerOmradenummer: 1305,
        postnummerOmradenavn: "Sandvika",
        land: "Norge",
        adresselinje1: `${input.adresseNavn} ${input.adresseNr}`,
        adresselinje2: "1305 Sandvika",
        adresselinje3: "Norge",
        adresselinjer: [
          `${input.adresseNavn} ${input.adresseNr}`,
          "1305 Sandvika",
          "Norge",
        ],
        datofra: isoDate("2022-01-01"),
        nyEndretSlettet: "N",
        kontaktpersonKode: kode("T", "Tiltakshaver"),
        datofraSOSI: "20220101",
      },
      // Kontaktperson
      {
        eierident: "01010087654",
        navn: "Jan Jacobsen AS",
        kategoriKode: "O",
        fortrolig: false,
        personStatusKode: kode("B", "Bosatt"),
        personStatus: "Bosatt",
        bruksenhetsnummer,
        postadresse: {
          adresselinje1: "Arkitektveien 5",
          adresselinje2: "0667 Oslo",
          adresselinje3: "Norge",
          fullAdresse: "Arkitektveien 5, 0667 Oslo, Norge",
          adresse: "Arkitektveien 5, 0667 Oslo",
          adresseUtenPostnummeromrade: "Arkitektveien 5",
          harFullstendigPostadresse: true,
          harInnhold: true,
          bareLandkodeId: false,
        },
        postnummerOmradenummer: 667,
        postnummerOmradenavn: "Oslo",
        land: "Norge",
        adresselinje1: "Arkitektveien 5",
        adresselinje2: "0667 Oslo",
        adresselinje3: "Norge",
        adresselinjer: ["Arkitektveien 5", "0667 Oslo", "Norge"],
        datofra: isoDate("2023-06-15"),
        nyEndretSlettet: "N",
        kontaktpersonKode: kode("K", "Kontaktperson"),
        datofraSOSI: "20230615",
      },
    ],
    oppvarmingskoder: [
      {
        kode: "EL",
        kodeverdi: "EL",
        beskrivelse: "Elektrisk oppvarming",
        nyEndretSlettet: "N",
      },
    ],
    energikilder: [
      {
        kode: "STR",
        kodeverdi: "STR",
        beskrivelse: "Strom",
        nyEndretSlettet: "N",
      },
    ],
    historikker: [
      {
        dato: statusDato,
        regDato: statusDato,
        nyEndretSlettet: "N",
        bygningstatusKode: kode(input.bygningstatusKode, "Bygningsstatus"),
        datoSOSI: "20240101",
        regDatoSOSI: "20240101",
      },
    ],
    // Hjemmelshavere: flere personer med andeler
    hjemmelshavere: [
      {
        personEiereInfos: [
          {
            eierident: "01010012345",
            navn: "Kari Nordmann",
            kategoriKode: "P",
            personStatusKode: kode("B", "Bosatt"),
            bruksenhetsnummer,
            eierforholdKode: kode("H", "Hjemmelshaver"),
            andelsNummer: 1,
            datoFra: isoDate("2020-01-01"),
            datoTil: null,
            harAndel: true,
            teller: 1,
            nevner: 2,
            eierforholdKodeEnum: {
              kode: "H",
              kodeverdi: "H",
              beskrivelse: "Hjemmelshaver",
            },
          },
          {
            eierident: "02010067890",
            navn: "Per Andersen",
            kategoriKode: "P",
            personStatusKode: kode("B", "Bosatt"),
            bruksenhetsnummer,
            eierforholdKode: kode("H", "Hjemmelshaver"),
            andelsNummer: 2,
            datoFra: isoDate("2020-01-01"),
            datoTil: null,
            harAndel: true,
            teller: 1,
            nevner: 2,
            eierforholdKodeEnum: {
              kode: "H",
              kodeverdi: "H",
              beskrivelse: "Hjemmelshaver",
            },
          },
        ],
        matrikkelenhetEiereInfos: [
          {
            selveierskap: true,
            personEierforhold: [
              {
                eierident: "01010012345",
                navn: "Kari Nordmann",
                personStatusKode: kode("B", "Bosatt"),
                eierforholdKode: kode("H", "Hjemmelshaver"),
                andelsNummer: 1,
                datoFra: isoDate("2020-01-01"),
                harAndel: true,
                teller: 1,
                nevner: 2,
              },
              {
                eierident: "02010067890",
                navn: "Per Andersen",
                personStatusKode: kode("B", "Bosatt"),
                eierforholdKode: kode("H", "Hjemmelshaver"),
                andelsNummer: 2,
                datoFra: isoDate("2020-01-01"),
                harAndel: true,
                teller: 1,
                nevner: 2,
              },
            ],
            matrikkelnrRapportInfo: {
              kommunenummer: input.kommuneNr,
              gnr: Number(input.gnr),
              bnr: Number(input.bnr),
              fnr: 0,
              snr: 0,
              matrikkelNummer,
            },
            eierforholdKode: kode("H", "Hjemmelshaver"),
            datoFra: isoDate("2020-01-01"),
            arealtype: "Bebygd",
            matrikkelenhet: matrikkelNummer,
            harAndel: true,
            teller: 1,
            nevner: 1,
            eierforholdKodeEnum: {
              kode: "H",
              kodeverdi: "H",
              beskrivelse: "Hjemmelshaver",
            },
          },
        ],
      },
    ],
    bygningsendringer: [
      {
        bygningsnummer: numericBygningsnummer,
        lopenummer: 0,
        bygningsendringsKode: kode(
          input.endringsKode ?? "X",
          "Bygningsendring",
        ),
        harUfullstendigAreal: "Nei",
        bygningstypeKode: kode(input.bygningstypeKode, "Bygningstype"),
        naeringsgruppeKode: kode(input.naringsgruppeKode, "Naringsgruppe"),
        bygningstatusKode: kode(input.bygningstatusKode, "Bygningsstatus"),
        bebygdAreal: Math.max(1, Math.round(input.bruksareal * 0.7)),
        vannforsyningsKode: kode("1", "Offentlig"),
        avlopsKode: kode("1", "Offentlig"),
        etasjedata: {
          antallBoenheter: input.antallBoenheter,
          bruksarealTilBolig: input.bruksareal,
          bruksarealTilAnnet: 0,
          bruksarealTotalt: input.bruksareal,
          bruttoarealTilBolig: input.bruksareal,
          bruttoarealTilAnnet: 0,
          bruttoarealTotalt: input.bruksareal,
        },
        kommunenummer: input.kommuneNr,
        opprinnelsesKode: kode("T", "Tiltak"),
        bruksenheter: [
          {
            bruksenhetsnummer,
            bruksenhetsTypeKode: kode(
              input.antallBoenheter > 0 ? "B" : "U",
              "Bruksenhet",
            ),
            etasjeplanKode: kode("H", "Hovedetasje"),
            bruksareal: input.bruksareal,
            kjokkentilgang: kode("1", "Kjokken"),
          },
        ],
        historikker: [
          {
            dato: statusDato,
            regDato: statusDato,
            bygningstatusKode: kode(input.bygningstatusKode, "Bygningsstatus"),
          },
        ],
        objektnr: numericBygningsnummer,
        kontaktpersoner: [],
        bygningsstatuser: {
          [input.bygningstatusKode]: statusDato,
        },
        utgattDato: isoDate("9999-12-31"),
        utgattBeskrivelse: "Aktiv",
        harHeis: false,
        bygningErFerdigstilt:
          input.bygningstatusKode === "TB" || input.bygningstatusKode === "FA",
      },
    ],
    enkeltminner: [
      {
        enkeltminneNummer: `${input.bygningsnummer}-1`,
        enkeltminneArtKode: kode("10109", "Bolig"),
        vernetypeKode: kode("IKKE", "Ikke fredet"),
        kulturminnekategoriKode: kode("E-BYG", "Bygning"),
      },
    ],
    bygningsstatuser: {
      [input.bygningstatusKode]: statusDato,
    },
    utgattDato: isoDate("9999-12-31"),
    utgattBeskrivelse: "Aktiv",
    erFerdigstilt:
      input.bygningstatusKode === "TB" || input.bygningstatusKode === "FA",
    bygningErFerdigstilt:
      input.bygningstatusKode === "TB" || input.bygningstatusKode === "FA",
    erBygningsendring: false,
    objektnummer: numericBygningsnummer,
  }
}

export function createDeltEierskapReport(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "0301", kommuneNavn: "OSLO" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-09T07:34:00Z",
    },
    utvalgskriterier: {
      omfang: {
        inkluderBestaaendeBygg: true,
        inkluderUtgaatteBygg: true,
        inkluderBygninger: true,
        inkluderBygningsendringer: true,
        inkluderFrededeBygninger: true,
      },
      bygning: { bygningstyper: ["111"] },
      adresse: {
        adresseNavn: "Ferner Jacobsens gate",
        adresseNr: 22,
        utenBokstav: null,
      },
      matrikkelenhet: { gnr: "102", bnr: "15" },
      bygningsstatus: { naavaerende: ["TB"], tidligere: [] },
      sokevindu: { nord: 6645000, ost: 250000, syd: 6644900, vest: 249900 },
      subrapporter: {
        inkluderEtasjer: true,
        inkluderBruksenheter: true,
        inkluderTiltakshavere: true,
        inkluderKontaktpersoner: true,
        inkluderHjemmelshavere: true,
        inkluderKulturminner: true,
      },
    },
    bygninger: [
      createBygning({
        kommuneNr: "0301",
        gnr: "102",
        bnr: "15",
        adresseNavn: "Ferner Jacobsens gate",
        adresseNr: 22,
        bygningsnummer: "19264567",
        bygningstypeKode: "111",
        bygningstatusKode: "TB",
        naringsgruppeKode: "S",
        bruksareal: 150,
        antallBoenheter: 2,
        nord: 6644950,
        ost: 249950,
      }),
    ],
  }
}
