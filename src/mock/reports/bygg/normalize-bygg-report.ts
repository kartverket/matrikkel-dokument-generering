import type { NormalizedByggRapport } from "../../types"

type JsonObject = Record<string, unknown>
type Defined<T> = Exclude<T, undefined | null>
type ContractKriterier = NonNullable<NormalizedByggRapport["utvalgskriterier"]>
type ContractBygning = NonNullable<NormalizedByggRapport["bygninger"]>[number]
type ContractEndring = NonNullable<
  NonNullable<ContractBygning["endringer"]>[number]
>
type ContractBruksenhet = NonNullable<
  NonNullable<ContractEndring["bruksenheter"]>[number]
>
type ContractKulturminne = NonNullable<
  NonNullable<ContractEndring["kulturminner"]>[number]
>
type ContractAreal = Defined<
  Defined<ContractEndring["byggArealEndring"]>["bruksarealBolig"]
>
type BruksenhetsTypeKode = Defined<ContractBruksenhet["bruksenhetsTypeKode"]>
type BygningsTypeKode = Defined<
  Defined<ContractEndring["byggMetaEndring"]>["bygningsTypeKode"]
>
type Bygningsstatuskode = Defined<
  Defined<ContractEndring["byggMetaEndring"]>["bygningsStatusKode"]
>
type EierforholdKode = Defined<
  NonNullable<
    NonNullable<ContractEndring["aktuelleEiere"]>[number]
  >["eierforholdKode"]
>
type EndringsKode = Defined<
  Defined<ContractEndring["byggMetaEndring"]>["endringsKode"]
>
type EtasjeplanKode = Defined<
  NonNullable<
    NonNullable<ContractEndring["etasjePlan"]>[number]
  >["etasjeplanKode"]
>
type EnkeltminneArtKode = Defined<ContractKulturminne["enkeltminneArtKode"]>
type KjokkenTilgangKode = Defined<ContractBruksenhet["kjokkenTilgangKode"]>
type KoordinatSystemKode = Defined<
  NormalizedByggRapport["metadata"]["koordinatSystemKode"]
>
type KontaktPersonKode = Defined<
  NonNullable<
    NonNullable<ContractEndring["tiltaksHavere"]>[number]
  >["kontaktPersonKode"]
>
type KulturminnekategoriKode = Defined<
  ContractKulturminne["kulturminnekategoriKode"]
>
type NaringsgruppeKode = Defined<
  Defined<ContractEndring["byggMetaEndring"]>["naringsgruppeKode"]
>
type VernetypeKode = Defined<ContractKulturminne["vernetypeKode"]>

const KOORDINATSYSTEM_KODER = new Set<KoordinatSystemKode>([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "50",
  "51",
  "52",
  "53",
  "54",
  "84",
])

const STATUS_KODER = new Set<Bygningsstatuskode>([
  "RA",
  "IG",
  "MB",
  "FA",
  "TB",
  "MT",
  "MF",
  "IP",
  "GR",
  "BR",
  "BA",
  "BF",
  "BU",
  "FS",
  "EB",
  "TE",
  "TA",
  "SB",
  "DO",
])

const EIERFORHOLD_KODER = new Set<EierforholdKode>([
  "H",
  "F",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "AE",
  "AF",
  "KE",
  "KF",
  "K1",
  "K2",
  "K3",
  "SE",
  "SF",
  "SF1",
  "SF2",
  "SF3",
])

const EIERFORHOLD_MAP: Record<string, EierforholdKode> = {
  "0": "H",
  "1": "F",
  "2": "F1",
  "3": "F2",
  "4": "F3",
  "5": "F4",
  "6": "F5",
  "7": "F6",
  "8": "F7",
  "9": "F8",
  "10": "F9",
  "11": "AE",
  "12": "AF",
  "13": "KE",
  "14": "KF",
  "15": "K1",
  "16": "K2",
  "17": "K3",
  "18": "SE",
  "19": "SF",
  "20": "SF1",
  "21": "SF2",
  "22": "SF3",
  hjemmelshaver: "H",
  selveier: "H",
  fester: "F",
  framfester: "F1",
  "aktuell eier": "AE",
  "aktuell fester": "AF",
  "kontaktinstans eier": "KE",
  "kontaktinstans fester": "KF",
}

const ETASJEPLAN_MAP: Record<string, EtasjeplanKode> = {
  "0": " ",
  "1": "H",
  "2": "K",
  "3": "L",
  "4": "U",
  h: "H",
  hovedetasje: "H",
  hovudetasje: "H",
  k: "K",
  kjelleretasje: "K",
  kjellaretasje: "K",
  l: "L",
  loft: "L",
  u: "U",
  underetasje: "U",
}

