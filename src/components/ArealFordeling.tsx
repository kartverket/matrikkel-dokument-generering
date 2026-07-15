import { Heading, Paragraph, Table } from "@kv-designsystem/react"
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
      <div className="flex flex-col gap-8">
        <dl className="grid grid-cols-[max-content_1fr] items-baseline gap-x-12 gap-y-3">
          <dt>
            <Paragraph data-size="lg">{t(`${af}.bebygdAreal`)}</Paragraph>
          </dt>
          <dd>
            <Paragraph data-size="lg" className="font-semibold">
              {formatArea(arealfordeling.bebygdAreal)}
            </Paragraph>
          </dd>

          <dt>
            <Paragraph data-size="lg">{t(`${af}.bruksareal`)}</Paragraph>
          </dt>
          <dd>
            <Paragraph data-size="lg" className="font-semibold">
              {formatArea(arealfordeling.bruksareal.totalt)}
            </Paragraph>
          </dd>

          <dt>
            <Paragraph data-size="lg">{t(`${af}.koordinater`)}</Paragraph>
          </dt>
          <dd>
            <Paragraph data-size="lg" className="font-semibold">
              {arealfordeling.koordinat.nord} / {arealfordeling.koordinat.ost}
            </Paragraph>
          </dd>
        </dl>

        <Table className="text-kv-subtle text-xl">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell className="border-b-0">
                {t(`${af}.etasje`)}
              </Table.HeaderCell>
              <Table.HeaderCell className="border-b-0">
                {t(`${af}.bolig`)}
              </Table.HeaderCell>
              <Table.HeaderCell className="border-b-0">
                {t(`${af}.annet`)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {arealfordeling.etasjeplan.map((etasje) => (
              <Fragment key={`${etasje.etasjeplan}-${etasje.etasje}`}>
                <Table.Row>
                  <Table.HeaderCell
                    colSpan={3}
                    scope="colgroup"
                    className="border-b-0 pt-8"
                  >
                    <span className="flex items-baseline gap-4">
                      <Heading
                        level={3}
                        data-size="sm"
                        asChild
                        className="font-medium text-kv-default"
                      >
                        <span>{etasje.etasjeplan}</span>
                      </Heading>
                      <span className="font-normal text-kv-subtle">
                        {t(`${af}.nr`, { nr: etasje.etasje })}
                      </span>
                      <span className="font-normal text-kv-subtle">
                        {t(`${af}.boenheter`, {
                          antall: etasje.antallBoenheter,
                        })}
                      </span>
                    </span>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="text-kv-default">
                    {t(`${af}.bruksarealRad`)}
                  </Table.Cell>
                  <Table.Cell className="">
                    {etasje.bruksareal.bolig}
                  </Table.Cell>
                  <Table.Cell>{etasje.bruksareal.annet}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="text-kv-default">
                    {t(`${af}.bruttoarealRad`)}
                  </Table.Cell>
                  <Table.Cell>{etasje.bruttoareal.bolig}</Table.Cell>
                  <Table.Cell>{etasje.bruttoareal.annet}</Table.Cell>
                </Table.Row>
              </Fragment>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
