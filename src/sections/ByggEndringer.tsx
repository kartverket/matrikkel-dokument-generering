import { Heading, Paragraph } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import ArealTabell, { type ArealGruppe } from "../components/ArealTabell.tsx"
import EndringsTabell from "../components/EndringsTabell.tsx"
import { Section } from "../components/Section.tsx"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"

const BE = "rapport.BYG0011.byggEndringer" as const

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
    .map((e) => ({
      lopeNr: e.lopeNr,
      ...e.byggMetaEndring,
      bygningsTypeKode: e.byggMetaEndring?.bygningsTypeKode
        ? oversettKode({
            t,
            kodeverk: "bygningstype",
            kode: e.byggMetaEndring.bygningsTypeKode,
          })
        : undefined,
      bygningsStatusKode: e.byggMetaEndring?.bygningsStatusKode
        ? oversettKode({
            t,
            kodeverk: "bygningsstatus",
            kode: e.byggMetaEndring.bygningsStatusKode,
          })
        : undefined,
      endringsKode: e.byggMetaEndring?.endringsKode
        ? oversettKode({
            t,
            kodeverk: "endring",
            kode: e.byggMetaEndring.endringsKode,
          })
        : undefined,
    }))

  // Areal + etasjeplan slås sammen til én gruppert tabell per endring
  const arealGrupper: ArealGruppe[] = endringer
    .filter(
      (e) =>
        e.byggArealEndring !== undefined || (e.etasjePlan?.length ?? 0) > 0,
    )
    .map((e) => ({
      lopeNr: e.lopeNr,
      rader: (e.etasjePlan ?? [])
        .filter((ep) => ep !== undefined)
        .map((ep) => ({
          etasjeplan: ep.etasjeplan,
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

  const aktorEndringer = endringer
    .filter((e) => e.aktor !== undefined)
    .map((e) => ({
      lopeNr: e.lopeNr,
      ...e.aktor,
      aktorKode: e.aktor?.aktorKode
        ? oversettKode({ t, kodeverk: "aktor", kode: e.aktor.aktorKode })
        : undefined,
    }))

  const tiltaksHaverEndringer = endringer
    .filter((e) => e.tiltaksHaver !== undefined)
    .map((e) => ({
      lopeNr: e.lopeNr,
      ...e.tiltaksHaver,
      kontaktPersonKode: e.tiltaksHaver?.kontaktPersonKode
        ? oversettKode({
            t,
            kodeverk: "kontaktperson",
            kode: e.tiltaksHaver.kontaktPersonKode,
          })
        : undefined,
    }))

  const bruksenhetEndringer = endringer.flatMap((e) =>
    (e.bruksenheter ?? [])
      .filter((b) => b !== undefined)
      .map((b) => ({
        lopeNr: e.lopeNr,
        ...b,
        bruksenhetsTypeKode: b.bruksenhetsTypeKode
          ? oversettKode({
              t,
              kodeverk: "bruksenhetstype",
              kode: b.bruksenhetsTypeKode,
            })
          : undefined,
        kjokkenTilgangKode: b.kjokkenTilgangKode
          ? oversettKode({
              t,
              kodeverk: "kjokkentilgang",
              kode: b.kjokkenTilgangKode,
            })
          : undefined,
      })),
  )

  console.log("ByggEndringer", {
    endringer,
    metaEndringer,
    arealGrupper,
    koordinatEndringer,
    datoEndringer,
    aktorEndringer,
    tiltaksHaverEndringer,
    bruksenhetEndringer,
  })

  return (
    <Section index={index} title={t(`${BE}.tittel`)}>
      <Heading level={3} className="bg-kv-green-subtle p-2">
        {t(`${BE}.bygningsnr`, { bygningsnr: bygning.bygningsnr })}
      </Heading>

      {endringer.length === 0 ? (
        <Paragraph className="text-kv-subtle">
          {t(`${BE}.ingenEndringer`)}
        </Paragraph>
      ) : (
        <div className="flex flex-col gap-8">
          <EndringsTabell
            endringer={metaEndringer}
            translationPrefix={`${BE}.byggMetaEndring`}
          />
          <ArealTabell grupper={arealGrupper} />
          <EndringsTabell
            endringer={koordinatEndringer}
            translationPrefix={`${BE}.byggKoordinatEndring`}
          />
          <EndringsTabell
            endringer={datoEndringer}
            translationPrefix={`${BE}.byggDatoEndring`}
          />
          <EndringsTabell
            endringer={aktorEndringer}
            translationPrefix={`${BE}.aktor`}
          />
          <EndringsTabell
            endringer={tiltaksHaverEndringer}
            translationPrefix={`${BE}.tiltaksHaver`}
          />
          <EndringsTabell
            endringer={bruksenhetEndringer}
            translationPrefix={`${BE}.bruksenheter`}
          />
        </div>
      )}
    </Section>
  )
}