const BRUKSENHET_TYPE_KODER: Record<string, BruksenhetsTypeKode> = {
  "0": "B",
  "1": "I",
  "2": "F",
  "3": "A",
  "4": "U",
  "5": "X",
  bolig: "B",
  "ikke godkjent bolig": "I",
  "ikke-godkjent bolig": "I",
  fritidsbolig: "F",
  annet: "A",
  "annet enn bolig": "A",
  "unummerert bruksenhet": "U",
  ukjent: "X",
}

const ENDRINGSKODE_MAP: Record<string, EndringsKode> = {
  "1": "T",
  "2": "P",
  "3": "U",
  "4": "O",
  "5": "X",
  tilbygg: "T",
  påbygg: "P",
  underbygg: "U",
  ombygging: "O",
  bruksendring: "X",
  fasadeendring: "X",
  riving: "X",
}

const NAERINGSGRUPPE_KODER = new Set<NaringsgruppeKode>([
  " ",
  "X",
  "A",
  "B",
  "C",
  "D",
  "F",
  "G",
  "I",
  "H",
  "K",
  "L",
  "O",
  "P",
  "Q",
  "U",
  "Y",
  "T",
  "E",
  "J",
  "M",
  "N",
  "R",
  "S",
  "-",
])

const VERNETYPE_KODER = new Set<VernetypeKode>([
  "ADM",
  "FOR",
  "AUT",
  "VED",
  "WHS",
  "FPG",
  "LIST",
  "MID",
  "UAV",
  "OPP",
  "FJE",
  "IKKE",
  "KOM",
  "LOK",
  "SAM",
])

const KULTURMINNEKATEGORI_KODER = new Set<KulturminnekategoriKode>([
  "E-ARK",
  "L-ARK",
  "E-BYG",
  "L-BVF",
  "E-KRK",
  "L-KRK",
  "E-MAR",
  "E-TEK",
  "E-BER",
  "E-FAR",
  "E-RUI",
  "E-UTE",
])

const NAERINGSGRUPPE_MAP: Record<string, NaringsgruppeKode> = {
  bolig: "X",
  fritid: "Y",
  "jordbruk, skogbruk og fiske": "A",
  "bergverksdrift og utvinning": "B",
  industri: "C",
  "elektrisitets-, gass-, damp- og varmtvannsforsyning": "D",
  "bygge- og anleggsvirksomhet": "F",
  "varehandel og reparasjon av motorvogner": "G",
  "varehandel, reparasjon av motorvogner": "G",
  "overnattings- og serveringsvirksomhet": "I",
  "transport og lagring": "H",
  "finansierings- og forsikringsvirksomhet": "K",
  "omsetning og drift av fast eiendom": "L",
  "offentlig forvaltning": "O",
  "offentlig administrasjon og forsvar, og trygdeordninger underlagt offentlig forvaltning":
    "O",
  undervisning: "P",
  "helse- og sosialtjenester": "Q",
  "internasjonale organisasjoner og organer": "U",
  "annet som ikke er næring": "Y",
  "lønnet arbeid i private husholdninger": "T",
  "vannforsyning, avløps- og renovasjonsvirksomhet": "E",
  "informasjon og kommunikasjon": "J",
  "faglig, vitenskapelig og teknisk tjenesteyting": "M",
  "forretningsmessig tjenesteyting": "N",
  "kulturell virksomhet, underholdning og fritidsaktiviteter": "R",
  "annen tjenesteyting": "S",
  ukjent: "-",
}

/** Converts generated and checked-in legacy reports to the current BYG0011 API. */
export function normalizeByggRapport(report: unknown): NormalizedByggRapport {
  const source = asObject(report, "rapport")
  const metadata = optionalObject(source.metadata)
  const legacyKommune = optionalObject(source.kommune)
  const kommune = {
    kommuneNr: stringValue(
      optionalObject(metadata?.kommune)?.kommuneNr ?? legacyKommune?.nr,
      "0000",
    ),
    kommuneNavn: stringValue(
      optionalObject(metadata?.kommune)?.kommuneNavn ?? legacyKommune?.navn,
      "Ukjent kommune",
    ),
  }

  return {
    rapportKode: "BYG0011",
    locale: source.locale === "nn" ? "nn" : "nb",
    metadata: {
      kommune,
      koordinatSystemKode: normalizeKoordinatSystemKode(
        metadata?.koordinatSystemKode ?? source.koordinatsystem,
      ),
      generertTidspunkt: normalizeRequiredIsoDatetime(
        metadata?.generertTidspunkt ?? source.generertTidspunkt,
      ),
    },
    utvalgskriterier: normalizeUtvalgskriterier(source.utvalgskriterier),
    bygninger: arrayValue(source.bygninger).map((bygning) =>
      normalizeBygning(bygning, kommune.kommuneNr),
    ),
  }
}

