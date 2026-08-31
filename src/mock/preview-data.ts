import { createBygg32341Report } from "./reports/bygg/fixtures/bygg-32-341"
import { createBygg42221Report } from "./reports/bygg/fixtures/bygg-42-221"
import { createBygg1098Report } from "./reports/bygg/fixtures/bygg-109-8"
import { createByggSlottsplassen1Report } from "./reports/bygg/fixtures/bygg-slottsplassen-1"
import { createByggStasjonsveien1Report } from "./reports/bygg/fixtures/bygg-stasjonsveien-1"
import { normalizeByggRapport } from "./reports/bygg/normalize-bygg-report"
import type { NormalizedByggRapport } from "./types"

export interface MockServerPreviewCase {
  testCase: string
  name: string
}

export interface MockServerPreviewResult extends MockServerPreviewCase {
  report: {
    rapportKode?: string
    [key: string]: unknown
  }
}

interface CaseDefinition extends MockServerPreviewCase {
  load: () => unknown
}

const testCaseAliases: Record<string, string> = {
  standard: "bygg-32-341",
  full: "bygg-alle-kriterier",
}

// Holdes stabil for deterministiske snapshot-tester.
const PREVIEW_GENERERT_TIDSPUNKT = "2026-08-18T00:00:00.000Z"

/**
 * Kombinerer alle 5 fixtures til en aggregert rapport.
 * Brukes til: Oversikt over all testdata på en gang.
 */
function createByggUtvalgReport(): NormalizedByggRapport {
  const reports = [
    createBygg32341Report(),
    createBygg42221Report(),
    createByggStasjonsveien1Report(),
    createByggSlottsplassen1Report(),
    createBygg1098Report(),
  ].map((report) => normalizeByggRapport(report))

  const [baseReport, ...restReports] = reports

  return {
    ...baseReport,
    metadata: {
      ...baseReport.metadata,
      generertTidspunkt: PREVIEW_GENERERT_TIDSPUNKT,
    },
    bygninger: [
      ...(baseReport.bygninger ?? []),
      ...restReports.flatMap((report) => report.bygninger ?? []),
    ],
  }
}

/**
 * Variant med alle utvalgskriterier utfylt.
 * Brukes til: visuell QA av utvalgskriterier-seksjonen.
 */
