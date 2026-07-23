import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  omfangsKriterier: NonNullable<Utvalgskriterier>["omfang"]
}

export function OmfangsKriterier({ omfangsKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  if (!harAngittVerdi(omfangsKriterier)) return null

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.omfang.tittel`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          {erAngitt(omfangsKriterier?.inkluderBestaaendeBygg) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.omfang.inkluderBestaaendeBygg`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${omfangsKriterier.inkluderBestaaendeBygg ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(omfangsKriterier?.inkluderUtgaatteBygg) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.omfang.inkluderUtgaatteBygg`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${omfangsKriterier.inkluderUtgaatteBygg ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(omfangsKriterier?.inkluderBygninger) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.omfang.inkluderBygninger`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${omfangsKriterier.inkluderBygninger ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(omfangsKriterier?.inkluderBygningsendringer) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.omfang.inkluderBygningsendringer`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${omfangsKriterier.inkluderBygningsendringer ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
          {erAngitt(omfangsKriterier?.inkluderFrededeBygninger) && (
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.omfang.inkluderFrededeBygninger`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${omfangsKriterier.inkluderFrededeBygninger ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </section>
  )
}