function normalizeUtvalgskriterier(value: unknown): ContractKriterier {
  const source = optionalObject(value) ?? {}
  const omfang = optionalObject(source.omfang) ?? {}
  const bygning = optionalObject(source.bygning) ?? {}
  const adresse = optionalObject(source.adresse) ?? {}
  const matrikkelenhet = optionalObject(source.matrikkelenhet)
  const aktor =
    optionalObject(source.aktor ?? source.aktoer ?? source.hjemmelshaver) ?? {}
  const bygningsstatus = optionalObject(source.bygningsstatus) ?? {}
  const subrapporter = optionalObject(source.subrapporter) ?? {}

  return {
    omfang: {
      inkluderBestaaendeBygg: booleanValue(
        omfang.inkluderBestaaendeBygg ?? omfang.bestaaendeBygg,
      ),
      inkluderUtgaatteBygg: booleanValue(
        omfang.inkluderUtgaatteBygg ?? omfang.utgaatteBygg,
      ),
      inkluderBygninger: booleanValue(
        omfang.inkluderBygninger ?? omfang.bygninger,
      ),
      inkluderBygningsendringer: booleanValue(
        omfang.inkluderBygningsendringer ?? omfang.bygningsendringer,
      ),
      inkluderFrededeBygninger:
        typeof omfang.inkluderFrededeBygninger === "boolean"
          ? omfang.inkluderFrededeBygninger
          : omfang.frededeBygninger !== "Ingen",
    },
    bygning: {
      bygningsNr: optionalString(bygning.bygningsNr ?? bygning.bygningsnr),
      bygningstyper: arrayValue(bygning.bygningstyper)
        .map((type) =>
          normalizeBygningstypeKode(optionalObject(type)?.kode ?? type),
        )
        .filter((type): type is BygningsTypeKode => type !== undefined),
      lopeNr: optionalNonNegativeInteger(bygning.lopeNr ?? bygning.lopenr),
    },
    adresse: {
      adresseKode: optionalString(adresse.adresseKode ?? adresse.adressekode),
      bruksenhetsNr: optionalString(
        adresse.bruksenhetsNr ?? adresse.bruksenhetsnr,
      ),
      adresseNavn: optionalString(adresse.adresseNavn ?? adresse.adressenavn),
      adresseNr: optionalNonNegativeInteger(adresse.adresseNr ?? adresse.nr),
      adresseBokstav: optionalString(adresse.adresseBokstav ?? adresse.bokstav),
      utenBokstav:
        adresse.utenBokstav === null ? null : booleanValue(adresse.utenBokstav),
      adresseTilleggsNavn: optionalString(
        adresse.adresseTilleggsNavn ?? adresse.tilleggsnavn,
      ),
    },
    matrikkelenhet: matrikkelenhet
      ? {
          gnr: optionalNonNegativeInteger(matrikkelenhet.gnr),
          bnr: optionalNonNegativeInteger(matrikkelenhet.bnr),
          fnr: optionalNonNegativeInteger(matrikkelenhet.fnr),
          snr: optionalNonNegativeInteger(matrikkelenhet.snr),
        }
      : undefined,
    aktor: {
      identifikasjonsNr: optionalString(
        aktor.identifikasjonsNr ?? aktor.foedselsEllerOrgnr,
      ),
      etternavn: optionalString(aktor.etternavn),
      fornavn: optionalString(aktor.fornavn),
    },
    bygningsstatus: {
      naavaerende: normalizeStatuskoder(bygningsstatus.naavaerende),
      tidligere: normalizeStatuskoder(bygningsstatus.tidligere),
      periodeFra: normalizeOptionalIsoDatetime(bygningsstatus.periodeFra),
      periodeTil: normalizeOptionalIsoDatetime(bygningsstatus.periodeTil),
    },
    sokevindu: normalizeSokevindu(source.sokevindu),
    subrapporter: {
      inkluderEtasjer: booleanValue(
        subrapporter.inkluderEtasjer ?? subrapporter.etasjer,
      ),
      inkluderBruksenheter: booleanValue(
        subrapporter.inkluderBruksenheter ?? subrapporter.bruksenheter,
      ),
      inkluderTiltakshavere: booleanValue(
        subrapporter.inkluderTiltakshavere ?? subrapporter.tiltakshavere,
      ),
      inkluderKontaktpersoner: booleanValue(
        subrapporter.inkluderKontaktpersoner ?? subrapporter.kontaktpersoner,
      ),
      inkluderHjemmelshavere: booleanValue(
        subrapporter.inkluderHjemmelshavere ?? subrapporter.hjemmelshavere,
      ),
      inkluderKulturminner: booleanValue(
        subrapporter.inkluderKulturminner ?? subrapporter.kulturminner,
      ),
    },
  }
}

