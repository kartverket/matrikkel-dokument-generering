import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import ArealTabell, { type ArealEndring } from "../components/ArealTabell.tsx"
import EndringsTabell from "../components/EndringsTabell.tsx"
import { Section } from "../components/Section.tsx"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

type Props = {
  index: number
  bygning: Bygning
}

export default function ByggEndringer({ index, bygning }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.byggEndringer" as const

  const endringer = bygning.endringer
    .filter((e) => e !== undefined)
    .toSorted((a, b) => a.lopeNr - b.lopeNr)

  // Enkeltfelt: én rad per endring (der feltet finnes)
  const metaEndringer = endringer
    .filter((e) => e.byggMetaEndring !== undefined)
    .map((e) => {
      const meta = e.byggMetaEndring
      return {
        lopeNr: e.lopeNr,
        ...meta,
        bygningsTypeKode: meta?.bygningsTypeKode
          ? t(`koder.bygningstype.${meta.bygningsTypeKode}`)
          : undefined,
        bygningsStatusKode: meta?.bygningsStatusKode
          ? t(`koder.bygningsstatus.${meta.bygningsStatusKode}`)
          : undefined,
        endringsKode: meta?.endringsKode
          ? t(`koder.endring.${meta.endringsKode}`)
          : undefined,
        naringsgruppeKode: meta?.naringsgruppeKode
          ? t(`koder.naringsgruppe.${meta.naringsgruppeKode}`)
          : undefined,
      }
    })

  // Areal + etasjeplan slås sammen til én gruppert tabell per endring
  const arealEndringer: ArealEndring[] = endringer
    .filter(
      (e) =>
        e.byggArealEndring !== undefined || (e.etasjePlan?.length ?? 0) > 0,
    )
    .map((e) => ({
      lopeNr: e.lopeNr,
      etasjeRader: (e.etasjePlan ?? [])
        .filter((ep) => ep !== undefined)
        .map((ep) => ({
          etasjeplan:
            ep.etasjeplanKode === undefined
              ? undefined
              : t(`koder.etasjeplan.${ep.etasjeplanKode}`),
          etasje: ep.etasje,
          antallBoenheter: ep.antallBoenheter,
          boligBra: ep.bruksareal?.boligAreal,
          annetBra: ep.bruksareal?.annetAreal,
          sumBra: ep.bruksareal?.totaltAreal,
          boligBta: ep.bruttoareal?.boligAreal,
          annetBta: ep.bruttoareal?.annetAreal,
          sumBta: ep.bruttoareal?.totaltAreal,
        })),
      sum: {
        antallBoenheter: e.byggMetaEndring?.antallBoenheter,
        boligBra: e.byggArealEndring?.bruksarealBolig?.boligAreal,
        annetBra: e.byggArealEndring?.bruksarealBolig?.annetAreal,
        sumBra: e.byggArealEndring?.bruksarealBolig?.totaltAreal,
        boligBta: e.byggArealEndring?.bruttoarealBolig?.boligAreal,
        annetBta: e.byggArealEndring?.bruttoarealBolig?.annetAreal,
        sumBta: e.byggArealEndring?.bruttoarealBolig?.totaltAreal,
        bya: e.byggArealEndring?.bebygdAreal,
      },
    }))

  const koordinatEndringer = endringer
    .filter((e) => e.byggKoordinatEndring !== undefined)
    .map((e) => ({ lopeNr: e.lopeNr, ...e.byggKoordinatEndring }))

  const datoEndringer = endringer
    .filter((e) => e.byggDatoEndring !== undefined)
    .map((e) => ({ lopeNr: e.lopeNr, ...e.byggDatoEndring }))

  const aktuellEierEndringer = endringer.flatMap((e) =>
    (e.aktuelleEiere ?? [])
      .filter((eier) => eier !== undefined)
      .map((eier) => ({
        lopeNr: e.lopeNr,
        ...eier,
        eierforholdKode: eier.eierforholdKode
          ? t(`koder.eierforhold.${eier.eierforholdKode}`)
          : undefined,
      })),
  )

  const tiltaksHaverEndringer = endringer.flatMap((e) =>
    (e.tiltaksHavere ?? [])
      .filter((th) => th !== undefined)
      .map((th) => ({
        lopeNr: e.lopeNr,
        ...th,
        kontaktPersonKode: th.kontaktPersonKode
          ? t(`koder.kontaktperson.${th.kontaktPersonKode}`)
          : undefined,
      })),
  )

  const bruksenhetEndringer = endringer.flatMap((e) =>
    (e.bruksenheter ?? [])
      .filter((b) => b !== undefined)
      .map((b) => ({
        lopeNr: e.lopeNr,
        ...b,
        bruksenhetsTypeKode: b.bruksenhetsTypeKode
          ? t(`koder.bruksenhetstype.${b.bruksenhetsTypeKode}`)
          : undefined,
        kjokkenTilgangKode: b.kjokkenTilgangKode
          ? t(`koder.kjokkentilgang.${b.kjokkenTilgangKode}`)
          : undefined,
      })),
  )

  const sefrakEndringer = endringer.flatMap((e) =>
    (e.sefrakIder ?? [])
      .filter((s) => s != null)
      .map((sefrakId) => ({ lopeNr: e.lopeNr, sefrakId })),
  )

  const kulturminneEndringer = endringer.flatMap((e) =>
    (e.kulturminner ?? [])
      .filter((k) => k !== undefined)
      .map((k) => ({
        lopeNr: e.lopeNr,
        ...k,
        enkeltminneArtKode: k.enkeltminneArtKode
          ? t(`koder.enkeltminneart.${k.enkeltminneArtKode}`)
          : undefined,
        vernetypeKode: k.vernetypeKode
          ? t(`koder.vernetype.${k.vernetypeKode}`)
          : undefined,
        kulturminnekategoriKode: k.kulturminnekategoriKode
          ? t(`koder.kulturminnekategori.${k.kulturminnekategoriKode}`)
          : undefined,
      })),
  )

  return (
    <Section index={index} title={t(`${tKey}.tittel`)}>
      {bygning.bygningsnr && (
        <Heading level={3} className="bg-kv-green-subtle p-2">
          {t(`${tKey}.bygningsnr`, { bygningsnr: bygning.bygningsnr })}
        </Heading>
      )}

      {endringer.length === 0 ? (
        <Paragraph className="text-kv-subtle">
          {t(`${tKey}.ingenEndringer`)}
        </Paragraph>
      ) : (
        <div className="space-y-8">
          <EndringsTabell endringer={metaEndringer} seksjon="byggMetaEndring" />
          <ArealTabell arealEndringer={arealEndringer} />
          <EndringsTabell
            endringer={koordinatEndringer}
            seksjon="byggKoordinatEndring"
          />
          <EndringsTabell endringer={datoEndringer} seksjon="byggDatoEndring" />
          <EndringsTabell
            endringer={aktuellEierEndringer}
            seksjon="aktuelleEiere"
          />
          <EndringsTabell
            endringer={tiltaksHaverEndringer}
            seksjon="tiltaksHavere"
          />
          <EndringsTabell
            endringer={bruksenhetEndringer}
            seksjon="bruksenheter"
          />
          <EndringsTabell
            endringer={kulturminneEndringer}
            seksjon="kulturminner"
          />
          <EndringsTabell endringer={sefrakEndringer} seksjon="sefrak" />
        </div>
      )}
    </Section>
  )
}
