import {z} from "zod";


const rapportSchema = z.object({
    reportType: z.enum(["bygg", "matrikkelenhet-massiv"]),
    title: z.string().min(1, "Title is required"),
    kommune: z.string().min(1, "Kommune is required"),
    locale: z.enum(["nb", "nn"]),
})


export function validateRapportData(data: unknown) {
    const result = rapportSchema.safeParse(data);
    if (!result.success) {
        return { valid: false, errors: result.error.flatten().fieldErrors };
    }
    return { valid: true, data: result.data };
}