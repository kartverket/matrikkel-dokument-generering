import type { z } from "@hono/zod-openapi"

type ReportPayload = { rapportType: string }

type ReportCodeOf<TSchema extends z.ZodType<ReportPayload>> =
  z.output<TSchema>["rapportType"]

export interface AnyReportDefinition {
  readonly code: string
  readonly schema: z.ZodType<ReportPayload>
  render(input: unknown, css: string): string
}

export interface ReportDefinition<TSchema extends z.ZodType<ReportPayload>>
  extends AnyReportDefinition {
  readonly code: ReportCodeOf<TSchema>
  readonly schema: TSchema
}

interface DefineReportOptions<TSchema extends z.ZodType<ReportPayload>> {
  readonly code: ReportCodeOf<TSchema>
  readonly schema: TSchema
  readonly render: (data: z.output<TSchema>, css: string) => string
}

export function defineReport<const TSchema extends z.ZodType<ReportPayload>>(
  options: DefineReportOptions<TSchema>,
): ReportDefinition<TSchema> {
  return {
    code: options.code,
    schema: options.schema,
    render(input, css) {
      return options.render(options.schema.parse(input), css)
    },
  }
}
