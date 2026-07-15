import { Heading, Table } from "@kv-designsystem/react"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../lib/schema/byggRapportSchema"
import { formatArea } from "../lib/utils/format"

interface Props {
  arealfordeling: BruksenhetDetalj["arealfordeling"]
}

export default function Arealfordeling({ arealfordeling }: Props) {
  const { t } = useTranslation()
  const af = "rapport.BYG0011.arealfordeling"

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${af}.title`)}
      </Heading>
      <div className="flex flex-col gap-6">
        <dl className="grid grid-cols-3 gap-x-8 gap-y-5">
          <div>
            <dt className="text-kv-subtle text-sm">{t(`${af}.bebygdAreal`)}</dt>
            <dd className="mt-1 font-medium tabular-nums">
              {formatArea(arealfordeling.bebygdAreal)}
            </dd>
          </div>
          <div>
            <dt className="text-kv-subtle text-sm">{t(`${af}.bruksareal`)}</dt>
            <dd className="mt-1 font-medium tabular-nums">
              {formatArea(arealfordeling.bruksareal.totalt)}
            </dd>
          </div>
          <div>
            <dt className="text-kv-subtle text-sm">{t(`${af}.koordinater`)}</dt>
            <dd className="mt-1 font-medium tabular-nums">
              {arealfordeling.koordinat.nord} / {arealfordeling.koordinat.ost}
            </dd>
          </div>
        </dl>

        <Table border className="w-full table-fixed">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell className="w-2/5">
                {t(`${af}.etasje`)}
              </Table.HeaderCell>
              <Table.HeaderCell className="w-1/4">
                {t(`${af}.arealtype`)}
              </Table.HeaderCell>
              <Table.HeaderCell className="w-[17.5%] text-right">
                {t(`${af}.bolig`)}
              </Table.HeaderCell>
              <Table.HeaderCell className="w-[17.5%] text-right">
                {t(`${af}.annet`)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {arealfordeling.etasjeplan.map((etasje) => (
              <Fragment key={`${etasje.etasjeplan}-${etasje.etasje}`}>
                <Table.Row>
                  <Table.HeaderCell
                    rowSpan={2}
                    scope="rowgroup"
                    className="border-r border-b-0 bg-kv-gray align-top text-kv-default"
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-semibold">{etasje.etasjeplan}</span>
                      <span className="font-normal text-kv-subtle text-sm">
                        {t(`${af}.nr`, { nr: etasje.etasje })}
                        <span aria-hidden="true"> · </span>
                        {t(`${af}.boenheter`, {
                          antall: etasje.antallBoenheter,
                        })}
                      </span>
                    </span>
                  </Table.HeaderCell>
                  <Table.HeaderCell scope="row" className="text-kv-default">
                    {t(`${af}.bruksarealRad`)}
                  </Table.HeaderCell>
                  <Table.Cell className="text-right tabular-nums">
                    {etasje.bruksareal.bolig}
                  </Table.Cell>
                  <Table.Cell className="text-right tabular-nums">
                    {etasje.bruksareal.annet}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell scope="row" className="text-kv-default">
                    {t(`${af}.bruttoarealRad`)}
                  </Table.HeaderCell>
                  <Table.Cell className="text-right tabular-nums">
                    {etasje.bruttoareal.bolig}
                  </Table.Cell>
                  <Table.Cell className="text-right tabular-nums">
                    {etasje.bruttoareal.annet}
                  </Table.Cell>
                </Table.Row>
              </Fragment>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
