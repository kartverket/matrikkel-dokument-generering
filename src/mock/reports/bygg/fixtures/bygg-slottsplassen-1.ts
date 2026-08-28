import type { LegacyFixtureByggRapport } from "../../../types"

type Bygning = LegacyFixtureByggRapport["bygninger"][number]

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

function createBygning(): Bygning {
  const matrikkelNummer = "0301-209/25/0/0"
  const statusDato = isoDate("2023-01-01")

  return {
    bygningsnummer: "81416001",
    lopenummer: 0,
    bygningsendringsKode: kode("X", "Bygningsendring"),
    harUfullstendigAreal: "Nei",
    bygningstypeKode: kode("311", "Bygningstype"),
    naringsgruppeKode: kode("O", "Naringsgruppe"),
    bygningstatusKode: kode("TB", "Bygningsstatus"),
    bebygdAreal: 6400,
    harHeis: true,
    vannforsyningsKode: kode("1", "Offentlig"),
    avlopsKode: kode("1", "Offentlig"),
    etasjedata: {
      antallBoenheter: 0,
      bruksarealTilBolig: 0,
      bruksarealTilAnnet: 15862,
      bruksarealTotalt: 15862,
      bruttoarealTilBolig: 0,
      bruttoarealTilAnnet: 15862,
      bruttoarealTotalt: 15862,
    },
    kommunenummer: "0301",
    opprinnelsesKode: kode("T", "Tiltak"),
    representasjonspunkt: {
      koordinatsystemKode: kode("22", "EUREF89 UTM sone 32"),
      originalKoordinatsystemKode: kode("22", "EUREF89 UTM sone 32"),
      stedfestingVerifisert: true,
      nord: 6643438,
      ost: 596593,
      hoyde: 35,
    },
    bruksenheter: [
      {
        bruksenhetsTypeKode: kode("U", "Uspesifisert"),
        etasjeplanKode: kode("H", "Hovedetasje"),
        bruksareal: 15862,
        kjokkentilgang: kode("9", "Ikke oppgitt"),
        matrikkelnrRapportInfo: {
          kommunenummer: "0301",
          gnr: 209,
          bnr: 25,
          fnr: 0,
          snr: 0,
          matrikkelNummer,
        },
        adresseIdentRapportInfo: {
          adresseNavn: "Slottsplassen",
          nummer: 1,
          erVegadresse: true,
          adresseAsString: "Slottsplassen 1",
          adresseAsStringUtenAdressekode: "Slottsplassen 1",
        },
      },
    ],
    sefrakminner: [
      {
        objektnr: "SEFRAK-81416001",
        objektnavn: "Historisk bygg",
        kommunenr: "0301",
        registreringskretsnr: 1,
        huslopenr: 1,
      },
    ],
    etasjer: [
      {
        etasjeplanKode: "H",
        etasjenummer: 1,
        bruttoarealTotalt: 15862,
        etasjedata: {
          antallBoenheter: 0,
          bruksarealTilBolig: 0,
          bruksarealTilAnnet: 15862,
          bruksarealTotalt: 15862,
          bruttoarealTilBolig: 0,
          bruttoarealTilAnnet: 15862,
          bruttoarealTotalt: 15862,
        },
        nyEndretSlettet: "N",
      },
    ],
    kontaktpersoner: [
      {
        eierident: "997123456",
        navn: "Statsbygg Kontakt",
        kategoriKode: "V",
        fortrolig: false,
        personStatusKode: kode("B", "Bosatt"),
        personStatus: "Bosatt",
        postadresse: {
          adresselinje1: "Postboks 232 Sentrum",
          adresselinje2: "0103 Oslo",
          adresselinje3: "Norge",
          fullAdresse: "Postboks 232 Sentrum, 0103 Oslo, Norge",
          adresse: "Postboks 232 Sentrum, 0103 Oslo",
          adresseUtenPostnummeromrade: "Postboks 232 Sentrum",
          harFullstendigPostadresse: true,
          harInnhold: true,
          bareLandkodeId: false,
        },
        datofra: isoDate("2017-01-01"),
        nyEndretSlettet: "N",
        kontaktpersonKode: kode("T", "Tiltakshaver"),
        datofraSOSI: "20170101",
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
        bygningstatusKode: kode("TB", "Bygningsstatus"),
        datoSOSI: "20230101",
        regDatoSOSI: "20230101",
      },
    ],
    hjemmelshavere: [
      {
        personEiereInfos: [
          {
            eierident: "997123456",
            navn: "STATSBYGG",
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
        bygningsnummer: 81416001,
        lopenummer: 0,
        bygningsendringsKode: kode("X", "Bygningsendring"),
        harUfullstendigAreal: "Nei",
        bygningstypeKode: kode("311", "Bygningstype"),
        naeringsgruppeKode: kode("O", "Naringsgruppe"),
        bygningstatusKode: kode("TB", "Bygningsstatus"),
        bebygdAreal: 6400,
        vannforsyningsKode: kode("1", "Offentlig"),
        avlopsKode: kode("1", "Offentlig"),
        etasjedata: {
          antallBoenheter: 0,
          bruksarealTilBolig: 0,
          bruksarealTilAnnet: 15862,
          bruksarealTotalt: 15862,
        },
        kommunenummer: "0301",
        opprinnelsesKode: kode("T", "Tiltak"),
        bruksenheter: [
          {
            bruksenhetsTypeKode: kode("U", "Uspesifisert"),
            etasjeplanKode: kode("H", "Hovedetasje"),
            bruksareal: 15862,
            kjokkentilgang: kode("9", "Ikke oppgitt"),
          },
        ],
        historikker: [
          {
            dato: statusDato,
            regDato: statusDato,
            bygningstatusKode: kode("TB", "Bygningsstatus"),
          },
        ],
        objektnr: 81416001,
        kontaktpersoner: [
          {
            navn: "Statsbygg Kontakt",
            personStatusKode: kode("B", "Bosatt"),
            kontaktpersonKode: kode("T", "Tiltakshaver"),
          },
        ],
        bygningsstatuser: { TB: statusDato },
        utgattDato: isoDate("9999-12-31"),
        utgattBeskrivelse: "Aktiv",
        harHeis: true,
        bygningErFerdigstilt: true,
      },
    ],
    enkeltminner: [
      {
        enkeltminneNummer: "81416001-1",
        enkeltminneArtKode: kode("10118", "Borg-slott"),
        vernetypeKode: kode("VED", "Vedtaksfredet"),
        kulturminnekategoriKode: kode("E-BYG", "Bygning"),
      },
    ],
    bygningsstatuser: { TB: statusDato },
    utgattDato: isoDate("9999-12-31"),
    utgattBeskrivelse: "Aktiv",
    erFerdigstilt: true,
    bygningErFerdigstilt: true,
    erBygningsendring: false,
    objektnummer: 81416001,
  }
}

export function createByggSlottsplassen1Report(): LegacyFixtureByggRapport {
  return {
    rapportKode: "BYG0011",
    locale: "nb",
    metadata: {
      kommune: { kommuneNr: "0301", kommuneNavn: "OSLO" },
      koordinatSystemKode: "22",
      generertTidspunkt: "2026-07-24T08:31:00Z",
    },
    utvalgskriterier: {
      omfang: {
        inkluderBestaaendeBygg: true,
        inkluderUtgaatteBygg: true,
        inkluderBygninger: true,
        inkluderBygningsendringer: true,
        inkluderFrededeBygninger: true,
      },
      bygning: { bygningstyper: ["311"] },
      adresse: {
        adresseNavn: "Slottsplassen",
        adresseNr: 1,
        utenBokstav: null,
      },
      matrikkelenhet: { gnr: "209", bnr: "25" },
      bygningsstatus: { naavaerende: ["TB"], tidligere: [] },
      sokevindu: { nord: 6643438, ost: 596593, syd: 6643438, vest: 596593 },
      subrapporter: {
        inkluderEtasjer: true,
        inkluderBruksenheter: true,
        inkluderTiltakshavere: true,
        inkluderKontaktpersoner: true,
        inkluderHjemmelshavere: true,
        inkluderKulturminner: true,
      },
    },
    bygninger: [createBygning()],
  }
}
