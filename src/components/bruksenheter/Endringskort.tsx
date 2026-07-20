import { Card, Divider, Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import type { Bygning } from "../../lib/schema/reports/bygg/byg0011/byg0011.schema"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/bygningsEndring.schema"
import { getBygningstype } from "../../lib/schema/reports/bygg/shared/bygningsType.schema"
import { arealLinje } from "../../lib/utils/arealLinje"
import { formatArea } from "../../lib/utils/formatArea"
import { formatDate } from "../../lib/utils/formatDate"
import {
  type DetaljfeltData,
  Detaljgrid,
  lagDetaljfeltBuilder,
} from "../Detaljfelt"

const bruksenhetFelt = lagDetaljfeltBuilder("rapport.BYG0011.bruksenheter")
const byggFelt = lagDetaljfeltBuilder("rapport.BYG0011")

interface Props {
  endring: BygningsEndring
  bygning: Pick<Bygning, "bygningsType" | "matrikkelenhet">
}

export function Endringskort({ endring, bygning }: Props) {
  const { i18n, t } = useTranslation()
  const tom = t("tom")
  const kortDato = { dateStyle: "short" } as const
  const numberFormatter = new Intl.NumberFormat(i18n.language)
  const formatDato = (dato: string | null | undefined) =>
    dato == null ? null : formatDate(i18n, dato, "", kortDato)
  const formatertTittel = [
    t("rapport.BYG0011.bruksenheter.endringTittel", {
      lopenr: endring.lopenr,
    }),
    endring.endringskode,
  ]
    .filter(Boolean)
    .join(" · ")

  const grupper = [
    {
      title: t("rapport.BYG0011.bruksenheter.grunnopplysninger"),
      felter: [
        bruksenhetFelt("lopenr", String(endring.lopenr)),
        bruksenhetFelt("endringskode", endring.endringskode),
        bruksenhetFelt(
          "bygningstype",
          `${bygning.bygningsType.kode} ${getBygningstype(bygning.bygningsType.kode, t)}`,
        ),
        byggFelt("naeringsgruppe", bygning.naeringsgruppe),
        byggFelt("matrikkelenhet", bygning.matrikkelenhet),
        bruksenhetFelt(
          "bestaaende",
          t(
            `rapport.BYG0011.utvalgskriterier.${endring.bygningsstatus.bestaaende ? "ja" : "nei"}`,
          ),
        ),
        bruksenhetFelt("bygningsstatus", endring.bygningsstatus.navn),
        bruksenhetFelt(
          "bygningsstatuskode",
          String(endring.bygningsstatus.kode),
        ),
        bruksenhetFelt(
          "bygningsstatusKortkode",
          endring.bygningsstatus.kortkode,
        ),
        bruksenhetFelt("endringsbeskrivelse", endring.beskrivelse, {
          className: "col-span-3",
        }),
      ],
    },
    {
      title: t("rapport.BYG0011.bruksenheter.arealOgPlassering"),
      felter: [
        bruksenhetFelt("antallBoenheter", String(endring.antallBoenheter)),
        bruksenhetFelt("bruksarealEndring", arealLinje(endring.bruksareal)),
        bruksenhetFelt("bruttoarealEndring", arealLinje(endring.bruttoareal)),
        bruksenhetFelt("bebygdArealEndring", formatArea(endring.bebygdAreal)),
        bruksenhetFelt(
          "koordinater",
          `${numberFormatter.format(endring.koordinat.nord)} N / ${numberFormatter.format(endring.koordinat.ost)} Ø`,
          { className: "col-span-2" },
        ),
      ],
    },
    {
      title: t("rapport.BYG0011.registrerteVedtak.title"),
      felter: [
        bruksenhetFelt(
          "rammetillatelse",
          formatDato(endring.datoer.rammetillatelse),
        ),
        bruksenhetFelt(
          "igangsettingstillatelse",
          formatDato(endring.datoer.igangsettingstillatelse),
        ),
        bruksenhetFelt(
          "midlertidigBrukstillatelse",
          formatDato(endring.datoer.midlertidigBrukstillatelse),
        ),
        bruksenhetFelt("ferdigattest", formatDato(endring.datoer.ferdigattest)),
        bruksenhetFelt("tattIBruk", formatDato(endring.datoer.tattIBruk)),
        bruksenhetFelt("utgaattRevet", formatDato(endring.datoer.utgaattRevet)),
      ],
    },
  ] satisfies Array<{ title: string; felter: DetaljfeltData[] }>

  return (
    <Card
      data-endring-id={endring.lopenr}
      variant="default"
      className="border border-kv-border bg-kv-gray"
    >
      <Card.Block className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Heading level={5} data-size="xs" className="font-medium">
            {formatertTittel}
          </Heading>
          <Tag data-color="accent" variant="outline">
            {endring.bygningsstatus.navn}
          </Tag>
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