function normalizeBygning(value: unknown, kommuneNr: string): ContractBygning {
  const source = asObject(value, "bygning")
  const detaljer = arrayValue(source.bruksenheter)
  const endringer = arrayValue(source.endringer)
  const fallbackEndring = source.gjeldende
  const matrikkelNr = normalizeMatrikkelNr(
    source.matrikkelNr ?? source.matrikkelenhetsNr ?? source.matrikkelenhet,
    kommuneNr,
  )

  if (endringer.length === 0 && fallbackEndring === undefined) {
    throw new Error(
      `Bygning ${stringValue(source.bygningsnr, "ukjent")} mangler bygningsendringer`,
    )
  }

  return {
    bygningsnr: stringValue(source.bygningsnr, "Ukjent"),
    matrikkelNr,
    endringer: (endringer.length > 0 ? endringer : [fallbackEndring]).map(
      (endring) =>
        normalizeBygningsendring(
          endring,
          source,
          detaljer,
          kommuneNr,
          matrikkelNr,
        ),
    ),
  }
}

function normalizeBygningsendring(
  value: unknown,
  bygning: JsonObject,
  detaljer: unknown[],
  kommuneNr: string,
  matrikkelNr: string,
): ContractEndring {
  const source = asObject(value, "bygningsendring")
  const meta = optionalObject(source.byggMetaEndring) ?? {}
  const areal = optionalObject(source.byggArealEndring) ?? {}
  const kulturminner = arrayValue(source.kulturminner)
  const eksplisitteEiere = arrayValue(source.aktuelleEiere)
  const singularEier = optionalObject(
    source.aktuellEier ?? source.aktor ?? source.aktoer,
  )
  let aktuelleEiere: unknown[]
  if (eksplisitteEiere.length > 0) {
    aktuelleEiere = eksplisitteEiere
  } else if (singularEier) {
    aktuelleEiere = [singularEier]
  } else {
    aktuelleEiere = allAktuelleEiere(source, detaljer)
  }
  const eksplisitteTiltakshavere = arrayValue(
    source.tiltaksHavere ?? source.tiltakshavere,
  )
  const singularTiltakshaver = optionalObject(source.tiltaksHaver)
  let tiltakshavere: unknown[]
  if (eksplisitteTiltakshavere.length > 0) {
    tiltakshavere = eksplisitteTiltakshavere
  } else if (singularTiltakshaver) {
    tiltakshavere = [singularTiltakshaver]
  } else {
    tiltakshavere = []
  }
  const legacySefrakId = optionalString(
    source.sefrakId ??
      (kulturminner ? optionalObject(kulturminner[0])?.id : undefined),
  )
  let sefrakIder: string[]
  if (source.sefrakIder !== undefined) {
    sefrakIder = arrayValue(source.sefrakIder)
      .map(optionalString)
      .filter((id): id is string => id !== undefined)
  } else if (legacySefrakId) {
    sefrakIder = [legacySefrakId]
  } else {
    sefrakIder = []
  }
  const bygningsstatus = optionalObject(source.bygningsstatus)

  return {
    lopeNr: nonNegativeNumber(source.lopeNr ?? source.lopenr),
    byggMetaEndring: {
      endringsKode: normalizeEndringsKode(
        meta.endringsKode ?? source.endringsKode ?? source.endringskode,
      ),
      bygningsStatusKode: normalizeStatuskode(
        meta.bygningsStatusKode ??
          bygningsstatus?.kortkode ??
          bygningsstatus?.navn,
      ),
      bygningsTypeKode:
        normalizeBygningstypeKode(
          meta.bygningsTypeKode ??
            meta.bygningsType ??
            optionalObject(bygning.bygningstype)?.kode,
        ) ?? "999",
      antallBoenheter: optionalNonNegativeInteger(
        meta.antallBoenheter ?? source.antallBoenheter,
      ),
      naringsgruppeKode: normalizeNaringsgruppeKode(
        meta.naringsgruppeKode ??
          meta.naeringsgruppe ??
          bygning.naringsgruppeKode ??
          bygning.naeringsgruppe,
      ),
    },
    byggArealEndring: {
      bruksarealBolig: normalizeArealFordeling(
        areal.bruksarealBolig ?? source.bruksareal,
      ),
      bruttoarealBolig: normalizeArealFordeling(
        areal.bruttoarealBolig ?? source.bruttoareal,
      ),
      bebygdAreal: optionalNumber(areal.bebygdAreal ?? source.bebygdAreal),
    },
    etasjePlan: arrayValue(source.etasjePlan ?? source.etasjeplan).map(
      normalizeEtasje,
    ),
    byggKoordinatEndring: normalizeKoordinat(
      source.byggKoordinatEndring ?? source.koordinat,
    ),
    byggDatoEndring: normalizeDatoer(source.byggDatoEndring ?? source.datoer),
    sefrakIder,
    kulturminner: kulturminner.map(normalizeKulturminne),
    aktuelleEiere: aktuelleEiere
      .map(optionalObject)
      .filter((eier): eier is JsonObject => eier !== undefined)
      .map(normalizeAktuellEier),
    tiltaksHavere: tiltakshavere
      .map(optionalObject)
      .filter((tiltakshaver): tiltakshaver is JsonObject =>
        Boolean(tiltakshaver),
      )
      .map(normalizeTiltakshaver),
    bruksenheter: normalizeBruksenheter(
      source,
      detaljer,
      kommuneNr,
      matrikkelNr,
    ),
  }
}

