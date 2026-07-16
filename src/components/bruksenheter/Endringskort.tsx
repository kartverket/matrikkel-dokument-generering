import { Card, Divider, Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"
import {
  type DetaljfeltData,
  Detaljgrid,
  lagDetaljfeltBuilder,
} from "../Detaljfelt"

type Endring = BruksenhetDetalj["endringer"][number]
const bruksenhetFelt = lagDetaljfeltBuilder("rapport.BYG0011.bruksenheter")
const etasjefelt = lagDetaljfeltBuilder("rapport.BYG0011.etasjer")

export function Endringskort({ endring }: { endring: Endring }) {
  const { t } = useTranslation()
  const tom = t("tom")
  const grupper = [
    {
      title: t("rapport.BYG0011.bruksenheter.grunnopplysninger"),
      felter: [
        bruksenhetFelt("lopenr", endring.lopenr),
        bruksenhetFelt("endringskode", endring.endringskode),
        bruksenhetFelt("bygningstype", endring.bygningstype),
        bruksenhetFelt("bestaaende", endring.bestaaende),
        bruksenhetFelt("bygningsstatus", endring.bygningsstatus),
        bruksenhetFelt("bygningsstatuskode", endring.bygningsstatuskode),
        bruksenhetFelt(
          "bygningsstatusKortkode",
          endring.bygningsstatusKortkode,
        ),
        bruksenhetFelt("endringsbeskrivelse", endring.beskrivelse, {
          className: "col-span-3",
        }),
      ],
    },
    {
      title: t("rapport.BYG0011.bruksenheter.arealOgPlassering"),
      felter: [
        bruksenhetFelt("antallBoenheter", endring.antallBoenheter),
        bruksenhetFelt("bruksarealEndring", endring.bruksareal),
        bruksenhetFelt("bruttoarealEndring", endring.bruttoareal),
        bruksenhetFelt("bebygdArealEndring", endring.bebygdAreal),
        bruksenhetFelt("koordinater", endring.koordinater, {
          className: "col-span-2",
        }),
      ],
    },
    {
      title: t("rapport.BYG0011.bruksenheter.vedtakOgDatoer"),
      felter: [
        bruksenhetFelt("rammetillatelse", endring.rammetillatelse),
        bruksenhetFelt(
          "igangsettingstillatelse",
          endring.igangsettingstillatelse,
        ),
        bruksenhetFelt(
          "midlertidigBrukstillatelse",
          endring.midlertidigBrukstillatelse,
        ),
        bruksenhetFelt("ferdigattest", endring.ferdigattest),
        bruksenhetFelt("tattIBruk", endring.tattIBruk),
        bruksenhetFelt("utgaattRevet", endring.utgaattRevet),
      ],
    },
  ] satisfies Array<{ title: string; felter: DetaljfeltData[] }>
  const lister = [
    {
      title: t("rapport.BYG0011.bruksenheter.etasjerIEndringen"),
      emptyText: t("rapport.BYG0011.bruksenheter.ingenEtasjer"),
      elementer: endring.etasjer.map((etasje) => ({
        key: `${etasje.etasjeplan}-${etasje.etasje}`,
        felter: [
          etasjefelt("etasjeplan", etasje.etasjeplan),
          etasjefelt("etasje", etasje.etasje),
          etasjefelt("antallBoenheter", etasje.antallBoenheter),
          etasjefelt("bruksarealBolig", etasje.bruksarealBolig),
          etasjefelt("bruksarealAnnet", etasje.bruksarealAnnet),
          etasjefelt("bruksarealTotalt", etasje.bruksarealTotalt),
          etasjefelt("bruttoarealBolig", etasje.bruttoarealBolig),
          etasjefelt("bruttoarealAnnet", etasje.bruttoarealAnnet),
          etasjefelt("bruttoarealTotalt", etasje.bruttoarealTotalt),
        ],
      })),
    },
    {
      title: t("rapport.BYG0011.bruksenheter.kulturminnerIEndringen"),
      emptyText: t("rapport.BYG0011.bruksenheter.ingenKulturminner"),
      elementer: endring.kulturminner.map((kulturminne) => ({
        key: kulturminne.id,
        felter: [
          bruksenhetFelt("kulturminneNavn", kulturminne.navn),
          bruksenhetFelt("kulturminneStatus", kulturminne.status),
          bruksenhetFelt("kulturminneKategori", kulturminne.kategori, {
            className: "col-span-3",
          }),
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
      data-endring-id={endring.id}
      variant="default"
      className="border border-kv-border bg-kv-gray"
    >
      <Card.Block className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Heading level={5} data-size="xs" className="font-medium">
            {endring.tittel}
          </Heading>
          <Tag data-color="accent" variant="outline">
            {endring.status}
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
