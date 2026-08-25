import type { BygningsEndring } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Byg0011Rapport as ByggRapport } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import type { BygningsStatusKode } from "../lib/schema/reports/bygg/koder/byggningsStatusKode.schema.ts"
import type { EndringsKode } from "../lib/schema/reports/bygg/koder/endringsKode.schema.ts"
import type { AdresseIdentRapportInfo } from "../lib/schema/reports/bygg/shared/adresseIdentRapportInfo.schema.ts"
import type { Bruksenhet } from "../lib/schema/reports/bygg/shared/bruksenhet.schema.ts"
import type { BygningstatusHistorikkRapportInfo } from "../lib/schema/reports/bygg/shared/bygningstatusHistorikkRapportInfo.schema.ts"
import type {
  Hjemmelshaver,
  MatrikkelenhetEierforholdRapportInfo,
  PersonEierforholdRapportInfo,
} from "../lib/schema/reports/bygg/shared/eierforholdSchema.ts"
import type { EnumRapportInfo } from "../lib/schema/reports/bygg/shared/enumRapportInfo.schema.ts"
import type { Etasjedata } from "../lib/schema/reports/bygg/shared/etasjedata.schema.ts"
import type { EtasjePlan } from "../lib/schema/reports/bygg/shared/etasjeRapportInfo.schema.ts"
import type { Kontaktperson } from "../lib/schema/reports/bygg/shared/kontaktperson.schema.ts"
import type { MatrikkelnrRapportInfo } from "../lib/schema/reports/bygg/shared/matrikkelnrRapportInfo.schema.ts"
import type { MottakerAdresse } from "../lib/schema/reports/bygg/shared/mottakerAdresse.schema.ts"

type BruksenhetInfo = NonNullable<Bruksenhet>
type Endring = BygningsEndring

function isoDatetime(date: string) {
  return `${date}T00:00:00Z`
}

function createMatrikkelnrRapportInfo(): MatrikkelnrRapportInfo {
  return {
    kommunenummer: "3201",
    gnr: 208,
    bnr: 12,
    fnr: 0,
    snr: 0,
    matrikkelNummer: "3201-208/12/0/0",
    annenKommune: false,
  }
}

function createAdresseIdentRapportInfo(): AdresseIdentRapportInfo {
  return {
    matrikkelnrRapportInfo: createMatrikkelnrRapportInfo(),
    adresseNavn: "Storgata",
    bokstav: "A",
    adresseKode: 1000,
    nummer: 1,
    undernummer: "0",
    erVegadresse: true,
    adresseTypeStreng: "Vegadresse",
    adressekodeGardsnr: 1000,
    nrBruksnr: 1,
    bokstavFestenr: "A",
    undernr: "0",
    adresseAsString: "Storgata 1A",
    adresseAsStringUtenAdressekode: "Storgata 1A",
  }
}

function createEnumRapportInfo(): EnumRapportInfo {
  return {
    kode: "001",
    kodeverdi: "001",
    beskrivelse: "Eksempel kode",
    nyEndretSlettet: "N",
  }
}

function createMottakerAdresse(): MottakerAdresse {
  return {
    adresselinje1: "Storgata 1",
    adresselinje2: "H0101",
    adresselinje3: "0155 Oslo",
    fullAdresse: "Storgata 1, H0101, 0155 Oslo",
    adresse: "Storgata 1, H0101, 0155 Oslo",
    adresseUtenPostnummeromrade: "Storgata 1, H0101",
    harFullstendigPostadresse: true,
    harInnhold: true,
    bareLandkodeId: false,
  }
}

function etasjeplanTekst(
  etasjeplanKode: NonNullable<EtasjePlan["etasjeplanKode"]>,
) {
  switch (etasjeplanKode) {
    case "H":
      return "Hovedetasje"
    case "K":
      return "Kjelleretasje"
    case "L":
      return "Loft"
    case "U":
      return "Underetasje"
    default:
      return "Uspesifisert"
  }
}

