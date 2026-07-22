import { Heading, Paragraph } from "@kv-designsystem/react"
import type { i18n as I18n, TFunction } from "i18next"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import EndringsTabell, {
  type EndringsRad,
} from "../components/EndringsTabell.tsx"
import { Section } from "../components/Section.tsx"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { BygningsEndring } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { arealLinje, formatArea } from "../lib/utils/formatArea"
import { formatDate } from "../lib/utils/formatDate"
import { formaterBygningstype } from "../lib/utils/formaterBygningstype.ts"

const BE = "rapport.BYG0011.byggEndringer" as const

type Props = {
  index: number
  bygning: Bygning
}

type Endring = NonNullable<BygningsEndring>

interface Kategori {
  key: string
  tittel: string
  kolonner: string[]
  rader: EndringsRad[]
}

/**
 * En kategori som viser én rad per endring. Nøkkelen matcher et
 * feltnavn i byggEndringSchema (f.eks. "byggMetaEndring"), og
 * `felter` peker på underfelt i samme gruppe. `ekstraFelter` peker
 * på felt på rot-nivå i byggEndringer-namespacet (f.eks. "sefrakId").
 */
interface Gruppe {
  felter: readonly string[]
  ekstraFelter?: readonly string[]
  celler: (e: Endring, t: TFunction, i18n: I18n) => ReactNode[]
}

const harData = (celler: readonly ReactNode[]) =>
  celler.some((v) => v !== null && v !== undefined && v !== "")

const endringLabel = (t: TFunction, lopeNr: number) =>
  `${t(`${BE}.lopeNr`)} ${lopeNr}`

const jaNei = (t: TFunction, v: boolean | undefined) =>
  v === undefined ? null : t(`${BE}.${v ? "ja" : "nei"}` as const)

const formatNum = (i18n: I18n, n: number | undefined) =>
  n === undefined ? null : new Intl.NumberFormat(i18n.language).format(n)

const formatKortDato = (i18n: I18n, d: string | undefined) =>
  d === undefined ? null : formatDate(i18n, d, "", { dateStyle: "short" })

const grupper = {
  byggMetaEndring: {
    felter: [
      "endringsKode",
      "bygningsType",
      "naeringsgruppe",
      "antallBoenheter",
    ],
    ekstraFelter: ["sefrakId", "harKulturminne"],
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
        jaNei(t, e.harKulturminne),
      ]
    },
  },
  byggArealEndring: {
    felter: ["bruksarealBolig", "bruttoarealBolig", "bebygdAreal"],
    celler: (e) => {
      const a = e.byggArealEndring
      return [
        arealLinje(a?.bruksarealBolig),
        arealLinje(a?.bruttoarealBolig),
        formatArea(a?.bebygdAreal),
      ]
    },
  },
  byggKoordinatEndring: {
    felter: ["nord", "ost"],
    celler: (e, _t, i18n) => [
      formatNum(i18n, e.byggKoordinatEndring?.nord),
      formatNum(i18n, e.byggKoordinatEndring?.ost),
    ],
  },
  byggDatoEndring: {
    felter: [
      "rammetillatelse",
      "igangsettingstillatelse",
      "midlertidigBrukstillatelse",
      "ferdigattest",
      "tattIBruk",
      "utgaattRevet",
    ],
    celler: (e, _t, i18n) => {
      const d = e.byggDatoEndring
      return [
        formatKortDato(i18n, d?.rammetillatelse),
        formatKortDato(i18n, d?.igangsettingstillatelse),
        formatKortDato(i18n, d?.midlertidigBrukstillatelse),
        formatKortDato(i18n, d?.ferdigattest),
        formatKortDato(i18n, d?.tattIBruk),
        formatKortDato(i18n, d?.utgaattRevet),
      ]
    },
  },
  aktoer: {
    felter: ["navn", "identifikasjonsNr", "andel", "adresse"],
    celler: (e) => {
      const a = e.aktoer
      return [
        a?.navn ?? null,
        a?.identifikasjonsNr ?? null,
        a?.andel ?? null,
        a?.adresse ?? null,
      ]
    },
  },
  tiltaksHaver: {
    felter: ["kontaktPersonKode", "navn", "identifikasjonsNr", "adresse"],
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
  const kolonner = [
    ...g.felter.map((f) => tr(`${BE}.${key}.${f}`)),
    ...(g.ekstraFelter ?? []).map((f) => tr(`${BE}.${f}`)),
  ]
  const rader = endringer.flatMap<EndringsRad>((e) => {
    const celler = g.celler(e, t, i18n)
    return harData(celler)
      ? [{ key: String(e.lopeNr), header: endringLabel(t, e.lopeNr), celler }]
      : []
  })
  return { key, tittel: tr(`${BE}.${key}.tittel`), kolonner, rader }
}

