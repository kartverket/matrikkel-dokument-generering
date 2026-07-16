import { Card, Divider, Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"
import { getDetaljVerdi } from "../../lib/utils/getDetaljVerdi"
import { EndringsDetalje } from "./EndringsDetalje"

interface Props {
  endring: BruksenhetDetalj["endringer"][number]
}

export function Endringskort({ endring }: Props) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.bruksenheter"
  const tom = t("tom")

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

        <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
          {t(`${translationKey}.grunnopplysninger`)}
        </Paragraph>
        <dl className="grid grid-cols-3 gap-x-7 gap-y-4">
          <EndringsDetalje
            label={t(`${translationKey}.endringsId`)}
            value={endring.id}
          />
          <EndringsDetalje
            label={t(`${translationKey}.bygningsId`)}
            value={endring.bygningId}
          />
          <EndringsDetalje
            label={t(`${translationKey}.lopenr`)}
            value={endring.lopenr}
          />
          <EndringsDetalje
            label={t(`${translationKey}.endringskode`)}
            {...getDetaljVerdi(endring.endringskode, tom)}
          />
          <EndringsDetalje
            label={t(`${translationKey}.bygningstype`)}
            value={endring.bygningstype}
          />
          <EndringsDetalje
            label={t(`${translationKey}.bestaaende`)}
            value={endring.bestaaende}
          />
          <EndringsDetalje
            label={t(`${translationKey}.bygningsstatus`)}
            value={endring.bygningsstatus}
          />
          <EndringsDetalje
            label={t(`${translationKey}.bygningsstatuskode`)}
            value={endring.bygningsstatuskode}
          />
          <EndringsDetalje
            label={t(`${translationKey}.bygningsstatusKortkode`)}
            value={endring.bygningsstatusKortkode}
          />
          <EndringsDetalje
            label={t(`${translationKey}.endringsbeskrivelse`)}
            {...getDetaljVerdi(endring.beskrivelse, tom)}
            className="col-span-3"
          />
        </dl>

        <Divider className="my-5" />
        <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
          {t(`${translationKey}.arealOgPlassering`)}
        </Paragraph>
        <dl className="grid grid-cols-3 gap-x-7 gap-y-4">
          <EndringsDetalje
            label={t(`${translationKey}.antallBoenheter`)}
            value={endring.antallBoenheter}
          />
          <EndringsDetalje
            label={t(`${translationKey}.bruksarealEndring`)}
            value={endring.bruksareal}
          />
          <EndringsDetalje
            label={t(`${translationKey}.bruttoarealEndring`)}
            value={endring.bruttoareal}
          />
          <EndringsDetalje
            label={t(`${translationKey}.bebygdArealEndring`)}
            value={endring.bebygdAreal}
          />
          <EndringsDetalje
            label={t(`${translationKey}.koordinater`)}
            value={endring.koordinater}
            className="col-span-2"
          />
        </dl>

        <Divider className="my-5" />
        <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
          {t(`${translationKey}.vedtakOgDatoer`)}
        </Paragraph>
        <dl className="grid grid-cols-3 gap-x-7 gap-y-4">
          <EndringsDetalje
            label={t(`${translationKey}.rammetillatelse`)}
            {...getDetaljVerdi(endring.rammetillatelse, tom)}
          />
          <EndringsDetalje
            label={t(`${translationKey}.igangsettingstillatelse`)}
            {...getDetaljVerdi(endring.igangsettingstillatelse, tom)}
          />
          <EndringsDetalje
            label={t(`${translationKey}.midlertidigBrukstillatelse`)}
            {...getDetaljVerdi(endring.midlertidigBrukstillatelse, tom)}
          />
          <EndringsDetalje
            label={t(`${translationKey}.ferdigattest`)}
            {...getDetaljVerdi(endring.ferdigattest, tom)}
          />
          <EndringsDetalje
            label={t(`${translationKey}.tattIBruk`)}
            {...getDetaljVerdi(endring.tattIBruk, tom)}
          />
          <EndringsDetalje
            label={t(`${translationKey}.utgaattRevet`)}
            {...getDetaljVerdi(endring.utgaattRevet, tom)}
          />
        </dl>

        <Divider className="my-5" />
        <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
          {t(`${translationKey}.etasjerIEndringen`)}
        </Paragraph>
        {endring.etasjer.length === 0 ? (
          <Paragraph className="text-kv-subtle text-sm">
            {t(`${translationKey}.ingenEtasjer`)}
          </Paragraph>
        ) : (
          <div className="divide-y divide-kv-border">
            {endring.etasjer.map((etasje) => (
              <dl
                key={`${etasje.etasjeplan}-${etasje.etasje}`}
                className="grid break-inside-avoid grid-cols-3 gap-x-7 gap-y-4 py-4 first:pt-0 last:pb-0"
              >
                <EndringsDetalje
                  label={t("rapport.BYG0011.etasjer.etasjeplan")}
                  value={etasje.etasjeplan}
                />
                <EndringsDetalje
                  label={t("rapport.BYG0011.etasjer.etasje")}
                  value={etasje.etasje}
                />
                <EndringsDetalje
                  label={t("rapport.BYG0011.etasjer.antallBoenheter")}
                  value={etasje.antallBoenheter}
                />
                <EndringsDetalje
                  label={t("rapport.BYG0011.etasjer.bruksarealBolig")}
                  value={etasje.bruksarealBolig}
                />
                <EndringsDetalje
                  label={t("rapport.BYG0011.etasjer.bruksarealAnnet")}
                  value={etasje.bruksarealAnnet}
                />
                <EndringsDetalje
                  label={t("rapport.BYG0011.etasjer.bruksarealTotalt")}
                  value={etasje.bruksarealTotalt}
                />
                <EndringsDetalje
                  label={t("rapport.BYG0011.etasjer.bruttoarealBolig")}
                  value={etasje.bruttoarealBolig}
                />
                <EndringsDetalje
                  label={t("rapport.BYG0011.etasjer.bruttoarealAnnet")}
                  value={etasje.bruttoarealAnnet}
                />
                <EndringsDetalje
                  label={t("rapport.BYG0011.etasjer.bruttoarealTotalt")}
                  value={etasje.bruttoarealTotalt}
                />
              </dl>
            ))}
          </div>
        )}

        <Divider className="my-5" />
        <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
          {t(`${translationKey}.kulturminnerIEndringen`)}
        </Paragraph>
        {endring.kulturminner.length === 0 ? (
          <Paragraph className="text-kv-subtle text-sm">
            {t(`${translationKey}.ingenKulturminner`)}
          </Paragraph>
        ) : (
          <div className="divide-y divide-kv-border">
            {endring.kulturminner.map((kulturminne) => (
              <dl
                key={kulturminne.id}
                className="grid break-inside-avoid grid-cols-3 gap-x-7 gap-y-4 py-4 first:pt-0 last:pb-0"
              >
                <EndringsDetalje
                  label={t(`${translationKey}.kulturminneId`)}
                  value={kulturminne.id}
                />
                <EndringsDetalje
                  label={t(`${translationKey}.kulturminneNavn`)}
                  value={kulturminne.navn}
                />
                <EndringsDetalje
                  label={t(`${translationKey}.kulturminneStatus`)}
                  value={kulturminne.status}
                />
                <EndringsDetalje
                  label={t(`${translationKey}.kulturminneKategori`)}
                  value={kulturminne.kategori}
                  className="col-span-3"
                />
              </dl>
            ))}
          </div>
        )}
      </Card.Block>
    </Card>
  )
}