function etasje({
  etasjeplanKode,
  etasjenummer,
  antallBoenheter,
  bruksarealTilBolig,
  bruksarealTilAnnet,
  bruttoarealTilBolig,
  bruttoarealTilAnnet,
}: {
  etasjeplanKode: NonNullable<EtasjePlan["etasjeplanKode"]>
  etasjenummer: number
  antallBoenheter: number
  bruksarealTilBolig: number
  bruksarealTilAnnet: number
  bruttoarealTilBolig: number
  bruttoarealTilAnnet: number
}): EtasjePlan {
  const bruksarealTotalt = bruksarealTilBolig + bruksarealTilAnnet
  const bruttoarealTotalt = bruttoarealTilBolig + bruttoarealTilAnnet

  return {
    etasjeplanKode: etasjeplanKode,
    etasjeplan: etasjeplanTekst(etasjeplanKode),
    etasjenummer: etasjenummer,
    antallBoenheter: antallBoenheter,
    bruksarealTilBolig: bruksarealTilBolig,
    bruksarealTilAnnet: bruksarealTilAnnet,
    bruksarealTotalt: bruksarealTotalt,
    alternativtAreal: 0,
    alternativtAreal2: 0,
    bruttoarealTilBolig: bruttoarealTilBolig,
    bruttoarealTilAnnet: bruttoarealTilAnnet,
    bruttoarealTotalt: bruttoarealTotalt,
    etasjeIdentString: `${etasjeplanKode}${etasjenummer}`,
    nyEndretSlettet: "N",
  }
}

const bygningEtasjer: EtasjePlan[] = [
  etasje({
    etasjeplanKode: "H",
    etasjenummer: 1,
    antallBoenheter: 6,
    bruksarealTilBolig: 268,
    bruksarealTilAnnet: 35,
    bruttoarealTilBolig: 290,
    bruttoarealTilAnnet: 40,
  }),
]

function bruksenhet({
  bruksenhetsnummer,
  antallRom,
  boligAreal,
}: {
  bruksenhetsnummer: string
  antallRom: number
  boligAreal: number
}): BruksenhetInfo {
  return {
    bruksenhetsnummer: bruksenhetsnummer,
    bruksenhetsTypeKode: "B",
    etasjeplanKode: "H",
    bruksareal: boligAreal,
    antallRom: antallRom,
    antallBad: 1,
    antallWC: 1,
    etasjenummer: "1",
    lopenummer: "1",
    kjokkentilgang: "1",
    matrikkelnrRapportInfo: createMatrikkelnrRapportInfo(),
    adresseIdentRapportInfo: createAdresseIdentRapportInfo(),
    kostraFunksjonKode: createEnumRapportInfo(),
    kostraLeieareal: "0",
    kostraVirksomhetNummer: "999999999",
    kostraVirksomhetNavn: "Testvirksomhet",
    nyEndretSlettet: "N",
  }
}

const h0101 = bruksenhet({
  bruksenhetsnummer: "H0101",
  antallRom: 3,
  boligAreal: 74,
})
const h0102 = bruksenhet({
  bruksenhetsnummer: "H0102",
  antallRom: 2,
  boligAreal: 28,
})
const h0103 = bruksenhet({
  bruksenhetsnummer: "H0103",
  antallRom: 2,
  boligAreal: 40,
})
const h0104 = bruksenhet({
  bruksenhetsnummer: "H0104",
  antallRom: 2,
  boligAreal: 42,
})
const h0105 = bruksenhet({
  bruksenhetsnummer: "H0105",
  antallRom: 3,
  boligAreal: 42,
})
const h0106 = bruksenhet({
  bruksenhetsnummer: "H0106",
  antallRom: 3,
  boligAreal: 42,
})
const h0201 = bruksenhet({
  bruksenhetsnummer: "H0201",
  antallRom: 2,
  boligAreal: 2,
})

function kontaktperson(): Kontaktperson {
  return {
    eierident: "01019012345",
    navn: "Fredrik Nordmann",
    kategoriKode: "P",
    fortrolig: false,
    personStatusKode: "B",
    personStatus: "Bosatt",
    eierUtgatt: false,
    bruksenhetsnummer: "H0101",
    postadresse: createMottakerAdresse(),
    postnummerOmradenummer: 155,
    postnummerOmradenavn: "Oslo",
    land: "Norge",
    eierAdresse: "Storgata 1, 0155 Oslo",
    eierAdresselinje1: "Storgata 1",
    eierAdresselinje2: "H0101",
    eierAdresselinje3: "0155 Oslo",
    eierAdresselinje4: "Norge",
    eierErUtgatt: false,
    adresselinje1: "Storgata 1",
    adresselinje2: "H0101",
    adresselinje3: "0155 Oslo",
    adresselinjer: ["Storgata 1", "H0101", "0155 Oslo"],
    datofra: isoDatetime("2021-03-15"),
    nyEndretSlettet: "N",
    kontaktpersonKode: "T",
    rolle: "test rolle",
    harDatofra: true,
    datofraSOSI: "20210315",
  }
}

