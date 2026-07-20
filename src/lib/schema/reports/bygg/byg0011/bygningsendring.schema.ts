import { z } from "@hono/zod-openapi"
import { arealFordelingSchema } from "./areal.schema"
import { bygningsetasjeSchema } from "./bygningsetasje.schema"
import { koordinatSchema } from "./koordinat.schema"
import { tiltakshaverSchema } from "./person.schema"

const valgfriDatoSchema = z.iso.datetime({ offset: true }).nullable().optional()

export const bygningsstatusSchema = z
  .object({
    kode: z.number().int().nonnegative(),
    kortkode: z.string().min(1),
    navn: z.string().min(1),
    bestaaende: z.boolean(),
  })
  .meta({ id: "BYG0011Bygningsstatus" })

export const bygningsdatoerSchema = z
  .object({
    rammetillatelse: valgfriDatoSchema,
    igangsettingstillatelse: valgfriDatoSchema,
    midlertidigBrukstillatelse: valgfriDatoSchema,
    ferdigattest: valgfriDatoSchema,
    tattIBruk: valgfriDatoSchema,
    utgaattRevet: valgfriDatoSchema,
  })
  .meta({ id: "BYG0011Bygningsdatoer" })

const kulturminneSchema = z
  .object({
    id: z.string().min(1),
    navn: z.string().min(1),
    status: z.string().min(1),
    kategori: z.string().min(1),
  })
  .meta({ id: "BYG0011Kulturminne" })

const bruksenhetReferanseSchema = z
  .object({
    bruksenhetsnr: z.string().min(1).nullable().optional(),
  })
  .meta({
    id: "BYG0011BruksenhetReferanse",
    description:
      "Referanse til en bruksenhet som berøres av en bygningsendring.",
  })

export const bygningsendringSchema = z
  .object({
    lopenr: z.number().int().nonnegative(),
    endringskode: z.string().nullable().optional(),
    beskrivelse: z.string().nullable().optional().default(null),
    bygningsstatus: bygningsstatusSchema,
    antallBoenheter: z.number().int().nonnegative(),
    bruksareal: arealFordelingSchema,
    bruttoareal: arealFordelingSchema,
    bebygdAreal: z.number().nonnegative(),
    koordinat: koordinatSchema,
    datoer: bygningsdatoerSchema,
    etasjeplan: z.array(bygningsetasjeSchema),
    bruksenheter: z.array(bruksenhetReferanseSchema),
    tiltakshavere: z.array(tiltakshaverSchema).optional().default([]),
    kulturminner: z.array(kulturminneSchema).optional().default([]),
  })
  .meta({ id: "BYG0011Bygningsendring" })

export type Bygningsstatus = z.infer<typeof bygningsstatusSchema>
export type Bygningsdatoer = z.infer<typeof bygningsdatoerSchema>
export type Bygningsendring = z.infer<typeof bygningsendringSchema>
