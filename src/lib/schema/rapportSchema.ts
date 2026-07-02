import { z } from "zod";


export const rapportSchema = z.object({
    reportType: z.enum(["bygg", "matrikkelenhet-massiv"]),
    tittel: z.string().min(1, "Title is required"),
    kommune: z.object({
        nr: z.string(),
        kommuneNummer: z.string()
    }),
    koordinatsystem: z.string(),
    locale: z.enum(["nb", "nn"]),
})