function normalizeKulturminne(value: unknown): ContractKulturminne {
  const source = asObject(value, "kulturminne")

  return {
    enkeltminneNr: optionalString(source.enkeltminneNr ?? source.id),
    enkeltminneArtKode: normalizeEnkeltminneArtKode(source.enkeltminneArtKode),
    vernetypeKode: normalizeVernetypeKode(
      source.vernetypeKode ?? source.status,
    ),
    kulturminnekategoriKode: normalizeKulturminnekategoriKode(
      source.kulturminnekategoriKode ?? source.kategori,
    ),
  }
}

function normalizeEnkeltminneArtKode(
  value: unknown,
): EnkeltminneArtKode | undefined {
  const candidate = optionalString(value)
  return candidate && /^\d{4,5}$/.test(candidate)
    ? (candidate as EnkeltminneArtKode)
    : undefined
}

function normalizeVernetypeKode(value: unknown): VernetypeKode | undefined {
  const candidate = optionalString(value)
  const normalizedKode = candidate?.toUpperCase()
  if (normalizedKode && VERNETYPE_KODER.has(normalizedKode as VernetypeKode)) {
    return normalizedKode as VernetypeKode
  }

  const normalized = candidate?.toLocaleLowerCase("nb") ?? ""
  if (normalized.includes("vedtaksfredet")) return "VED"
  if (normalized.includes("automatisk fredet")) return "AUT"
  if (normalized.includes("fredet")) return "VED"
  if (normalized.includes("listeført")) return "LIST"
  if (normalized.includes("registrert")) return "IKKE"
  return undefined
}

function normalizeKulturminnekategoriKode(
  value: unknown,
): KulturminnekategoriKode | undefined {
  const candidate = optionalString(value)
  const normalizedKode = candidate?.toUpperCase()
  if (
    normalizedKode &&
    KULTURMINNEKATEGORI_KODER.has(normalizedKode as KulturminnekategoriKode)
  ) {
    return normalizedKode as KulturminnekategoriKode
  }

  const normalized = candidate?.toLocaleLowerCase("nb") ?? ""
  if (normalized.includes("arkeologisk lokalitet")) return "L-ARK"
  if (normalized.includes("arkeologisk")) return "E-ARK"
  if (normalized.includes("kirke")) return "E-KRK"
  if (normalized.includes("ruin")) return "E-RUI"
  return normalized ? "E-BYG" : undefined
}

function normalizeBruksenheter(
  endring: JsonObject,
  detaljer: unknown[],
  kommuneNr: string,
  fallbackMatrikkelNr: string,
): ContractBruksenhet[] {
  return arrayValue(endring.bruksenheter).map((rawValue, index) => {
    const raw = optionalObject(rawValue) ?? {}
    const nummer = optionalString(raw.bruksenhetsNr ?? raw.bruksenhetsnr)
    const detalj =
      detaljer
        .map(optionalObject)
        .find(
          (candidate) =>
            candidate &&
            (candidate.id === nummer ||
              candidate.nummer === nummer ||
              (nummer === undefined && index === 0)),
        ) ?? raw
    const arealfordeling = optionalObject(detalj.arealfordeling)
    const bruksarealFordeling = optionalObject(arealfordeling?.bruksareal)

    return {
      bruksenhetsNr: optionalString(
        detalj.bruksenhetsNr ?? detalj.nummer ?? nummer,
      ),
      bruksenhetsTypeKode: normalizeBruksenhetsTypeKode(
        raw.bruksenhetsTypeKode ??
          detalj.bruksenhetsTypeKode ??
          detalj.type ??
          detalj.bruksenhetstype ??
          detalj.typeChip ??
          raw.type,
      ),
      bruksAreal: optionalNumber(
        raw.bruksAreal ??
          raw.bruksareal ??
          detalj.bruksAreal ??
          bruksarealFordeling?.totaltAreal ??
          bruksarealFordeling?.totalt,
      ),
      antallRom: optionalNonNegativeInteger(raw.antallRom ?? detalj.antallRom),
      antallBad: optionalNonNegativeInteger(raw.antallBad ?? detalj.antallBad),
      antallWC: optionalNonNegativeInteger(
        raw.antallWC ?? raw.antallWc ?? detalj.antallWC ?? detalj.antallWc,
      ),
      kjokkenTilgangKode: normalizeKitchenAccess(
        raw.kjokkenTilgangKode ??
          raw.kjokkentilgang ??
          detalj.kjokkenTilgangKode ??
          detalj.kjokkentilgang,
        detalj.kjokken,
      ),
      adresse: optionalString(raw.adresse ?? detalj.adresse),
      matrikkelNr: normalizeMatrikkelNr(
        raw.matrikkelNr ??
          raw.matrikkelEnhetsNr ??
          raw.matrikkelenhet ??
          detalj.matrikkelNr ??
          detalj.matrikkelEnhetsNr ??
          detalj.matrikkelenhet,
        kommuneNr,
        fallbackMatrikkelNr,
      ),
    }
  })
}

