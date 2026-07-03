import { z } from "zod";
import {
    byggRapportSchema,
} from "./schema/byggRapportSchema";

const invalid = (error: z.ZodError) => ({
    valid: false as const,
    errors: z.flattenError(error).fieldErrors,
});

export function validateByggRapport(
    data: unknown,
) {
    const result = byggRapportSchema.safeParse(data);
    return result.success ? { valid: true, data: result.data } : invalid(result.error);
}