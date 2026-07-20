import type { AnyReportDefinition } from "./define-report"

type NonEmptyDefinitions = readonly [
  AnyReportDefinition,
  ...AnyReportDefinition[],
]

type ReportCodeOf<TDefinitions extends NonEmptyDefinitions> =
  TDefinitions[number]["code"]

export class UnsupportedReportTypeError extends Error {
  readonly reportType: string

  constructor(reportType: string) {
    super(`Rapporttypen "${reportType}" støttes ikke.`)
    this.name = "UnsupportedReportTypeError"
    this.reportType = reportType
  }
}

export function createReportRegistry<
  const TDefinitions extends NonEmptyDefinitions,
>(definitions: TDefinitions) {
  const definitionsByCode = new Map<string, TDefinitions[number]>()

  for (const definition of definitions) {
    if (definitionsByCode.has(definition.code)) {
      throw new Error(
        `Rapporttypen "${definition.code}" er registrert mer enn én gang.`,
      )
    }

    definitionsByCode.set(definition.code, definition)
  }

  function has(reportType: string): reportType is ReportCodeOf<TDefinitions> {
    return definitionsByCode.has(reportType)
  }

  function get(reportType: string): TDefinitions[number] {
    const definition = definitionsByCode.get(reportType)

    if (!definition) {
      throw new UnsupportedReportTypeError(reportType)
    }

    return definition
  }

  function render(input: unknown, css: string): string {
    const reportType = readReportType(input)
    return get(reportType).render(input, css)
  }

  return { definitions, get, has, render } as const
}

function readReportType(input: unknown): string {
  if (
    typeof input !== "object" ||
    input === null ||
    !("rapportType" in input) ||
    typeof input.rapportType !== "string"
  ) {
    throw new UnsupportedReportTypeError("<mangler>")
  }

  return input.rapportType
}
