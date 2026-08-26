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
  gnr: number
  bnr: number
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
    bebygdAreal: Math.max(1, Math.round(input.bruksareal * 0.5)),
    harHeis: true,
    vannforsyningsKode: kode("1", "Offentlig"),
    avlopsKode: kode("1", "Offentlig"),
    etasjedata: {
      antallBoenheter: input.antallBoenheter,
      bruksarealTilBolig: input.antallBoenheter > 0 ? input.bruksareal : 0,
      bruksarealTilAnnet: input.antallBoenheter > 0 ? 0 : input.bruksareal,
      bruksarealTotalt: input.bruksareal,
      alternativtAreal: 0,
      alternativtAreal2: 0,
      bruttoarealTilBolig: input.antallBoenheter > 0 ? input.bruksareal : 0,
      bruttoarealTilAnnet: input.antallBoenheter > 0 ? 0 : input.bruksareal,
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
      hoyde: 95,
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
        kjokkentilgang: kode("9", "Ikke oppgitt"),
        matrikkelnrRapportInfo: {
          kommunenummer: input.kommuneNr,
          gnr: input.gnr,
          bnr: input.bnr,
          fnr: 0,
          snr: 0,
          matrikkelNummer,
          annenKommune: false,
        },
        adresseIdentRapportInfo: {
          adresseNavn: input.adresseNavn,
          nummer: input.adresseNr,
          erVegadresse: true,
          adresseAsString: `${input.adresseNavn} ${input.adresseNr}`,
          adresseAsStringUtenAdressekode: `${input.adresseNavn} ${input.adresseNr}`,
        },
        kostraFunksjonKode: {
          kode: "200",
          kodeverdi: "200",
          beskrivelse: "Helseinstitusjon",
          nyEndretSlettet: "N",
        },
        kostraLeieareal: "0",
        kostraVirksomhetNummer: "993467049",
        kostraVirksomhetNavn: "OSLO UNIVERSITETSSYKEHUS HF",
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
          bruksarealTilBolig: input.antallBoenheter > 0 ? input.bruksareal : 0,
          bruksarealTilAnnet: input.antallBoenheter > 0 ? 0 : input.bruksareal,
          bruksarealTotalt: input.bruksareal,
          bruttoarealTilBolig: input.antallBoenheter > 0 ? input.bruksareal : 0,
          bruttoarealTilAnnet: input.antallBoenheter > 0 ? 0 : input.bruksareal,
          bruttoarealTotalt: input.bruksareal,
        },
        nyEndretSlettet: "N",
      },
    ],
    kontaktpersoner: [
      {
        eierident: "993467049",
        navn: "OUS Drift",
        kategoriKode: "V",
        fortrolig: false,
        personStatusKode: kode("B", "Bosatt"),
        personStatus: "Bosatt",
        bruksenhetsnummer,
        postadresse: {
          adresselinje1: "Postboks 4956 Nydalen",
          adresselinje2: "0424 Oslo",
          adresselinje3: "Norge",
          fullAdresse: "Postboks 4956 Nydalen, 0424 Oslo, Norge",
          adresse: "Postboks 4956 Nydalen, 0424 Oslo",
          adresseUtenPostnummeromrade: "Postboks 4956 Nydalen",
          harFullstendigPostadresse: true,
          harInnhold: true,
          bareLandkodeId: false,
        },
        postnummerOmradenummer: 424,
        postnummerOmradenavn: "Oslo",
        land: "Norge",
        adresselinje1: "Postboks 4956 Nydalen",
        adresselinje2: "0424 Oslo",
        adresselinje3: "Norge",
        adresselinjer: ["Postboks 4956 Nydalen", "0424 Oslo", "Norge"],
        datofra: isoDate("2020-01-01"),
        nyEndretSlettet: "N",
        kontaktpersonKode: kode("T", "Tiltakshaver"),
        datofraSOSI: "20200101",
      },
    ],
    oppvarmingskoder: [
      {
        kode: "FJERN",
        kodeverdi: "FJERN",
        beskrivelse: "Fjernvarme",
        nyEndretSlettet: "N",
      },
    ],
    energikilder: [
      {
        kode: "EL",
        kodeverdi: "EL",
        beskrivelse: "Elektrisitet",
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
            eierident: "993467049",
            navn: "OSLO UNIVERSITETSSYKEHUS HF",
            kategoriKode: "V",
            personStatusKode: kode("B", "Bosatt"),
            eierforholdKode: kode("H", "Hjemmelshaver"),
            andelsNummer: 1,
            datoFra: isoDate("2018-01-01"),
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
                eierident: "993467049",
                navn: "OSLO UNIVERSITETSSYKEHUS HF",
                personStatusKode: kode("B", "Bosatt"),
                eierforholdKode: kode("H", "Hjemmelshaver"),
                andelsNummer: 1,
                datoFra: isoDate("2018-01-01"),
                harAndel: true,
                teller: 1,
                nevner: 1,
              },
            ],
            matrikkelnrRapportInfo: {
              kommunenummer: input.kommuneNr,
              gnr: input.gnr,
              bnr: input.bnr,
              fnr: 0,
              snr: 0,
              matrikkelNummer,
            },
            eierforholdKode: kode("H", "Hjemmelshaver"),
            datoFra: isoDate("2018-01-01"),
            arealtype: "Bebygd",
            matrikkelenhet: matrikkelNummer,
            harAndel: true,
            teller: 1,
            nevner: 1,
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
        bebygdAreal: Math.max(1, Math.round(input.bruksareal * 0.5)),
        vannforsyningsKode: kode("1", "Offentlig"),
        avlopsKode: kode("1", "Offentlig"),
        etasjedata: {
          antallBoenheter: input.antallBoenheter,
          bruksarealTilBolig: input.antallBoenheter > 0 ? input.bruksareal : 0,
          bruksarealTilAnnet: input.antallBoenheter > 0 ? 0 : input.bruksareal,
          bruksarealTotalt: input.bruksareal,
          bruttoarealTilBolig: input.antallBoenheter > 0 ? input.bruksareal : 0,
          bruttoarealTilAnnet: input.antallBoenheter > 0 ? 0 : input.bruksareal,
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
            kjokkentilgang: kode("9", "Ikke oppgitt"),
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
            navn: "OUS Drift",
            personStatusKode: kode("B", "Bosatt"),
            kontaktpersonKode: kode("T", "Tiltakshaver"),
          },
        ],
        bygningsstatuser: {
          [input.bygningstatusKode]: statusDato,
        },
        utgattDato: isoDate("9999-12-31"),
        utgattBeskrivelse: "Aktiv",
        harHeis: true,
        bygningErFerdigstilt:
          input.bygningstatusKode === "TB" || input.bygningstatusKode === "FA",
      },
    ],
    enkeltminner: [
      {
        enkeltminneNummer: `${input.bygningsnummer}-1`,
        enkeltminneArtKode: kode("10152", "Skole"),
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

export function createBygg42221Report(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "0301", kommuneNavn: "OSLO" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-13T10:02:00Z",
    },
    utvalgskriterier: {
      omfang: {
        inkluderBestaaendeBygg: true,
        inkluderUtgaatteBygg: true,
        inkluderBygninger: true,
        inkluderBygningsendringer: true,
        inkluderFrededeBygninger: true,
      },
      bygning: { bygningstyper: ["719", "629", "181"] },
      adresse: {
        adresseNavn: "Sognsvannsveien",
        adresseNr: 20,
        utenBokstav: null,
      },
      matrikkelenhet: { gnr: 42, bnr: 221 },
      bygningsstatus: { naavaerende: ["TB", "FA", "IG", "RA"], tidligere: [] },
      sokevindu: { nord: 6647010, ost: 595909, syd: 6646774, vest: 595695 },
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
        gnr: 42,
        bnr: 221,
        adresseNavn: "Sognsvannsveien",
        adresseNr: 20,
        bygningsnummer: "81174261",
        bygningstypeKode: "719",
        bygningstatusKode: "TB",
        naringsgruppeKode: "Q",
        bruksareal: 16990,
        antallBoenheter: 0,
        nord: 6647003,
        ost: 595695,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: 42,
        bnr: 221,
        adresseNavn: "Sognsvannsveien",
        adresseNr: 20,
        bygningsnummer: "81197334",
        bygningstypeKode: "719",
        bygningstatusKode: "FA",
        naringsgruppeKode: "Q",
        bruksareal: 67697,
        endringsKode: "T",
        antallBoenheter: 0,
        nord: 6647010,
        ost: 595759,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: 42,
        bnr: 221,
        adresseNavn: "Sognsvannsveien",
        adresseNr: 20,
        bygningsnummer: "81771197",
        bygningstypeKode: "629",
        bygningstatusKode: "IG",
        naringsgruppeKode: "P",
        bruksareal: 18816,
        endringsKode: "O",
        antallBoenheter: 0,
        nord: 6646788,
        ost: 595845,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: 42,
        bnr: 221,
        adresseNavn: "Sognsvannsveien",
        adresseNr: 20,
        bygningsnummer: "81771200",
        bygningstypeKode: "629",
        bygningstatusKode: "TB",
        naringsgruppeKode: "P",
        bruksareal: 7035,
        antallBoenheter: 0,
        nord: 6646774,
        ost: 595909,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: 42,
        bnr: 221,
        adresseNavn: "Sognsvannsveien",
        adresseNr: 20,
        bygningsnummer: "81848238",
        bygningstypeKode: "181",
        bygningstatusKode: "TB",
        naringsgruppeKode: "Y",
        bruksareal: 316,
        antallBoenheter: 0,
        nord: 6646919,
        ost: 595770,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: 42,
        bnr: 221,
        adresseNavn: "Sognsvannsveien",
        adresseNr: 20,
        bygningsnummer: "301432893",
        bygningstypeKode: "719",
        bygningstatusKode: "RA",
        naringsgruppeKode: "O",
        bruksareal: 95059,
        endringsKode: "P",
        antallBoenheter: 0,
        nord: 6646870,
        ost: 595740,
      }),
    ],
  }
}
