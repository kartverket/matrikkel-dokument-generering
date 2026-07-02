import { z } from "zod";
import type { ByggRapport } from "./schema/byggRapportSchema";
import {
    byggRapportBaseSchema,
    byggRapportSchema,
} from "./schema/byggRapportSchema";

type ValidationErrors = Record<string, string[] | undefined>;

type ValidateByggRapportResult =
    | { valid: true; data: ByggRapport }
    | {
        valid: false;
        errors: ValidationErrors;
    };

function flattenErrors(error: z.ZodError): ValidationErrors {
    return z.flattenError(error).fieldErrors as ValidationErrors;
}

export function validateByggRapport(
    data: unknown,
): ValidateByggRapportResult {
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