const bygningKontaktpersoner = [kontaktperson()]

function personEierforhold(): PersonEierforholdRapportInfo {
  return {
    eierident: "01019012345",
    navn: "Fredrik Nordmann",
    kategoriKode: "P",
    fortrolig: false,
    personStatusKode: "B",
    personStatus: "Bosatt",
    eierUtgatt: false,
    bruksenhetsnummer: "H0101",
    postadresse: createMottakerAdresse(),
    postnummerOmradenummer: 155,
    postnummerOmradenavn: "Oslo",
    land: "Norge",
    eierAdresse: "Storgata 1, 0155 Oslo",
    eierAdresselinje1: "Storgata 1",
    eierAdresselinje2: "H0101",
    eierAdresselinje3: "0155 Oslo",
    eierAdresselinje4: "Norge",
    eierErUtgatt: false,
    adresselinje1: "Storgata 1",
    adresselinje2: "H0101",
    adresselinje3: "0155 Oslo",
    adresselinjer: ["Storgata 1", "H0101", "0155 Oslo"],
    eierforholdKode: "H",
    andelsNummer: 1,
    datoFra: isoDatetime("2021-03-15"),
    datoTil: null,
    harAndel: true,
    teller: 1,
    nevner: 1,
    eierforholdKodeEnum: createEnumRapportInfo(),
  }
}

function matrikkelenhetEierforhold(): MatrikkelenhetEierforholdRapportInfo {
  return {
    selveierskap: true,
    personEierforhold: [personEierforhold()],
    matrikkelnrRapportInfo: createMatrikkelnrRapportInfo(),
    eierforholdKode: "H",
    datoFra: isoDatetime("2021-03-15"),
    arealtype: "Bebygd",
    matrikkelenhet: "3201-208/12/0/0",
    harAndel: true,
    teller: 1,
    nevner: 1,
    harPersonEierforhold: true,
    eierforholdKodeEnum: createEnumRapportInfo(),
  }
}

function hjemmelshaver(): Hjemmelshaver {
  const personEiereInfos = [personEierforhold()]
  const matrikkelenhetEiereInfos = [matrikkelenhetEierforhold()]

  return {
    matrikkelenhetEiereInfos: matrikkelenhetEiereInfos,
    personEiereInfos: personEiereInfos,
    harEiere:
      personEiereInfos.length > 0 || matrikkelenhetEiereInfos.length > 0,
  }
}

const bygningHjemmelshavere = [hjemmelshaver()]

function bygningsstatusTekst(bygningsStatusKode: BygningsStatusKode) {
  switch (bygningsStatusKode) {
    case "RA":
      return "Rammetillatelse"
    case "IG":
      return "Igangsettingstillatelse"
    case "MB":
      return "Midlertidig brukstillatelse"
    case "FA":
      return "Ferdigattest"
    case "TB":
      return "Tatt i bruk"
    default:
      return "Bygningsstatus"
  }
}

function bygningsendringskodeTekst(endringsKode: EndringsKode) {
  switch (endringsKode) {
    case "P":
      return "Paabygg"
    case "T":
      return "Tilbygg"
    case "U":
      return "Underbygg"
    case "O":
      return "Ombygging"
    case "X":
      return "Ingen registrert bygningsendringskode"
    default:
      return "Bygningsendring"
  }
}

function createBygningsstatusHistorikk(
  bygningsStatusKode: BygningsStatusKode,
): BygningstatusHistorikkRapportInfo {
  return {
    dato: isoDatetime("2021-03-15"),
    regDato: isoDatetime("2021-03-15"),
    nyEndretSlettet: "N",
    bygningstatus: bygningsstatusTekst(bygningsStatusKode),
    bygningstatusKode: bygningsStatusKode,
    harRegDato: true,
    harDato: true,
    datoSOSI: "2020-07-11",
    regDatoSOSI: "2026-12-11",
  }
}

