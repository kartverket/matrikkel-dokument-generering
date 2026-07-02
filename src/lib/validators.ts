import { z } from "zod";
import type { ByggRapport } from "./schema/byggRapportSchema";
import { byggRapportSchema } from "./schema/byggRapportSchema";

type ValidateByggRapportResult =
    | { valid: true; data: ByggRapport }
    | {
        valid: false;
        errors: z.core.$ZodFlattenedError<ByggRapport>["fieldErrors"];
    };

export function validateByggRapport(data: unknown): ValidateByggRapportResult {
    const result = byggRapportSchema.safeParse(data);
    if (!result.success) {
        return { valid: false, errors: z.flattenError(result.error).fieldErrors };
    }
    return { valid: true, data: result.data };
}