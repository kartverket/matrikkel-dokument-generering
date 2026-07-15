import {
  Card,
  Divider,
  Heading,
  Paragraph,
  Table,
  Tag,
} from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"
import { Detail } from "./Detalje"

export function Endringskort({
  endring,
}: {
  endring: BruksenhetDetalj["endringer"][number]
}) {
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
          <Table border className="text-sm">
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>
                  {t("rapport.BYG0011.etasjer.etasjeplan")}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t("rapport.BYG0011.etasjer.etasje")}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t("rapport.BYG0011.etasjer.antallBoenheter")}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t("rapport.BYG0011.etasjer.bruksarealBolig")}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t("rapport.BYG0011.etasjer.bruksarealAnnet")}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t("rapport.BYG0011.etasjer.bruksarealTotalt")}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t("rapport.BYG0011.etasjer.bruttoarealBolig")}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t("rapport.BYG0011.etasjer.bruttoarealAnnet")}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t("rapport.BYG0011.etasjer.bruttoarealTotalt")}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {endring.etasjer.map((etasje) => (
                <Table.Row key={`${etasje.etasjeplan}-${etasje.etasje}`}>
                  <Table.Cell>{etasje.etasjeplan}</Table.Cell>
                  <Table.Cell>{etasje.etasje}</Table.Cell>
                  <Table.Cell>{etasje.antallBoenheter}</Table.Cell>
                  <Table.Cell>{etasje.bruksarealBolig}</Table.Cell>
                  <Table.Cell>{etasje.bruksarealAnnet}</Table.Cell>
                  <Table.Cell>{etasje.bruksarealTotalt}</Table.Cell>
                  <Table.Cell>{etasje.bruttoarealBolig}</Table.Cell>
                  <Table.Cell>{etasje.bruttoarealAnnet}</Table.Cell>
                  <Table.Cell>{etasje.bruttoarealTotalt}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
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
          <Table border className="text-sm">
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>
                  {t(`${translationKey}.kulturminneId`)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t(`${translationKey}.kulturminneNavn`)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t(`${translationKey}.kulturminneStatus`)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t(`${translationKey}.kulturminneKategori`)}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {endring.kulturminner.map((kulturminne) => (
                <Table.Row key={kulturminne.id}>
                  <Table.Cell>{kulturminne.id}</Table.Cell>
                  <Table.Cell>{kulturminne.navn}</Table.Cell>
                  <Table.Cell>{kulturminne.status}</Table.Cell>
                  <Table.Cell>{kulturminne.kategori}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Card.Block>
    </Card>
  )
}
