import { z } from "zod";

import { rapportSchema } from "./rapportSchema";


const utvalgskriterierSchema = z.object({
    bestaaendeBygg: z.boolean().optional().default(false),
    utgaatteBygg: z.boolean().optional().default(false),
    bygninger: z.boolean().optional().default(false),
    bygningsendringer: z.boolean().optional().default(false),
    frededeBygninger: z.array(z.string()).default([]),
    matrikkelenhet: z.object({
        gnr: z.number().optional(), 
        bnr: z.number().optional(),

    }),
    subrapporter: z.object({
        etasjer: z.boolean().optional().default(false),
        bruksenhet: z.boolean().optional().default(false),
        tiltakshavere: z.boolean().optional().default(false),
        kontaktpersoner: z.boolean().optional().default(false),
        hjemmelshavere: z.boolean().optional().default(false),
        kulturminner: z.boolean().optional().default(false),

    }),
})

const bygningerSchema = z.object({
    id: z.number(),
    bygningsnr: z.string().optional(),
    bygningstype: z.string().optional(),
    adresseverdig: z.boolean().optional().default(false),
    naeringsgruppe: z.string().optional(),
    matrikkelenhet: z.string().optional(),
    endringer: z.object({
        id: z.number(),
        bygningId: z.number(),
        lopenr: z.number(),
        endringskode: z.string(),
        bygningsstatus: z.string().optional(),
    })
    })

export type ByggRapport = z.infer<typeof byggRapportSchema>;
export const byggRapportSchema = rapportSchema.extend({
    utvalgskriterier: utvalgskriterierSchema,
    bygninger: bygningerSchema.array().optional().default([]),
    
})




