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
  bruksareal: number
  antallBoenheter: number
  nord: number
  ost: number
  lopenummer?: number
}): Bygning {
  const numericBygningsnummer = Number(input.bygningsnummer)
  const matrikkelNummer = `${input.kommuneNr}-${input.gnr}/${input.bnr}/0/0`
  const statusDato = isoDate("2023-01-01")
  const bruksenhetsnummer = input.antallBoenheter > 0 ? "H0101" : undefined

  return {
    bygningsnummer: input.bygningsnummer,
    lopenummer: input.lopenummer ?? 0,
    bygningsendringsKode: kode("X", "Bygningsendring"),
    harUfullstendigAreal: "Nei",
    bygningstypeKode: kode(input.bygningstypeKode, "Bygningstype"),
    naringsgruppeKode: kode(input.naringsgruppeKode, "Naringsgruppe"),
    bygningstatusKode: kode(input.bygningstatusKode, "Bygningsstatus"),
    bebygdAreal: Math.max(1, Math.round(input.bruksareal * 0.65)),
    harHeis: false,
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
    representasjonspunkt: {
      koordinatsystemKode: kode("22", "EUREF89 UTM sone 32"),
      originalKoordinatsystemKode: kode("22", "EUREF89 UTM sone 32"),
      stedfestingVerifisert: true,
      nord: input.nord,
      ost: input.ost,
      hoyde: 100,
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
        },
        adresseIdentRapportInfo: {
          adresseNavn: input.adresseNavn,
          nummer: input.adresseNr,
          erVegadresse: true,
          adresseAsString: `${input.adresseNavn} ${input.adresseNr}`,
          adresseAsStringUtenAdressekode: `${input.adresseNavn} ${input.adresseNr}`,
        },
      },
    ],
    sefrakminner: [
      {
        objektnr: `SEFRAK-${input.bygningsnummer}`,
        objektnavn: "Sefrak registrering",
        kommunenr: input.kommuneNr,
      },
    ],
    etasjer: [
      {
        etasjeplanKode: kode("H", "Hovedetasje"),
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
        eierident: "958935420",
        navn: "Oslo kommune kontakt",
        kategoriKode: "V",
        fortrolig: false,
        personStatusKode: kode("B", "Bosatt"),
        personStatus: "Bosatt",
        bruksenhetsnummer,
        datofra: isoDate("2018-01-01"),
        nyEndretSlettet: "N",
        kontaktpersonKode: kode("T", "Tiltakshaver"),
        datofraSOSI: "20180101",
      },
    ],
    oppvarmingskoder: [
      {
        kode: "EL",
        kodeverdi: "EL",
        beskrivelse: "Elektrisk",
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
        datoSOSI: "20230101",
        regDatoSOSI: "20230101",
      },
    ],
    hjemmelshavere: [
      {
        personEiereInfos: [
          {
            eierident: "958935420",
            navn: "OSLO KOMMUNE",
            kategoriKode: "V",
            personStatusKode: kode("B", "Bosatt"),
            eierforholdKode: kode("H", "Hjemmelshaver"),
            andelsNummer: 1,
            datoFra: isoDate("2010-01-01"),
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
        bygningsendringsKode: kode("X", "Bygningsendring"),
        harUfullstendigAreal: "Nei",
        bygningstypeKode: kode(input.bygningstypeKode, "Bygningstype"),
        naeringsgruppeKode: kode(input.naringsgruppeKode, "Naringsgruppe"),
        bygningstatusKode: kode(input.bygningstatusKode, "Bygningsstatus"),
        bebygdAreal: Math.max(1, Math.round(input.bruksareal * 0.65)),
        vannforsyningsKode: kode("1", "Offentlig"),
        avlopsKode: kode("1", "Offentlig"),
        etasjedata: {
          antallBoenheter: input.antallBoenheter,
          bruksarealTilBolig: input.antallBoenheter > 0 ? input.bruksareal : 0,
          bruksarealTilAnnet: input.antallBoenheter > 0 ? 0 : input.bruksareal,
          bruksarealTotalt: input.bruksareal,
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
            navn: "Oslo kommune kontakt",
            personStatusKode: kode("B", "Bosatt"),
            kontaktpersonKode: kode("T", "Tiltakshaver"),
          },
        ],
        bygningsstatuser: { [input.bygningstatusKode]: statusDato },
        utgattDato: isoDate("9999-12-31"),
        utgattBeskrivelse: "Aktiv",
        harHeis: false,
        bygningErFerdigstilt: true,
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
    bygningsstatuser: { [input.bygningstatusKode]: statusDato },
    utgattDato: isoDate("9999-12-31"),
    utgattBeskrivelse: "Aktiv",
    erFerdigstilt: true,
    bygningErFerdigstilt: true,
    erBygningsendring: false,
    objektnummer: numericBygningsnummer,
  }
}

export function createByggStasjonsveien1Report(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "0301", kommuneNavn: "OSLO" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-24T10:53:00Z",
    },
    utvalgskriterier: {
      omfang: {
        inkluderBestaaendeBygg: true,
        inkluderUtgaatteBygg: true,
        inkluderBygninger: true,
        inkluderBygningsendringer: true,
        inkluderFrededeBygninger: true,
      },
      bygning: { bygningstyper: ["613", "619", "181"] },
      adresse: {
        adresseNavn: "Stasjonsveien",
        adresseNr: 1,
        utenBokstav: null,
      },
      matrikkelenhet: { gnr: "35", bnr: "12" },
      bygningsstatus: { naavaerende: ["TB"], tidligere: [] },
      sokevindu: { nord: 6647233, ost: 594560, syd: 6647175, vest: 594460 },
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
        gnr: "35",
        bnr: "12",
        adresseNavn: "Stasjonsveien",
        adresseNr: 1,
        bygningsnummer: "80100590",
        bygningstypeKode: "613",
        bygningstatusKode: "TB",
        naringsgruppeKode: "P",
        bruksareal: 6757,
        antallBoenheter: 0,
        nord: 6647216,
        ost: 594528,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: "35",
        bnr: "12",
        adresseNavn: "Stasjonsveien",
        adresseNr: 1,
        bygningsnummer: "80100590",
        bygningstypeKode: "613",
        bygningstatusKode: "TB",
        naringsgruppeKode: "P",
        bruksareal: 300,
        antallBoenheter: 1,
        nord: 6647216,
        ost: 594528,
        lopenummer: 1,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: "35",
        bnr: "15",
        adresseNavn: "Stasjonsveien",
        adresseNr: 2,
        bygningsnummer: "80100604",
        bygningstypeKode: "619",
        bygningstatusKode: "TB",
        naringsgruppeKode: "P",
        bruksareal: 588,
        antallBoenheter: 0,
        nord: 6647233,
        ost: 594560,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: "35",
        bnr: "13",
        adresseNavn: "Stasjonsveien",
        adresseNr: 3,
        bygningsnummer: "80951361",
        bygningstypeKode: "181",
        bygningstatusKode: "TB",
        naringsgruppeKode: "Y",
        bruksareal: 46,
        antallBoenheter: 0,
        nord: 6647175,
        ost: 594460,
      }),
      createBygning({
        kommuneNr: "0301",
        gnr: "35",
        bnr: "14",
        adresseNavn: "Stasjonsveien",
        adresseNr: 5,
        bygningsnummer: "80951388",
        bygningstypeKode: "181",
        bygningstatusKode: "TB",
        naringsgruppeKode: "Y",
        bruksareal: 46,
        antallBoenheter: 0,
        nord: 6647178,
        ost: 594473,
      }),
    ],
  }
}
