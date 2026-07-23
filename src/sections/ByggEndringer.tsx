import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import ArealTabell, { type ArealEndring } from "../components/ArealTabell.tsx"
import EndringsTabell from "../components/EndringsTabell.tsx"
import { Section } from "../components/Section.tsx"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

const tKey = "rapport.BYG0011.byggEndringer" as const

type Props = {
  index: number
  bygning: Bygning
}

export default function ByggEndringer({ index, bygning }: Props) {
  const { t } = useTranslation()

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
          etasjeplan: ep.etasjeplanKode,
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

  const aktuellEierEndringer = endringer
    .filter((e) => e.aktuellEier !== undefined)
    .map((e) => ({
      lopeNr: e.lopeNr,
      ...e.aktuellEier,
      eierforholdKode: e.aktuellEier?.eierforholdKode
        ? t(`koder.eierforhold.${e.aktuellEier.eierforholdKode}`)
        : undefined,
    }))

  const tiltaksHaverEndringer = endringer
    .filter((e) => e.tiltaksHaver !== undefined)
    .map((e) => ({
      lopeNr: e.lopeNr,
      ...e.tiltaksHaver,
      kontaktPersonKode: e.tiltaksHaver?.kontaktPersonKode
        ? t(`koder.kontaktperson.${e.tiltaksHaver.kontaktPersonKode}`)
        : undefined,
    }))

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

  return (
    <Section index={index} title={t(`${tKey}.tittel`)}>
      <Heading level={3} className="bg-kv-green-subtle p-2">
        {t(`${tKey}.bygningsnr`, { bygningsnr: bygning.bygningsnr })}
      </Heading>

      {endringer.length === 0 ? (
        <Paragraph className="text-kv-subtle">
          {t(`${tKey}.ingenEndringer`)}
        </Paragraph>
      ) : (
        <div className="flex flex-col gap-8">
          <EndringsTabell
            endringer={metaEndringer}
            tKey={`${tKey}.byggMetaEndring`}
          />
          <ArealTabell arealEndringer={arealEndringer} />
          <EndringsTabell
            endringer={koordinatEndringer}
            tKey={`${tKey}.byggKoordinatEndring`}
          />
          <EndringsTabell
            endringer={datoEndringer}
            tKey={`${tKey}.byggDatoEndring`}
          />
          <EndringsTabell
            endringer={aktuellEierEndringer}
            tKey={`${tKey}.aktuellEier`}
          />
          <EndringsTabell
            endringer={tiltaksHaverEndringer}
            tKey={`${tKey}.tiltaksHaver`}
          />
          <EndringsTabell
            endringer={bruksenhetEndringer}
            tKey={`${tKey}.bruksenheter`}
          />
        </div>
      )}
    </Section>
  )
}
