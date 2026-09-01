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
  bygningsnummer: number
  bygningstypeKode: BygningstypeKode
  bygningstatusKode: BygningstatusKode
  naringsgruppeKode: NaringsgruppeKode
  endringsKode?: EndringsKode
  bruksareal: number
  antallBoenheter: number
  nord: number
  ost: number
  lopenummer?: number
}): Bygning {
  const numericBygningsnummer = input.bygningsnummer
  const matrikkelNummer = `${input.kommuneNr}-${input.gnr}/${input.bnr}/0/0`
  const statusDato = isoDate("2024-01-01")
  const bruksenhetsnummer = input.antallBoenheter > 0 ? "H0101" : undefined

  return {
    bygningsnummer: input.bygningsnummer,
    lopenummer: input.lopenummer ?? 0,
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
        etasjeplanKode: kode("H", "Hovedetasje"),
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
    kontaktpersoner: [
      {
        eierident: "01017012345",
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
    hjemmelshavere: [
      {
        personEiereInfos: [
          {
            eierident: "01017012345",
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
            nevner: 1,
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
                eierident: "01017012345",
                navn: "Kari Nordmann",
                personStatusKode: kode("B", "Bosatt"),
                eierforholdKode: kode("H", "Hjemmelshaver"),
                andelsNummer: 1,
                datoFra: isoDate("2020-01-01"),
                harAndel: true,
                teller: 1,
                nevner: 1,
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
        kontaktpersoner: [
          {
            navn: "Kari Nordmann",
            personStatusKode: kode("B", "Bosatt"),
            kontaktpersonKode: kode("T", "Tiltakshaver"),
          },
        ],
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

export function createBygg1098Report(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "3201", kommuneNavn: "BAERUM" },
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
      bygning: { bygningstyper: ["181", "111"] },
      adresse: { adresseNavn: "Vensasveien", adresseNr: 6, utenBokstav: null },
      matrikkelenhet: { gnr: "109", bnr: "8" },
      bygningsstatus: { naavaerende: ["TB", "IG"], tidligere: [] },
      sokevindu: { nord: 6649724, ost: 582088, syd: 6649713, vest: 582064 },
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
        kommuneNr: "3201",
        gnr: "109",
        bnr: "8",
        adresseNavn: "Vensasveien",
        adresseNr: 6,
        bygningsnummer: 17361511,
        bygningstypeKode: "181",
        bygningstatusKode: "TB",
        naringsgruppeKode: "Y",
        bruksareal: 46,
        antallBoenheter: 0,
        nord: 6649724,
        ost: 582079,
      }),
      createBygning({
        kommuneNr: "3201",
        gnr: "109",
        bnr: "8",
        adresseNavn: "Vensasveien",
        adresseNr: 6,
        bygningsnummer: 17361511,
        bygningstypeKode: "181",
        bygningstatusKode: "TB",
        naringsgruppeKode: "Y",
        bruksareal: 10,
        antallBoenheter: 0,
        endringsKode: "T",
        nord: 6649724,
        ost: 582079,
        lopenummer: 1,
      }),
      createBygning({
        kommuneNr: "3201",
        gnr: "109",
        bnr: "9",
        adresseNavn: "Vensasveien",
        adresseNr: 8,
        bygningsnummer: 17361538,
        bygningstypeKode: "181",
        bygningstatusKode: "TB",
        naringsgruppeKode: "Y",
        bruksareal: 44,
        antallBoenheter: 0,
        nord: 6649722,
        ost: 582064,
      }),
      createBygning({
        kommuneNr: "3201",
        gnr: "109",
        bnr: "10",
        adresseNavn: "Vensasveien",
        adresseNr: 10,
        bygningsnummer: 17362623,
        bygningstypeKode: "111",
        bygningstatusKode: "IG",
        naringsgruppeKode: "X",
        bruksareal: 102,
        antallBoenheter: 1,
        endringsKode: "P",
        nord: 6649713,
        ost: 582088,
      }),
      createBygning({
        kommuneNr: "3201",
        gnr: "109",
        bnr: "10",
        adresseNavn: "Vensasveien",
        adresseNr: 10,
        bygningsnummer: 17362623,
        bygningstypeKode: "111",
        bygningstatusKode: "IG",
        naringsgruppeKode: "X",
        bruksareal: 20,
        antallBoenheter: 1,
        endringsKode: "P",
        nord: 6649713,
        ost: 582088,
        lopenummer: 1,
      }),
    ],
  }
}
