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
    bygningstypeKode: kode(input.bygningstypeKode, "Bygningstype"),
    naringsgruppeKode: kode(input.naringsgruppeKode, "Naringsgruppe"),
    bygningstatusKode: kode(input.bygningstatusKode, "Bygningsstatus"),
    harUfullstendigAreal: "Nei",
    bebygdAreal: Math.max(1, Math.round(input.bruksareal * 0.6)),
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
      hoyde: 110,
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
        registreringskretsnr: 4324,
        huslopenr: 124,
      },
      {
        objektnr: `SEFRAK-${input.bygningsnummer}`,
        objektnavn: "Sefrak registrering",
        kommunenr: input.kommuneNr,
        registreringskretsnr: 2354,
        huslopenr: 145,
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
        eierident: "02028012345",
        navn: "Lars Hansen",
        kategoriKode: "P",
        fortrolig: false,
        personStatusKode: kode("B", "Bosatt"),
        personStatus: "Bosatt",
        bruksenhetsnummer,
        postadresse: {
          adresselinje1: `${input.adresseNavn} ${input.adresseNr}`,
          adresselinje2: "0672 Oslo",
          adresselinje3: "Norge",
          fullAdresse: `${input.adresseNavn} ${input.adresseNr}, 0672 Oslo, Norge`,
          adresse: `${input.adresseNavn} ${input.adresseNr}, 0672 Oslo`,
          adresseUtenPostnummeromrade: `${input.adresseNavn} ${input.adresseNr}`,
          harFullstendigPostadresse: true,
          harInnhold: true,
          bareLandkodeId: false,
        },
        postnummerOmradenummer: 672,
        postnummerOmradenavn: "Oslo",
        land: "Norge",
        adresselinje1: `${input.adresseNavn} ${input.adresseNr}`,
        adresselinje2: "0672 Oslo",
        adresselinje3: "Norge",
        adresselinjer: [
          `${input.adresseNavn} ${input.adresseNr}`,
          "0672 Oslo",
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
            eierident: "02028012345",
            navn: "Lars Hansen",
            kategoriKode: "P",
            personStatusKode: kode("B", "Bosatt"),
            bruksenhetsnummer,
            eierforholdKode: kode("H", "Hjemmelshaver"),
            andelsNummer: 1,
            datoFra: isoDate("2019-01-01"),
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
                eierident: "02028012345",
                navn: "Lars Hansen",
                personStatusKode: kode("B", "Bosatt"),
                eierforholdKode: kode("H", "Hjemmelshaver"),
                andelsNummer: 1,
                datoFra: isoDate("2019-01-01"),
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
            datoFra: isoDate("2019-01-01"),
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
            navn: "Lars Hansen",
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

export function createBygg32341Report(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "0301", kommuneNavn: "OSLO" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-09T09:09:00Z",
    },
    utvalgskriterier: {
      omfang: {
        inkluderBestaaendeBygg: true,
        inkluderUtgaatteBygg: true,
        inkluderBygninger: true,
        inkluderBygningsendringer: true,
        inkluderFrededeBygninger: true,
      },
      bygning: { bygningstyper: ["121"] },
      adresse: {
        adresseNavn: "Hagan terrasse",
        adresseNr: 15,
        utenBokstav: null,
      },
      matrikkelenhet: { gnr: "32", bnr: "341" },
      bygningsstatus: { naavaerende: ["TB", "FA"], tidligere: [] },
      sokevindu: { nord: 6645987, ost: 593530, syd: 6645984, vest: 593522 },
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
        gnr: "32",
        bnr: "341",
        adresseNavn: "Hagan terrasse",
        adresseNr: 15,
        bygningsnummer: 80087713,
        bygningstypeKode: "121",
        bygningstatusKode: "TB",
        naringsgruppeKode: "X",
        bruksareal: 169,
        antallBoenheter: 1,
        nord: 6645987,
        ost: 593530,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: "32",
        bnr: "341",
        adresseNavn: "Hagan terrasse",
        adresseNr: 15,
        bygningsnummer: 80087713,
        bygningstypeKode: "121",
        bygningstatusKode: "TB",
        naringsgruppeKode: "X",
        bruksareal: 40,
        antallBoenheter: 1,
        endringsKode: "T",
        nord: 6645987,
        ost: 593530,
        lopenummer: 1,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: "32",
        bnr: "342",
        adresseNavn: "Hagan terrasse",
        adresseNr: 16,
        bygningsnummer: 80087754,
        bygningstypeKode: "121",
        bygningstatusKode: "FA",
        naringsgruppeKode: "X",
        bruksareal: 197,
        antallBoenheter: 1,
        endringsKode: "T",
        nord: 6645984,
        ost: 593522,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: "32",
        bnr: "342",
        adresseNavn: "Hagan terrasse",
        adresseNr: 16,
        bygningsnummer: 80087754,
        bygningstypeKode: "121",
        bygningstatusKode: "FA",
        naringsgruppeKode: "X",
        bruksareal: 25,
        antallBoenheter: 1,
        endringsKode: "T",
        nord: 6645984,
        ost: 593522,
        lopenummer: 1,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: "32",
        bnr: "342",
        adresseNavn: "Hagan terrasse",
        adresseNr: 16,
        bygningsnummer: 80087754,
        bygningstypeKode: "121",
        bygningstatusKode: "FA",
        naringsgruppeKode: "X",
        bruksareal: 12,
        antallBoenheter: 0,
        endringsKode: "T",
        nord: 6645984,
        ost: 593522,
        lopenummer: 2,
      }),
    ],
  }
}
