import { Heading, Paragraph } from "@kv-designsystem/react"
import type { i18n as I18n, TFunction } from "i18next"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import EndringsTabell, {
  type EndringsGruppe,
  type EndringsRad,
} from "../components/EndringsTabell.tsx"
import { Section } from "../components/Section.tsx"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { BygningsEndring } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatArea } from "../lib/utils/formatArea"
import { formatDate } from "../lib/utils/formatDate"
import { formaterBygningstype } from "../lib/utils/formaterBygningstype.ts"

const BE = "rapport.BYG0011.byggEndringer" as const
const ET = "rapport.BYG0011.etasjer" as const

type Props = {
  index: number
  bygning: Bygning
}

type Endring = NonNullable<BygningsEndring>

interface Kategori {
  key: string
  tittel: string
  kolonner: string[]
  grupper: EndringsGruppe[]
}

/**
 * En kategori som viser én rad per endring. `felter` er i18n-stier
 * relativt til `BE` og bestemmer kolonneoverskrifter og -rekkefølge.
 * `celler` må returnere verdier i samme rekkefølge som `felter`.
 */
interface Gruppe {
  felter: readonly string[]
  celler: (e: Endring, t: TFunction, i18n: I18n) => ReactNode[]
}

const kortDato = { dateStyle: "short" } as const

const grupper = {
  byggMetaEndring: {
    felter: [
      "byggMetaEndring.endringsKode",
      "byggMetaEndring.bygningsType",
      "byggMetaEndring.naeringsgruppe",
      "byggMetaEndring.antallBoenheter",
      "sefrakId",
      "harKulturminne",
    ],
    celler: (e, t) => {
      const m = e.byggMetaEndring
      return [
        m?.endringsKode
          ? oversettKode({ t, kodeverk: "endring", kode: m.endringsKode })
          : null,
        formaterBygningstype(t, m?.bygningsType),
        m?.naeringsgruppe ?? null,
        m?.antallBoenheter === undefined ? null : String(m.antallBoenheter),
        e.sefrakId ?? null,
        e.harKulturminne === undefined
          ? null
          : t(`${BE}.${e.harKulturminne ? "ja" : "nei"}` as const),
      ]
    },
  },
  byggKoordinatEndring: {
    felter: ["byggKoordinatEndring.nord", "byggKoordinatEndring.ost"],
    celler: (e, _t, i18n) => {
      const fmt = new Intl.NumberFormat(i18n.language)
      const k = e.byggKoordinatEndring
      return [
        k?.nord === undefined ? null : fmt.format(k.nord),
        k?.ost === undefined ? null : fmt.format(k.ost),
      ]
    },
  },
  byggDatoEndring: {
    felter: [
      "byggDatoEndring.rammetillatelse",
      "byggDatoEndring.igangsettingstillatelse",
      "byggDatoEndring.midlertidigBrukstillatelse",
      "byggDatoEndring.ferdigattest",
      "byggDatoEndring.tattIBruk",
      "byggDatoEndring.utgaattRevet",
    ],
    celler: (e, _t, i18n) => {
      const d = e.byggDatoEndring
      return [
        formatDate(i18n, d?.rammetillatelse, "", kortDato),
        formatDate(i18n, d?.igangsettingstillatelse, "", kortDato),
        formatDate(i18n, d?.midlertidigBrukstillatelse, "", kortDato),
        formatDate(i18n, d?.ferdigattest, "", kortDato),
        formatDate(i18n, d?.tattIBruk, "", kortDato),
        formatDate(i18n, d?.utgaattRevet, "", kortDato),
      ]
    },
  },
  aktor: {
    felter: [
      "aktor.navn",
      "aktor.identifikasjonsNr",
      "aktor.andel",
      "aktor.adresse",
    ],
    celler: (e) => {
      const a = e.aktor
      return [
        a?.navn ?? null,
        a?.identifikasjonsNr ?? null,
        a?.andel ?? null,
        a?.adresse ?? null,
      ]
    },
  },
  tiltaksHaver: {
    felter: [
      "tiltaksHaver.kontaktPersonKode",
      "tiltaksHaver.navn",
      "tiltaksHaver.identifikasjonsNr",
      "tiltaksHaver.adresse",
    ],
    celler: (e, t) => {
      const th = e.tiltaksHaver
      return [
        th?.kontaktPersonKode === undefined
          ? null
          : oversettKode({
              t,
              kodeverk: "kontaktperson",
              kode: th.kontaktPersonKode,
            }),
        th?.navn ?? null,
        th?.identifikasjonsNr ?? null,
        th?.adresse ?? null,
      ]
    },
  },
} as const satisfies Record<string, Gruppe>

function lagKategori(
  key: keyof typeof grupper,
  endringer: Endring[],
  t: TFunction,
  i18n: I18n,
): Kategori {
  const g: Gruppe = grupper[key]
  const tr = t as (path: string) => string
  const kolonner = g.felter.map((f) => tr(`${BE}.${f}`))
  const endringsGrupper = endringer.flatMap<EndringsGruppe>((e) => {
    const celler = g.celler(e, t, i18n)
    if (!celler.some((v) => v !== null && v !== undefined && v !== "")) {
      return []
    }
    return [
      {
        key: String(e.lopeNr),
        header: `${tr(`${BE}.lopeNr`)} ${e.lopeNr}`,
        rader: [{ key: String(e.lopeNr), celler }],
      },
    ]
  })
  return {
    key,
    tittel: tr(`${BE}.${key}.tittel`),
    kolonner,
    grupper: endringsGrupper,
  }
}