function normalizeArealFordeling(value: unknown): ContractAreal {
  const source = optionalObject(value) ?? {}
  const boligAreal = numberValue(source.boligAreal ?? source.bolig)
  const annetAreal = numberValue(source.annetAreal ?? source.annet)
  const totaltAreal = numberValue(
    source.totaltAreal ?? source.totalt,
    boligAreal + annetAreal,
  )

  return { boligAreal, annetAreal, totaltAreal }
}

function normalizeEtasje(value: unknown) {
  const source = optionalObject(value) ?? {}
  return {
    etasjeplanKode: normalizeEtasjeplanKode(
      source.etasjeplanKode ?? source.etasjeplankode ?? source.etasjeplan,
    ),
    etasje: nonNegativeInteger(source.etasje),
    antallBoenheter: optionalNonNegativeInteger(source.antallBoenheter),
    bruksareal: normalizeArealFordeling(source.bruksareal),
    bruttoareal: normalizeArealFordeling(source.bruttoareal),
  }
}

function normalizeDatoer(value: unknown): ContractEndring["byggDatoEndring"] {
  const source = optionalObject(value)
  if (!source) return undefined

  return {
    rammetillatelse: normalizeOptionalIsoDatetime(source.rammetillatelse),
    igangsettingstillatelse: normalizeOptionalIsoDatetime(
      source.igangsettingstillatelse,
    ),
    midlertidigBrukstillatelse: normalizeOptionalIsoDatetime(
      source.midlertidigBrukstillatelse,
    ),
    ferdigattest: normalizeOptionalIsoDatetime(source.ferdigattest),
    tattIBruk: normalizeOptionalIsoDatetime(source.tattIBruk),
    utgaattRevet: normalizeOptionalIsoDatetime(source.utgaattRevet),
  }
}

function normalizeSokevindu(value: unknown): ContractKriterier["sokevindu"] {
  const source = optionalObject(value)
  if (!source) return undefined
  const nedreVenstre = optionalObject(source.nedreVenstre)
  const ovreHoeyre = optionalObject(source.ovreHoeyre)

  return {
    nord: optionalNumber(source.nord ?? ovreHoeyre?.nord),
    ost: optionalNumber(source.ost ?? ovreHoeyre?.ost),
    syd: optionalNumber(source.syd ?? nedreVenstre?.nord),
    vest: optionalNumber(source.vest ?? nedreVenstre?.ost),
  }
}

function normalizeStatuskoder(value: unknown): Bygningsstatuskode[] {
  return arrayValue(value)
    .map((status) => {
      const candidate = stringValue(status, "")
      return STATUS_KODER.has(candidate as Bygningsstatuskode)
        ? (candidate as Bygningsstatuskode)
        : undefined
    })
    .filter((status): status is Bygningsstatuskode => status !== undefined)
}

function normalizeStatuskode(value: unknown): Bygningsstatuskode | undefined {
  return normalizeStatuskoder(value === undefined ? [] : [value])[0]
}

function normalizeBygningstypeKode(
  value: unknown,
): BygningsTypeKode | undefined {
  const candidate = optionalString(value)
  if (!candidate || !/^(?: |\d{3})$/.test(candidate)) return undefined
  return candidate as BygningsTypeKode
}

function normalizeEndringsKode(value: unknown): EndringsKode | undefined {
  const candidate = optionalString(value)
  if (!candidate) return undefined
  const normalizedKode = candidate.toUpperCase()
  if (["T", "P", "U", "O", "X"].includes(normalizedKode)) {
    return normalizedKode as EndringsKode
  }
  return ENDRINGSKODE_MAP[candidate.toLocaleLowerCase("nb")] ?? "X"
}

function normalizeKoordinatSystemKode(value: unknown): KoordinatSystemKode {
  const candidate = /^\d+/.exec(stringValue(value, "22"))?.[0] ?? "22"
  return KOORDINATSYSTEM_KODER.has(candidate as KoordinatSystemKode)
    ? (candidate as KoordinatSystemKode)
    : "22"
}

function normalizeKoordinat(value: unknown) {
  const source = optionalObject(value)
  if (!source) return undefined
  return { nord: optionalNumber(source.nord), ost: optionalNumber(source.ost) }
}

function allAktuelleEiere(endring: JsonObject, detaljer: unknown[]): unknown[] {
  return [
    ...arrayValue(endring.hjemmelshavere),
    ...arrayValue(endring.kontaktpersoner),
    ...detaljer.flatMap((detalj) => {
      const source = optionalObject(detalj)
      return [
        ...arrayValue(source?.hjemmelshavere),
        ...arrayValue(source?.kontaktpersoner),
      ]
    }),
  ]
}

