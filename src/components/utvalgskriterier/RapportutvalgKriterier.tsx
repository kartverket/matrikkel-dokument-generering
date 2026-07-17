import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Utvalgskriterier } from "../../lib/schema/reports/BYG0011"

interface Props {
  omfangsKriterier: Utvalgskriterier["omfang"]
}

export function RapportutvalgKriterier({ omfangsKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"

  return (
    <section className="break-inside-avoid">
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.grupper.omfang`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell scope="row" className="w-1/3">
              {t(`${uk}.felt.bestaaendeBygg`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${omfangsKriterier?.inkluderBestaaendeBygg ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.utgaatteBygg`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${omfangsKriterier?.inkluderUtgaatteBygg ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.bygninger`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(`${uk}.${omfangsKriterier?.inkluderBygninger ? "ja" : "nei"}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.bygningsendringer`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${omfangsKriterier?.inkluderBygningsendringer ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.felt.frededeBygninger`)}
            </Table.HeaderCell>
            <Table.Cell>
              {t(
                `${uk}.${omfangsKriterier?.inkluderFrededeBygninger ? "ja" : "nei"}`,
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
