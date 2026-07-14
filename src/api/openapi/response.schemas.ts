import { z } from "@hono/zod-openapi"

export const validationErrorResponseSchema = z
  .object({
    errors: z.object({
      valid: z.literal(false),
      errors: z.record(z.string(), z.array(z.string())),
    }),
  })
  .openapi("ValidationErrorResponse", {
    description:
      "Returneres når forespørselen ikke passerer validering. Feilene er gruppert etter feltnavn.",
  })

export const pdfErrorResponseSchema = z
  .object({
    error: z.string().openapi({ example: "PDF-generering feilet" }),
    details: z.string().openapi({ example: "Gotenberg svarte med 500: ..." }),
  })
  .openapi("PdfErrorResponse", {
    description: "Returneres når konvertering til PDF feiler.",
  })