/**
 * Sammenslått areal-tabell per endring:
 *   - én rad per etasje (BRA og BTA på samme rad)
 *   - én sum-rad per endring (summert på tvers av etasjer + BYA fra byggArealEndring)
 */
function lagArealer(endringer: Endring[], t: TFunction): Kategori {
  const tr = t as (path: string) => string
  const a = `${BE}.areal` as const

  const kolonner = [
    tr(`${ET}.title`),
    tr(`${ET}.antallBoenheter`),
    tr(`${a}.boligBra`),
    tr(`${a}.annetBra`),
    tr(`${a}.sumBra`),
    tr(`${a}.boligBta`),
    tr(`${a}.annetBta`),
    tr(`${a}.sumBta`),
    tr(`${a}.bya`),
  ]

  const sumTall = (values: (number | undefined)[]): number | undefined => {
    const definerte = values.filter((v) => v !== undefined)
    return definerte.length === 0
      ? undefined
      : definerte.reduce((x, y) => x + y, 0)
  }

  const endringsGrupper = endringer.flatMap<EndringsGruppe>((e) => {
    const eLabel = `${tr(`${BE}.lopeNr`)} ${e.lopeNr}`
    const etasjer = e.etasjePlan.filter((et) => et !== undefined)
    const bya = e.byggArealEndring?.bebygdAreal

    if (etasjer.length === 0 && bya === undefined) return []

    const etasjeRader: EndringsRad[] = etasjer.map((et) => ({
      key: `${e.lopeNr}-${et.etasje}-${et.etasjeplan}`,
      celler: [
        `${String(et.etasje).padStart(2, "0")} ${et.etasjeplan ?? ""}`,
        et.antallBoenheter === undefined ? null : String(et.antallBoenheter),
        formatArea(et.bruksareal.boligAreal),
        formatArea(et.bruksareal.annetAreal),
        formatArea(et.bruksareal.totaltAreal),
        formatArea(et.bruttoareal.boligAreal),
        formatArea(et.bruttoareal.annetAreal),
        formatArea(et.bruttoareal.totaltAreal),
        null,
      ],
    }))

    const boenSum = sumTall(etasjer.map((et) => et.antallBoenheter))
    const sumCeller: ReactNode[] = [
      etasjer.length === 0 ? null : String(etasjer.length),
      boenSum === undefined ? null : String(boenSum),
      formatArea(sumTall(etasjer.map((et) => et.bruksareal.boligAreal))),
      formatArea(sumTall(etasjer.map((et) => et.bruksareal.annetAreal))),
      formatArea(sumTall(etasjer.map((et) => et.bruksareal.totaltAreal))),
      formatArea(sumTall(etasjer.map((et) => et.bruttoareal.boligAreal))),
      formatArea(sumTall(etasjer.map((et) => et.bruttoareal.annetAreal))),
      formatArea(sumTall(etasjer.map((et) => et.bruttoareal.totaltAreal))),
      formatArea(bya),
    ]

    // Uten etasjer: én rad med alt under "Endring X" — ingen egen sumRad
    if (etasjeRader.length === 0) {
      return [
        {
          key: String(e.lopeNr),
          header: eLabel,
          rader: [{ key: `${e.lopeNr}-sum`, celler: sumCeller }],
        },
      ]
    }

    return [
      {
        key: String(e.lopeNr),
        header: eLabel,
        rader: etasjeRader,
        sumRad: {
          key: `${e.lopeNr}-sum`,
          header: tr(`${a}.sum`),
          celler: sumCeller,
        },
      },
    ]
  })

  return {
    key: "arealer",
    tittel: tr(`${a}.tittel`),
    kolonner,
    grupper: endringsGrupper,
  }
}

export default function ByggEndringer({ index, bygning }: Props) {
  const { i18n, t } = useTranslation()

  const endringer = bygning.endringer
    .filter((e) => e !== undefined)
    .toSorted((a, b) => a.lopeNr - b.lopeNr)

  // Rekkefølge følger schema; arealer slår sammen etasjer + arealendring per endring.
  const kategorier: Kategori[] = [
    lagKategori("byggMetaEndring", endringer, t, i18n),
    lagArealer(endringer, t),
    lagKategori("byggKoordinatEndring", endringer, t, i18n),
    lagKategori("byggDatoEndring", endringer, t, i18n),
    lagKategori("aktor", endringer, t, i18n),
    lagKategori("tiltaksHaver", endringer, t, i18n),
  ].filter((k) => k.grupper.length > 0)

  return (
    <Section index={index} title={t(`${BE}.tittel`)}>
      <Heading level={3} className="bg-kv-green-subtle p-2">
        {t(`${BE}.bygningsnr`, { bygningsnr: bygning.bygningsnr })}
      </Heading>

      {kategorier.length === 0 ? (
        <Paragraph className="text-kv-subtle">
          {t(`${BE}.ingenEndringer`)}
        </Paragraph>
      ) : (
        <div className="flex flex-col gap-8">
          {kategorier.map((kategori) => (
            <div key={kategori.key} className="my-4 space-y-4">
              <span className="flex items-center gap-4">
                <Heading
                  level={3}
                  data-size="sm"
                  className="min-w-max font-medium"
                >
                  {kategori.tittel}
                </Heading>
                <hr className="w-full border border-kv-green-border" />
              </span>
              <EndringsTabell
                kolonner={kategori.kolonner}
                grupper={kategori.grupper}
              />
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