function normalizeAktuellEier(
  source: JsonObject,
): ContractEndring["aktuelleEiere"][number] {
  const identifikasjonsNr = optionalString(
    source.identifikasjonsNr ?? source.eierIdent,
  )
  const andelTeller = optionalNumber(source.andelTeller)
  const andelNevner = optionalNumber(source.andelNevner)

  return {
    bruksenhetsNr: optionalString(source.bruksenhetsNr ?? source.bruksenhetsnr),
    eierforholdKode: normalizeEierforholdKode(
      source.eierforholdKode ?? source.eierforhold,
    ),
    identifikasjonsNr,
    erAvdoed:
      booleanValue(source.erAvdoed) ||
      stringValue(source.statuskode, "")
        .toLocaleLowerCase("nb")
        .includes("død"),
    navn: optionalString(source.navn),
    adresse: formatLegacyAdresse(source),
    andel:
      andelTeller !== undefined && andelNevner !== undefined
        ? `${andelTeller}/${andelNevner}`
        : optionalString(source.andel),
  }
}

function normalizeTiltakshaver(
  tiltakshaver: JsonObject,
): ContractEndring["tiltaksHavere"][number] {
  return {
    bruksenhetsNr: optionalString(
      tiltakshaver.bruksenhetsNr ?? tiltakshaver.bruksenhetsnr,
    ),
    kontaktPersonKode: normalizeKontaktPersonKode(
      tiltakshaver.kontaktPersonKode ??
        tiltakshaver.kontaktpersonKode ??
        tiltakshaver.rolle,
    ),
    identifikasjonsNr: optionalString(
      tiltakshaver.identifikasjonsNr ?? tiltakshaver.eierIdent,
    ),
    navn: optionalString(tiltakshaver.navn),
    adresse: formatLegacyAdresse(tiltakshaver),
  }
}

function normalizeEierforholdKode(value: unknown): EierforholdKode {
  const candidate =
    typeof value === "number" ? String(value) : optionalString(value)
  const normalizedKode = candidate?.toUpperCase()
  if (
    normalizedKode &&
    EIERFORHOLD_KODER.has(normalizedKode as EierforholdKode)
  ) {
    return normalizedKode as EierforholdKode
  }

  return EIERFORHOLD_MAP[candidate?.toLocaleLowerCase("nb") ?? ""] ?? "H"
}

function normalizeEtasjeplanKode(value: unknown): EtasjeplanKode {
  const candidate =
    typeof value === "number" ? String(value) : optionalString(value)
  const normalizedKode = candidate?.toUpperCase()
  if (normalizedKode && [" ", "H", "K", "L", "U"].includes(normalizedKode)) {
    return normalizedKode as EtasjeplanKode
  }

  return ETASJEPLAN_MAP[candidate?.toLocaleLowerCase("nb") ?? ""] ?? " "
}

function normalizeBruksenhetsTypeKode(value: unknown): BruksenhetsTypeKode {
  const candidate = optionalString(value)
  const normalizedKode = candidate?.toUpperCase()
  if (
    normalizedKode &&
    ["B", "I", "F", "A", "U", "X"].includes(normalizedKode)
  ) {
    return normalizedKode as BruksenhetsTypeKode
  }

  return BRUKSENHET_TYPE_KODER[candidate?.toLocaleLowerCase("nb") ?? ""] ?? "X"
}

function normalizeKontaktPersonKode(value: unknown): KontaktPersonKode {
  const candidate = optionalString(value)
  const normalizedKode = candidate?.toUpperCase()
  if (normalizedKode === "K" || normalizedKode === "T") {
    return normalizedKode
  }

  const normalized = candidate?.toLocaleLowerCase("nb") ?? ""
  return normalized === "2" || normalized === "kontaktperson" ? "K" : "T"
}

function normalizeNaringsgruppeKode(
  value: unknown,
): NaringsgruppeKode | undefined {
  const candidate = optionalString(value)
  if (!candidate) return undefined
  const normalizedKode = candidate.toUpperCase()
  if (NAERINGSGRUPPE_KODER.has(normalizedKode as NaringsgruppeKode)) {
    return normalizedKode as NaringsgruppeKode
  }

  return NAERINGSGRUPPE_MAP[candidate.toLocaleLowerCase("nb")] ?? "-"
}

function formatLegacyAdresse(source: JsonObject): string | undefined {
  const postnummer = optionalString(
    source.postnummer ?? source.postnummeromradenr,
  )
  const poststed = optionalString(
    source.poststed ?? source.postnummeromradenavn,
  )
  const postlinje = [postnummer, poststed]
    .filter((part): part is string => part !== undefined && part.length > 0)
    .join(" ")

  const lines = [
    source.adresse,
    source.adresselinje1,
    source.adresselinje2,
    source.adresselinje3,
    postlinje,
  ].filter(
    (line): line is string => typeof line === "string" && line.length > 0,
  )
  return lines.length > 0 ? lines.join(", ") : undefined
}