/** Etasjeplan er en liste — én rad per etasje per endring. */
function lagEtasjePlan(endringer: Endring[], t: TFunction): Kategori {
  const p = `${BE}.etasjePlan` as const
  const kolonner = [
    t(`${p}.etasjeplan`),
    t(`${p}.etasje`),
    t(`${p}.antallBoenheter`),
    t(`${p}.bruksareal.boligAreal`),
    t(`${p}.bruksareal.annetAreal`),
    t(`${p}.bruksareal.totaltAreal`),
    t(`${p}.bruttoareal.boligAreal`),
    t(`${p}.bruttoareal.annetAreal`),
    t(`${p}.bruttoareal.totaltAreal`),
  ]
  const rader = endringer.flatMap<EndringsRad>((e) =>
    e.etasjePlan
      .filter((et) => et !== undefined)
      .flatMap<EndringsRad>((et) => {
        const celler: ReactNode[] = [
          et.etasjeplan,
          String(et.etasje),
          et.antallBoenheter === undefined ? null : String(et.antallBoenheter),
          formatArea(et.bruksareal.boligAreal),
          formatArea(et.bruksareal.annetAreal),
          formatArea(et.bruksareal.totaltAreal),
          formatArea(et.bruttoareal.boligAreal),
          formatArea(et.bruttoareal.annetAreal),
          formatArea(et.bruttoareal.totaltAreal),
        ]
        return harData(celler)
          ? [
              {
                key: `${e.lopeNr}-${et.etasjeplan}-${et.etasje}`,
                header: endringLabel(t, e.lopeNr),
                celler,
              },
            ]
          : []
      }),
  )
  return { key: "etasjePlan", tittel: t(`${p}.tittel`), kolonner, rader }
}

export default function ByggEndringer({ index, bygning }: Props) {
  const { i18n, t } = useTranslation()

  const endringer = bygning.endringer
    .filter((e): e is Endring => e !== undefined)
    .toSorted((a, b) => a.lopeNr - b.lopeNr)

  // Rekkefølge følger schema; etasjePlan er egen fordi den lister rader per etasje.
  const kategorier: Kategori[] = [
    lagKategori("byggMetaEndring", endringer, t, i18n),
    lagKategori("byggArealEndring", endringer, t, i18n),
    lagEtasjePlan(endringer, t),
    lagKategori("byggKoordinatEndring", endringer, t, i18n),
    lagKategori("byggDatoEndring", endringer, t, i18n),
    lagKategori("aktoer", endringer, t, i18n),
    lagKategori("tiltaksHaver", endringer, t, i18n),
  ].filter((k) => k.rader.length > 0)

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
            <div key={kategori.key} className="space-y-4 my-4">
              <Heading
                level={3}
                data-size="sm"
                className="font-medium flex items-center gap-4"
              >
                {kategori.tittel}
                <hr className="border-kv-green-border w-full border" />
              </Heading>
              <EndringsTabell
                kolonner={kategori.kolonner}
                rader={kategori.rader}
              />
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
