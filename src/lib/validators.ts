import { z } from "zod";
import {
    byggRapportBaseSchema,
    byggRapportSchema,
} from "./schema/byggRapportSchema";



function flattenErrors(error: z.ZodError) {
    return z.flattenError(error).fieldErrors;
}

export function validateByggRapport(
    data: unknown,
) {
    const baseResult = byggRapportBaseSchema.safeParse(data);
    if (!baseResult.success) {
        return { valid: false, errors: flattenErrors(baseResult.error) };
    }

    const result = byggRapportSchema.safeParse(data);
    if (!result.success) {
        return { valid: false, errors: flattenErrors(result.error) };
    }
    return { valid: true, data: result.data };
}