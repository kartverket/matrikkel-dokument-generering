import { Card, Divider, Heading, Paragraph } from "@kv-designsystem/react"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { arealLinje, formatArea } from "../../lib/utils/formatArea"
import { formatDate } from "../../lib/utils/formatDate"
import { formaterBygningstype } from "../../lib/utils/formaterBygningstype.ts"
import {
  type DetaljfeltData,
  Detaljgrid,
  lagDetaljfeltBuilder,
} from "../Detaljfelt"

const bruksenhetFelt = lagDetaljfeltBuilder("rapport.BYG0011.bruksenheter")
const byggFelt = lagDetaljfeltBuilder("rapport.BYG0011")
const etasjeFelt = lagDetaljfeltBuilder("rapport.BYG0011.etasjer")

interface Props {
  endring: BygningsEndring
  matrikkelNummer?: string
}

export function Endringskort({ endring, matrikkelNummer }: Props) {
  const { i18n, t } = useTranslation()

  if (endring === undefined) return null

  const tom = t("tom")
  const kortDato = { dateStyle: "short" } as const
  const numberFormatter = new Intl.NumberFormat(i18n.language)
  const formatDato = (dato: string | undefined) =>
    dato === undefined ? null : formatDate(i18n, dato, "", kortDato)

  const {
    byggMetaEndring,
    byggArealEndring,
    byggKoordinatEndring,
    byggDatoEndring,
  } = endring

  const endringskode =
    byggMetaEndring?.endringsKode === undefined
      ? null
      : oversettKode({
          t,
          kodeverk: "endring",
          kode: byggMetaEndring.endringsKode,
        })

  const bygningstype = formaterBygningstype(
    t,
    byggMetaEndring?.bygningsTypeKode,
  )

  const koordinater =
    byggKoordinatEndring?.nord === undefined ||
    byggKoordinatEndring.ost === undefined
      ? null
      : `${numberFormatter.format(byggKoordinatEndring.nord)} N / ${numberFormatter.format(byggKoordinatEndring.ost)} Ø`

  const formatertTittel = [
    t("rapport.BYG0011.bruksenheter.endringTittel", {
      lopenr: endring.lopeNr,
    }),
    endringskode,
  ]
    .filter(Boolean)
    .join(" · ")

  const grupper = [
    {
      title: t("rapport.BYG0011.bruksenheter.grunnopplysninger"),
      felter: [
        bruksenhetFelt("lopenr", String(endring.lopeNr)),
        bruksenhetFelt("endringskode", endringskode),
        bruksenhetFelt("bygningstype", bygningstype),
        byggFelt("naeringsgruppe", byggMetaEndring?.naeringsgruppe),
        byggFelt("matrikkelenhet", matrikkelNummer),
        bruksenhetFelt("sefrakId", endring.sefrakId),
        bruksenhetFelt(
          "kulturminne",
          endring.harKulturminne === undefined
            ? null
            : t(
                `rapport.BYG0011.bruksenheter.${endring.harKulturminne ? "ja" : "nei"}`,
              ),
        ),
      ],
    },
    {
      title: t("rapport.BYG0011.bruksenheter.arealOgPlassering"),
      felter: [
        bruksenhetFelt(
          "antallBoenheter",
          byggMetaEndring?.antallBoenheter === undefined
            ? null
            : String(byggMetaEndring.antallBoenheter),
        ),
        bruksenhetFelt(
          "bruksarealEndring",
          arealLinje(byggArealEndring?.bruksarealBolig),
        ),
        bruksenhetFelt(
          "bruttoarealEndring",
          arealLinje(byggArealEndring?.bruttoarealBolig),
        ),
        bruksenhetFelt(
          "bebygdArealEndring",
          formatArea(byggArealEndring?.bebygdAreal),
        ),
        bruksenhetFelt("koordinater", koordinater, { className: "col-span-2" }),
      ],
    },
    {
      title: t("rapport.BYG0011.registrerteVedtak.title"),
      felter: [
        bruksenhetFelt(
          "rammetillatelse",
          formatDato(byggDatoEndring?.rammetillatelse),
        ),
        bruksenhetFelt(
          "igangsettingstillatelse",
          formatDato(byggDatoEndring?.igangsettingstillatelse),
        ),
        bruksenhetFelt(
          "midlertidigBrukstillatelse",
          formatDato(byggDatoEndring?.midlertidigBrukstillatelse),
        ),
        bruksenhetFelt(
          "ferdigattest",
          formatDato(byggDatoEndring?.ferdigattest),
        ),
        bruksenhetFelt("tattIBruk", formatDato(byggDatoEndring?.tattIBruk)),
        bruksenhetFelt(
          "utgaattRevet",
          formatDato(byggDatoEndring?.utgaattRevet),
        ),
      ],
    },
  ] satisfies Array<{ title: string; felter: DetaljfeltData[] }>

  const etasjer = endring.etasjePlan.filter((etasje) => etasje !== undefined)

  const lister = [
    {
      title: t("rapport.BYG0011.bruksenheter.etasjerIEndringen"),
      emptyText: t("rapport.BYG0011.bruksenheter.ingenEtasjer"),
      elementer: etasjer.map((etasje) => ({
        key: `${etasje.etasjeplan}-${etasje.etasje}`,
        felter: [
          etasjeFelt("etasjeplan", etasje.etasjeplan),
          etasjeFelt("etasje", String(etasje.etasje)),
          etasjeFelt(
            "antallBoenheter",
            etasje.antallBoenheter === undefined
              ? null
              : String(etasje.antallBoenheter),
          ),
          etasjeFelt(
            "bruksarealBolig",
            formatArea(etasje.bruksareal.boligAreal),
          ),
          etasjeFelt(
            "bruksarealAnnet",
            formatArea(etasje.bruksareal.annetAreal),
          ),
          etasjeFelt(
            "bruksarealTotalt",
            formatArea(etasje.bruksareal.totaltAreal),
          ),
          etasjeFelt(
            "bruttoarealBolig",
            formatArea(etasje.bruttoareal.boligAreal),
          ),
          etasjeFelt(
            "bruttoarealAnnet",
            formatArea(etasje.bruttoareal.annetAreal),
          ),
          etasjeFelt(
            "bruttoarealTotalt",
            formatArea(etasje.bruttoareal.totaltAreal),
          ),
        ],
      })),
    },
  ] satisfies Array<{
    title: string
    emptyText: string
    elementer: Array<{ key: string; felter: DetaljfeltData[] }>
  }>

  return (
    <Card
      data-endring-id={endring.lopeNr}
      variant="default"
      className="border border-kv-border bg-kv-gray"
    >
      <Card.Block className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Heading level={5} data-size="xs" className="font-medium">
            {formatertTittel}
          </Heading>
        </div>

        {grupper.map(({ title, felter }, index) => (
          <Fragment key={title}>
            {index > 0 && <Divider className="my-5" />}
            <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
              {title}
            </Paragraph>
            <Detaljgrid felter={felter} tom={tom} />
          </Fragment>
        ))}

        {lister.map((liste) => (
          <Fragment key={liste.title}>
            <Divider className="my-5" />
            <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
              {liste.title}
            </Paragraph>
            {liste.elementer.length === 0 ? (
              <Paragraph className="text-kv-subtle text-sm">
                {liste.emptyText}
              </Paragraph>
            ) : (
              <div className="divide-y divide-kv-border">
                {liste.elementer.map(({ key, felter }) => (
                  <Detaljgrid
                    key={key}
                    felter={felter}
                    tom={tom}
                    className="break-inside-avoid py-4 first:pt-0 last:pb-0"
                  />
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </Card.Block>
    </Card>
  )
}