function createEtasjedata(
  boligAreal: number,
  annetAreal: number,
  antallBoenheter: number,
): Etasjedata {
  return {
    antallBoenheter,
    bruksarealTilBolig: boligAreal,
    bruksarealTilAnnet: annetAreal,
    bruksarealTotalt: boligAreal + annetAreal,
    alternativtAreal: 0,
    alternativtAreal2: 0,
    bruttoarealTilBolig: 12,
    bruttoarealTilAnnet: 65,
    bruttoarealTotalt: 52,
  }
}

function byggEndring({
  bygningsnummer,
  lopenummer,
  endringsKode,
  bygningsStatusKode,
  boligAreal,
  annetAreal,
  rammetillatelseDato,
  igangsettingstillatelseDato,
  midlbrukstillateleseDato,
  ferdigattestDato,
  tattibrukDato,
  utgattDato,
  bruksenheter,
}: {
  bygningsnummer: number
  lopenummer: number
  endringsKode: EndringsKode
  bygningsStatusKode: BygningsStatusKode
  boligAreal: number
  annetAreal: number
  rammetillatelseDato: string
  igangsettingstillatelseDato: string
  midlbrukstillateleseDato: string
  ferdigattestDato: string
  tattibrukDato: string
  utgattDato: string
  bruksenheter: BruksenhetInfo[]
}): Endring {
  const kontaktpersoner = [kontaktperson()]
  const etasjedata = createEtasjedata(
    boligAreal,
    annetAreal,
    bruksenheter.length,
  )
  const historikker = [createBygningsstatusHistorikk(bygningsStatusKode)]
  const bygningsstatuser: Record<string, string> = {
    [bygningsStatusKode]: tattibrukDato,
  }

  return {
    bygningsnummer: bygningsnummer,
    lopenummer: lopenummer,
    bygningsendringsKodeVerdi: endringsKode,
    bygningsendringskode: bygningsendringskodeTekst(endringsKode),
    harUfullstendigAreal: "Nei",
    bygningstypeKode: "111",
    bygningstatusKode: bygningsStatusKode,
    naeringsgruppeKode: "X",
    bebygdAreal: 95,
    vannforsyningsKode: "1",
    avlopsKode: "1",
    etasjedata: etasjedata,
    kommunenummer: "3201",
    opprinnelsesKode: "T",
    bruksenheter: bruksenheter,
    historikker: historikker,
    objektnr: bygningsnummer,
    kontaktpersoner: kontaktpersoner,
    bygningsstatuser: bygningsstatuser,
    utgattDato: utgattDato,
    utgattBeskrivelse: "Utgaatt/Revet",
    harKontaktpersoner: kontaktpersoner.length > 0,
    harLopenr: lopenummer > 0,
    harOpprinnelseskode: true,
    harBruksenheter: bruksenheter.length > 0,
    harBygningsstatuskoder: historikker.length > 0,
    harBebygdAreal: true,
    harHeis: false,
    harVannforsyningskode: true,
    harAvlopskode: true,
    harNaeringsgruppekode: true,
    sumBruksarealTilBolig: boligAreal,
    sumBruksarealTilAnnet: annetAreal,
    sumBruksarealTotalt: boligAreal + annetAreal,
    sumAntallBoenheter: bruksenheter.length,
    sumAlternativtAreal: etasjedata.alternativtAreal,
    sumAlternativtAreal2: etasjedata.alternativtAreal2,
    harRammetillatelse: true,
    rammetillatelseDato: rammetillatelseDato,
    harIgangsettingstillatelse: true,
    igangsettingstillatelseDato: igangsettingstillatelseDato,
    harTattibruk: true,
    tattibrukDato: tattibrukDato,
    harMidlbrukstillatelese: true,
    midlbrukstillateleseDato: midlbrukstillateleseDato,
    harFerdigattest: true,
    ferdigattestDato: ferdigattestDato,
    bygningErFerdigstilt: true,
  }
}