function createByggAlleKriterierReport() {
  const report = createBygg32341Report()

  return {
    ...report,
    metadata: {
      ...report.metadata,
      generertTidspunkt: PREVIEW_GENERERT_TIDSPUNKT,
    },
    utvalgskriterier: {
      omfang: {
        inkluderBestaaendeBygg: true,
        inkluderUtgaatteBygg: true,
        inkluderBygninger: true,
        inkluderBygningsendringer: true,
        inkluderFrededeBygninger: true,
      },
      bygning: {
        bygningsNr: "80087713",
        bygningstyper: ["111", "121"],
        lopeNr: 1,
      },
      adresse: {
        adresseKode: "12574",
        adresseNavn: "Hagan terrasse",
        adresseNr: 15,
        adresseBokstav: "B",
        adresseTilleggsNavn: "Hagan",
        bruksenhetsNr: "H0101",
        utenBokstav: false,
      },
      matrikkelenhet: {
        gnr: "32",
        bnr: "341",
        fnr: 0,
        snr: 2,
      },
      aktor: {
        identifikasjonsNr: "148560",
        etternavn: "EKSPEDISJON PATENT",
        fornavn: "ANNA",
      },
      bygningsstatus: {
        naavaerende: ["TB", "IG"],
        tidligere: ["RA", "MB"],
        periodeFra: "2004-01-01T00:00:00Z",
        periodeTil: "2026-12-31T00:00:00Z",
      },
      sokevindu: {
        nord: 6646000,
        ost: 593560,
        vest: 593480,
        syd: 6645940,
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
  }
}

/**
 * Demonstrerer et enkelt leilighetsbygg med grunndata.
 * Brukes til: UI-testing av eneboliger, grunnleggende rendering.
 */
const case1 = {
  testCase: "bygg-32-341" as const,
  name: "Eneboliger - Hagan terrasse 15B",
  description: "Enkel boligbygning med 4 varianter",
  load: createBygg32341Report,
}

/**
 * Demonstrerer et større anlegg med kompleks struktur.
 * Brukes til: Testing av multippel eierskap, juridisk struktur.
 */
const case2 = {
  testCase: "bygg-42-221" as const,
  name: "Stort anlegg - Rikshospitalet",
  description: "Kompleks institusjonell bygning med mange enheter",
  load: createBygg42221Report,
}

/**
 * Demonstrerer en skole med tilhørende garasjer.
 * Brukes til: Testing av kombinert bruksformål.
 */
const case3 = {
  testCase: "bygg-stasjonsveien-1" as const,
  name: "Skole og garasjer - Stasjonsveien 1",
  description: "Multi-funksjonell bygning",
  load: createByggStasjonsveien1Report,
}

/**
 * Demonstrerer en historisk bygning med bevaringsstatus.
 * Brukes til: Testing av kulturminne-felter, historisk kontekst.
 */
const case4 = {
  testCase: "bygg-slottsplassen-1" as const,
  name: "Historisk bygg - Slottet",
  description: "Bygning med vernestatus og kulturhistorisk betydning",
  load: createByggSlottsplassen1Report,
}

/**
 * Demonstrerer en bygning under konstruksjon.
 * Brukes til: Testing av bygging-i-arbeid status, foreløpige data.
 */
const case5 = {
  testCase: "bygg-109-8" as const,
  name: "Bygg i arbeid - 109/8",
  description: "Bygning under oppføring med midlertidig status",
  load: createBygg1098Report,
}

/**
 * Kombinerer alle 5 testcaser til en aggregert rapport.
 * Brukes til: Visning av all testdata på en side, skalabilitetstesting.
 */
const case6 = {
  testCase: "bygg-alle-5" as const,
  name: "Oversikt - alle 5 bygg",
  description: "Aggregert rapport med alle testcaser",
  load: createByggUtvalgReport,
}

/**
 * Demonstrerer BYG0011 med alle utvalgskriterier satt.
 * Brukes til: verifisere tett/kant-til-kant visning av kriteriefelt.
 */
const case7 = {
  testCase: "bygg-alle-kriterier" as const,
  name: "Utvalgskriterier - alle felt utfylt",
  description: "Scenario med fullt utfylte kriterier",
  load: createByggAlleKriterierReport,
}

const caseDefinitions: CaseDefinition[] = [
  case1,
  case2,
  case3,
  case4,
  case5,
  case6,
  case7,
]

function normalizeCaseName(value: string) {
  return value.trim().toLowerCase()
}

function resolveCaseName(value: string) {
  const normalized = normalizeCaseName(value)
  return testCaseAliases[normalized] ?? normalized
}

/**
 * Internal preview API for BYG0011 reports.
 * Lists all available test cases.
 *
 * @internal BYG0011-specific. Will need refactoring when multi-rapport support is added.
 */
export function listPreviewCases(): MockServerPreviewCase[] {
  return caseDefinitions.map(({ testCase, name }) => ({ testCase, name }))
}

/**
 * Internal preview API for BYG0011 reports.
 * Loads a test case, normalizes it against the BYG0011 schema, and returns the result.
 *
 * @internal BYG0011-specific. Will need refactoring when multi-rapport support is added.
 */
export async function getPreviewCaseData(testCase: string) {
  const resolved = resolveCaseName(testCase)
  const definition = caseDefinitions.find(
    (item) => normalizeCaseName(item.testCase) === resolved,
  )

  if (!definition) {
    return null
  }

  const data = await definition.load()

  return {
    testCase: definition.testCase,
    name: definition.name,
    report: normalizeByggRapport(data),
  }
}
