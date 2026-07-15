import { Card, Divider, Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"
import { Detail } from "./Detalje"

type Endring = BruksenhetDetalj["endringer"][number]

export function Endringskort({ endring }: { endring: Endring }) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.bruksenheter"

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
          <Detail
            label={t(`${translationKey}.endringsId`)}
            value={endring.id}
          />
          <Detail
            label={t(`${translationKey}.bygningsId`)}
            value={endring.bygningId}
          />
          <Detail
            label={t(`${translationKey}.lopenr`)}
            value={endring.lopenr}
          />
          <Detail
            label={t(`${translationKey}.endringskode`)}
            value={endring.endringskode}
          />
          <Detail
            label={t(`${translationKey}.bygningstype`)}
            value={endring.bygningstype}
          />
          <Detail
            label={t(`${translationKey}.bestaaende`)}
            value={endring.bestaaende}
          />
          <Detail
            label={t(`${translationKey}.bygningsstatus`)}
            value={endring.bygningsstatus}
          />
          <Detail
            label={t(`${translationKey}.bygningsstatuskode`)}
            value={endring.bygningsstatuskode}
          />
          <Detail
            label={t(`${translationKey}.bygningsstatusKortkode`)}
            value={endring.bygningsstatusKortkode}
          />
          <Detail
            label={t(`${translationKey}.endringsbeskrivelse`)}
            value={endring.beskrivelse}
            className="col-span-3"
          />
        </dl>

        <Divider className="my-5" />
        <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
          {t(`${translationKey}.arealOgPlassering`)}
        </Paragraph>
        <dl className="grid grid-cols-3 gap-x-7 gap-y-4">
          <Detail
            label={t(`${translationKey}.antallBoenheter`)}
            value={endring.antallBoenheter}
          />
          <Detail
            label={t(`${translationKey}.bruksarealEndring`)}
            value={endring.bruksareal}
          />
          <Detail
            label={t(`${translationKey}.bruttoarealEndring`)}
            value={endring.bruttoareal}
          />
          <Detail
            label={t(`${translationKey}.bebygdArealEndring`)}
            value={endring.bebygdAreal}
          />
          <Detail
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
          <Detail
            label={t(`${translationKey}.rammetillatelse`)}
            value={endring.rammetillatelse}
          />
          <Detail
            label={t(`${translationKey}.igangsettingstillatelse`)}
            value={endring.igangsettingstillatelse}
          />
          <Detail
            label={t(`${translationKey}.midlertidigBrukstillatelse`)}
            value={endring.midlertidigBrukstillatelse}
          />
          <Detail
            label={t(`${translationKey}.ferdigattest`)}
            value={endring.ferdigattest}
          />
          <Detail
            label={t(`${translationKey}.tattIBruk`)}
            value={endring.tattIBruk}
          />
          <Detail
            label={t(`${translationKey}.utgaattRevet`)}
            value={endring.utgaattRevet}
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
                <Detail
                  label={t("rapport.BYG0011.etasjer.etasjeplan")}
                  value={etasje.etasjeplan}
                />
                <Detail
                  label={t("rapport.BYG0011.etasjer.etasje")}
                  value={etasje.etasje}
                />
                <Detail
                  label={t("rapport.BYG0011.etasjer.antallBoenheter")}
                  value={etasje.antallBoenheter}
                />
                <Detail
                  label={t("rapport.BYG0011.etasjer.bruksarealBolig")}
                  value={etasje.bruksarealBolig}
                />
                <Detail
                  label={t("rapport.BYG0011.etasjer.bruksarealAnnet")}
                  value={etasje.bruksarealAnnet}
                />
                <Detail
                  label={t("rapport.BYG0011.etasjer.bruksarealTotalt")}
                  value={etasje.bruksarealTotalt}
                />
                <Detail
                  label={t("rapport.BYG0011.etasjer.bruttoarealBolig")}
                  value={etasje.bruttoarealBolig}
                />
                <Detail
                  label={t("rapport.BYG0011.etasjer.bruttoarealAnnet")}
                  value={etasje.bruttoarealAnnet}
                />
                <Detail
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
                <Detail
                  label={t(`${translationKey}.kulturminneId`)}
                  value={kulturminne.id}
                />
                <Detail
                  label={t(`${translationKey}.kulturminneNavn`)}
                  value={kulturminne.navn}
                />
                <Detail
                  label={t(`${translationKey}.kulturminneStatus`)}
                  value={kulturminne.status}
                />
                <Detail
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