const alleEndringer: Endring[] = [
  byggEndring({
    bygningsnummer: 18520621,
    lopenummer: 5,
    endringsKode: "P",
    bygningsStatusKode: "TB",
    boligAreal: 140,
    annetAreal: 35,
    rammetillatelseDato: isoDatetime("2021-03-15"),
    igangsettingstillatelseDato: isoDatetime("2021-05-03"),
    midlbrukstillateleseDato: isoDatetime("2022-07-15"),
    ferdigattestDato: isoDatetime("2022-08-15"),
    tattibrukDato: isoDatetime("2022-09-01"),
    utgattDato: isoDatetime("9999-12-31"),
    bruksenheter: [h0101, h0102, h0103, h0104, h0105, h0106, h0201],
  }),
  byggEndring({
    bygningsnummer: 18520621,
    lopenummer: 4,
    endringsKode: "T",
    bygningsStatusKode: "FA",
    boligAreal: 121,
    annetAreal: 74,
    rammetillatelseDato: isoDatetime("2019-02-12"),
    igangsettingstillatelseDato: isoDatetime("2019-05-06"),
    midlbrukstillateleseDato: isoDatetime("2020-01-22"),
    ferdigattestDato: isoDatetime("2020-08-20"),
    tattibrukDato: isoDatetime("2020-04-01"),
    utgattDato: isoDatetime("9999-12-31"),
    bruksenheter: [h0103],
  }),
  byggEndring({
    bygningsnummer: 18520621,
    lopenummer: 3,
    endringsKode: "P",
    bygningsStatusKode: "IG",
    boligAreal: 121,
    annetAreal: 60,
    rammetillatelseDato: isoDatetime("2018-02-01"),
    igangsettingstillatelseDato: isoDatetime("2018-06-15"),
    midlbrukstillateleseDato: isoDatetime("2018-09-01"),
    ferdigattestDato: isoDatetime("2019-01-10"),
    tattibrukDato: isoDatetime("2018-11-20"),
    utgattDato: isoDatetime("9999-12-31"),
    bruksenheter: [h0103],
  }),
  byggEndring({
    bygningsnummer: 18520621,
    lopenummer: 2,
    endringsKode: "U",
    bygningsStatusKode: "RA",
    boligAreal: 102,
    annetAreal: 60,
    rammetillatelseDato: isoDatetime("2016-09-12"),
    igangsettingstillatelseDato: isoDatetime("2016-10-10"),
    midlbrukstillateleseDato: isoDatetime("2017-01-10"),
    ferdigattestDato: isoDatetime("2017-03-10"),
    tattibrukDato: isoDatetime("2017-02-15"),
    utgattDato: isoDatetime("9999-12-31"),
    bruksenheter: [h0104],
  }),
  byggEndring({
    bygningsnummer: 18520621,
    lopenummer: 1,
    endringsKode: "O",
    bygningsStatusKode: "MB",
    boligAreal: 102,
    annetAreal: 0,
    rammetillatelseDato: isoDatetime("2007-02-15"),
    igangsettingstillatelseDato: isoDatetime("2007-05-04"),
    midlbrukstillateleseDato: isoDatetime("2008-09-12"),
    ferdigattestDato: isoDatetime("2009-01-20"),
    tattibrukDato: isoDatetime("2008-10-01"),
    utgattDato: isoDatetime("9999-12-31"),
    bruksenheter: [h0103],
  }),
  byggEndring({
    bygningsnummer: 18520621,
    lopenummer: 0,
    endringsKode: "X",
    bygningsStatusKode: "TB",
    boligAreal: 102,
    annetAreal: 0,
    rammetillatelseDato: isoDatetime("1996-06-18"),
    igangsettingstillatelseDato: isoDatetime("1997-03-10"),
    midlbrukstillateleseDato: isoDatetime("1998-03-01"),
    ferdigattestDato: isoDatetime("1998-07-01"),
    tattibrukDato: isoDatetime("1998-06-18"),
    utgattDato: isoDatetime("9999-12-31"),
    bruksenheter: [h0101, h0102],
  }),
]

