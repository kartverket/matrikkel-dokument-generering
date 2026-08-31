import { useTranslation } from "react-i18next"
import {
  type Kriterie,
  Utvalg,
} from "../components/utvalgskriterier/Utvalg.tsx"
import { erAngitt } from "../components/utvalgskriterier/utils/erAngitt.ts"
import {
  formatAdresse,
  formatMatrikkelnummer,
  formatPeriode,
  formatSokevindu,
  leggTilHvisSann,
} from "../components/utvalgskriterier/utils/formatKriterier.ts"
import type { ByggUtvalgskriterier as UtvalgskriterierType } from "../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { formatDate } from "../lib/utils/formatDate"

interface Props {
  readonly kriterier: UtvalgskriterierType
}

export function ByggUtvalgskriterier({ kriterier }: Readonly<Props>) {
  const { t, i18n } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!kriterier) {
    return null
  }

  const valgteByggstatus: string[] = []
  leggTilHvisSann(
    valgteByggstatus,
    kriterier.omfang?.inkluderBestaaendeBygg,
    t(`${uk}.omfang.inkluderBestaaendeBygg`),
  )
  leggTilHvisSann(
    valgteByggstatus,
    kriterier.omfang?.inkluderUtgaatteBygg,
    t(`${uk}.omfang.inkluderUtgaatteBygg`),
  )

  const periodeFra = kriterier.bygningsstatus?.periodeFra
    ? formatDate(i18n, kriterier.bygningsstatus.periodeFra)
    : ""
  const periodeTil = kriterier.bygningsstatus?.periodeTil
    ? formatDate(i18n, kriterier.bygningsstatus.periodeTil)
    : ""
  const periode =
    erAngitt(kriterier.bygningsstatus?.periodeFra) ||
    erAngitt(kriterier.bygningsstatus?.periodeTil)
      ? formatPeriode(periodeFra, periodeTil)
      : undefined

  const sokevinduTekst = formatSokevindu(kriterier.sokevindu)
  const matrikkelnummerTekst = formatMatrikkelnummer(kriterier.matrikkelenhet, {
    gnr: t(`${uk}.matrikkelenhet.gnr`),
    bnr: t(`${uk}.matrikkelenhet.bnr`),
    fnr: t(`${uk}.matrikkelenhet.fnr`),
    snr: t(`${uk}.matrikkelenhet.snr`),
  })
  const adresseTekst = formatAdresse(kriterier.adresse)

  const filtreringKriterier: Kriterie[] = [
    {
      key: "byggstatus",
      label: t(`${uk}.byggstatus`),
      value: valgteByggstatus,
    },
    {
      key: "bygningstype",
      label: t(`${uk}.bygning.bygningstyper`),
      value: kriterier.bygning?.bygningstyper?.map((kode) =>
        t(`koder.bygningstype.${kode}`),
      ),
    },
    {
      key: "naavaerendeStatus",
      label: t(`${uk}.bygningsstatus.naavaerende`),
      value: kriterier.bygningsstatus?.naavaerende?.map((kode) =>
        t(`koder.bygningsstatusKort.${kode}`),
      ),
    },
    {
      key: "tidligereStatus",
      label: t(`${uk}.bygningsstatus.tidligere`),
      value: kriterier.bygningsstatus?.tidligere?.map((kode) =>
        t(`koder.bygningsstatusKort.${kode}`),
      ),
    },
    {
      key: "periode",
      label: t(`${uk}.periode`),
      value: periode,
    },
  ]

  const avgrensningKriterier: Kriterie[] = [
    {
      key: "bygningsNr",
      label: t(`${uk}.bygning.bygningsNr`),
      value: kriterier.bygning?.bygningsNr,
    },
    {
      key: "lopeNr",
      label: t(`${uk}.bygning.lopeNr`),
      value: kriterier.bygning?.lopeNr,
    },
    {
      key: "matrikkelnummer",
      label: t("rapport.BYG0011.matrikkelenhet"),
      value: matrikkelnummerTekst,
    },
    {
      key: "adresse",
      label: t(`${uk}.adresse.tittel`),
      value: adresseTekst,
    },
    {
      key: "sokevindu",
      label: t(`${uk}.sokevindu.tittel`),
      value: sokevinduTekst,
    },
  ]

  const innholdIRapporten: string[] = []
  leggTilHvisSann(
    innholdIRapporten,
    kriterier.omfang?.inkluderBygninger,
    t(`${uk}.omfang.inkluderBygninger`),
  )
  leggTilHvisSann(
    innholdIRapporten,
    kriterier.omfang?.inkluderBygningsendringer,
    t(`${uk}.omfang.inkluderBygningsendringer`),
  )
  leggTilHvisSann(
    innholdIRapporten,
    kriterier.subrapporter?.inkluderEtasjer,
    t(`${uk}.subrapporter.inkluderEtasjer`),
  )
  leggTilHvisSann(
    innholdIRapporten,
    kriterier.subrapporter?.inkluderBruksenheter,
    t(`${uk}.subrapporter.inkluderBruksenheter`),
  )
  leggTilHvisSann(
    innholdIRapporten,
    kriterier.subrapporter?.inkluderTiltakshavere,
    t(`${uk}.subrapporter.inkluderTiltakshavere`),
  )
  leggTilHvisSann(
    innholdIRapporten,
    kriterier.subrapporter?.inkluderKontaktpersoner,
    t(`${uk}.subrapporter.inkluderKontaktpersoner`),
  )
  leggTilHvisSann(
    innholdIRapporten,
    kriterier.subrapporter?.inkluderHjemmelshavere,
    t(`${uk}.subrapporter.inkluderHjemmelshavere`),
  )
  leggTilHvisSann(
    innholdIRapporten,
    kriterier.subrapporter?.inkluderKulturminner,
    t(`${uk}.subrapporter.inkluderKulturminner`),
  )

  return (
    <section className={"mb-20"}>
      <div className="mb-2 flex flex-col gap-12">
        <Utvalg
          title={t(`${uk}.avgrensning`)}
          kriterier={avgrensningKriterier}
        />

        <Utvalg title={t(`${uk}.filtrering`)} kriterier={filtreringKriterier} />

        <Utvalg
          title={t(`${uk}.innholdIRapporten`)}
          kriterier={[
            {
              key: "innhold",
              label: t(`${uk}.innhold`),
              value: innholdIRapporten,
            },
          ]}
        />
      </div>
    </section>
  )
}
