import { z } from "zod";
import {
    byggRapportBaseSchema,
    byggRapportSchema,
} from "./schema/byggRapportSchema";


export function validateByggRapport(
    data: unknown,
) {
    const baseResult = byggRapportBaseSchema.safeParse(data);
    if (!baseResult.success) {
        return { valid: false, errors: z.flattenError(baseResult.error).fieldErrors };
    }

    const result = byggRapportSchema.safeParse(data);
    if (!result.success) {
        return { valid: false, errors: z.flattenError(result.error).fieldErrors };
    }
    return { valid: true, data: result.data };
}