function normalizeMatrikkelNr(
  value: unknown,
  kommuneNr: string,
  fallback?: string,
): string {
  const current = optionalString(value)
  if (current) {
    const normalized = current.replaceAll(" ", "")
    const separatorIndex = normalized.indexOf("-")
    const prefixedKommuneNr =
      separatorIndex > 0 ? normalized.slice(0, separatorIndex) : undefined
    const parts = (
      separatorIndex > 0 ? normalized.slice(separatorIndex + 1) : normalized
    ).split("/")

    const slashPrefixedKommuneNr =
      prefixedKommuneNr === undefined &&
      (/^\d{4}$/.test(parts[0] ?? "") || parts.length === 5)
        ? parts.shift()
        : undefined

    while (parts.length < 4) parts.push("0")
    return `${prefixedKommuneNr ?? slashPrefixedKommuneNr ?? kommuneNr}-${parts
      .slice(0, 4)
      .join("/")}`
  }

  const source = optionalObject(value)
  if (!source) return fallback ?? `${kommuneNr}-0/0/0/0`
  const gnr = optionalNonNegativeInteger(source.gnr)
  const bnr = optionalNonNegativeInteger(source.bnr)
  if (gnr === undefined || bnr === undefined) {
    return fallback ?? `${kommuneNr}-0/0/0/0`
  }

  const sourceKommuneNr =
    optionalString(source.kommuneNr ?? source.kommunenr) ?? kommuneNr
  return `${sourceKommuneNr}-${[
    gnr,
    bnr,
    optionalNonNegativeInteger(source.fnr) ?? 0,
    optionalNonNegativeInteger(source.snr) ?? 0,
  ].join("/")}`
}

function normalizeKitchenAccess(
  value: unknown,
  legacyValue: unknown,
): KjokkenTilgangKode {
  const rawValue = value ?? legacyValue
  if (typeof rawValue === "boolean") return rawValue ? "1" : "2"

  const candidate = optionalString(rawValue)
  if (candidate && ["1", "2", "3", "9", " "].includes(candidate)) {
    return candidate as KjokkenTilgangKode
  }
  if (candidate === "4") return "9"

  const normalized = candidate?.toLocaleLowerCase("nb") ?? ""
  if (normalized.startsWith("ja") || normalized.includes("eget kjøkken")) {
    return "1"
  }
  if (normalized.includes("felles kjøkken")) return "3"
  if (normalized.startsWith("nei") || normalized.includes("ikke adgang")) {
    return "2"
  }
  if (normalized.includes("ukjent")) return "9"
  return " "
}

function normalizeRequiredIsoDatetime(value: unknown): string {
  return normalizeOptionalIsoDatetime(value) ?? new Date().toISOString()
}

function normalizeOptionalIsoDatetime(value: unknown): string | undefined {
  if (value == null || value === "") return undefined
  if (typeof value !== "string") {
    throw new TypeError(`Ugyldig dato: ${JSON.stringify(value)}`)
  }

  let candidate = value
  if (/^\d{4}-\d{2}-\d{2}$/.test(candidate)) candidate += "T00:00:00Z"

  const norwegianDate = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(candidate)
  if (norwegianDate) {
    const [, day, month, year] = norwegianDate
    candidate = `${year}-${month}-${day}T00:00:00Z`
  }

  const sosiDate = /^(\d{4})(\d{2})(\d{2})$/.exec(candidate)
  if (sosiDate) {
    const [, year, month, day] = sosiDate
    candidate = `${year}-${month}-${day}T00:00:00Z`
  }

  const parsed = new Date(candidate)
  if (Number.isNaN(parsed.valueOf())) {
    throw new TypeError(`Ugyldig dato i byggrapport: ${value}`)
  }
  return parsed.toISOString()
}

function asObject(value: unknown, name: string): JsonObject {
  const object = optionalObject(value)
  if (!object) throw new Error(`Forventet objekt for ${name}`)
  return object
}

function optionalObject(value: unknown): JsonObject | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as JsonObject)
    : undefined
}

function arrayValue(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.length > 0 ? value : fallback
}

function optionalString(value: unknown): string | undefined {
  if (typeof value === "number") return String(value)
  return typeof value === "string" && value.length > 0 ? value : undefined
}

function booleanValue(value: unknown): boolean {
  return value === true
}

function numberValue(value: unknown, fallback = 0): number {
  const number = typeof value === "number" ? value : Number(value)
  return Number.isFinite(number) ? number : fallback
}

function optionalNumber(value: unknown): number | undefined {
  if (value == null || value === "") return undefined
  const number = numberValue(value, Number.NaN)
  return Number.isFinite(number) ? number : undefined
}

function nonNegativeNumber(value: unknown): number {
  return Math.max(0, numberValue(value))
}

function nonNegativeInteger(value: unknown): number {
  return Math.max(0, Math.trunc(numberValue(value)))
}

function optionalNonNegativeInteger(value: unknown): number | undefined {
  const number = optionalNumber(value)
  return number === undefined ? undefined : Math.max(0, Math.trunc(number))
}