const mockByggRapport: ByggRapport = {
  rapportKode: "BYG0011",
  locale: "nb",
  metadata: {
    kommune: { kommuneNr: "3201", kommuneNavn: "Bærum" },
    koordinatSystemKode: "22",
    generertTidspunkt: "2026-07-17T10:00:00Z",
  },
  utvalgskriterier: {
    omfang: {
      inkluderBestaaendeBygg: true,
      inkluderUtgaatteBygg: false,
      inkluderBygninger: true,
      inkluderBygningsendringer: true,
      inkluderFrededeBygninger: true,
    },
    bygning: {
      bygningsNr: "18 520 621",
      bygningstyper: ["111"],
    },
    adresse: {
      adresseKode: "1000",
      bruksenhetsNr: "H0101",
      adresseNavn: "Storgata",
      adresseNr: 1,
      utenBokstav: true,
    },
    matrikkelenhet: { gnr: 208, bnr: 12 },
    aktor: {
      etternavn: "Nordmann",
      fornavn: "Ola",
    },
    bygningsstatus: {
      naavaerende: ["TB"],
      tidligere: [],
      periodeFra: isoDatetime("2019-01-01"),
    },
    sokevindu: {
      nord: 6642200,
      ost: 597500,
      syd: 6642000,
      vest: 597300,
    },
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
    {
      bygningsnummer: "18 520 621",
      lopenummer: 12345,
      harLopenummer: true,
      bygningsendringsKode: "X",
      harUfullstendigAreal: "Nei",
      bygningstypeKode: "111",
      naringsgruppeKode: "X",
      harNaeringsgruppekode: true,
      bygningstatusKode: "FA",
      bebygdAreal: 123,
      harBebygdAreal: true,
      harHeis: false,
      vannforsyningsKode: " ",
      harVannforsyningskode: false,
      avlopsKode: "1",
      harAvlopskode: true,
      // etasjedata: // Har ikke getter for denne i m22, så usikker på om vi tar den med, får data direkte fra gettere
      kommunenummer: "0401",
      opprinnelsesKode: "T",
      harOpprinnelseskode: true,
      harRepresentasjonspunkt: true,
      harStedfestingVerifisertRepPunkt: true,
      nord: 6642100,
      nordSOSI: "6642100",
      ost: 597400,
      ostSOSI: "597400",
      koordinatkvalitetKode: "test",
      harKoordinatkvalitetkode: true,
      koordinatsystem: "koordinansystem her",
      bruksenheter: [h0101, h0102, h0103, h0104, h0105, h0106, h0201],
      harBruksenheter: true,
      sefrakminner: [
        { objektnr: "3201-0103-058" },
        { objektnr: "3201-0103-059" },
      ],
      harSefrakminner: true,
      etasjer: bygningEtasjer,
      harEtasjer: true,
      antallEtasjer: bygningEtasjer.length,
      harKontaktpersoner: true,
      kontaktpersoner: bygningKontaktpersoner,
      harTiltakshavere: true,
      tiltakshavere: bygningKontaktpersoner,
      harKontaktpersonderSomIkkeErTiltakshavere: true,
      kontaktpersonerSomIkkeErTiltakshavere: bygningKontaktpersoner,
      oppvarmingskoder: [],
      harOppvarming: false,
      energikilder: [],
      harEnergikilder: false,
      historikker: [],
      harBygningsstatuskoder: false,
      hjemmelshavere: bygningHjemmelshavere,
      harHjemmelshavere: true,
      bygningsendringer: alleEndringer,
      harBygningsendringer: true,
      enkeltminner: [],
      harEnkeltminner: false,
      harRammetillatelse: true,
      rammetillatelsedato: isoDatetime("2021-03-15"),
      harIgangsettingstillatelse: true,
      igangsettingstillatelseDato: isoDatetime("2021-03-15"),
      harTattibruk: true,
      tattibrukDato: isoDatetime("2021-03-15"),
      harMidlbrukstillatelese: true,
      midlbrukstillateleseDato: isoDatetime("2021-03-15"),
      harFerdigattest: true,
      ferdigattestDato: isoDatetime("2021-03-15"),
      utgattDato: isoDatetime("2021-03-15"),
      utgattBeskrivelse: "test",
      sumBruksarealTilAnnet: 67,
      sumBruttoarealTilAnnet: 1,
      sumAlternativtAreal: 3,
      sumAlternativtAreal2: 12,
      sumBruksarealTotalt: 32,
      sumBruttoarealTotalt: 21,
      sumBruksarealTilBolig: 12,
      sumBruttoarealTilBolig: 54,
      sumAntallBoenheter: 2,
      erFerdigstilt: true,
      bygningErFerdigstilt: true,
      erBygningsendring: false,
      objektnummer: 123,
    },
  ],
}

export default mockByggRapport
