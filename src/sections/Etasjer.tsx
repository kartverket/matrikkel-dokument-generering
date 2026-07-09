import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningsendring } from "../lib/schema/byggRapportSchema"
import { formatArea } from "../lib/utils/format"

interface Props {
  etasjeEndringer?: Bygningsendring[] | null
}

export function EtasjerSection({ etasjeEndringer }: Props) {
  const { t } = useTranslation()

  if (!etasjeEndringer || etasjeEndringer.length === 0) return null

  const rader = etasjeEndringer.flatMap((endring) =>
    endring.etasjeplan.map((etasje) => ({ endring, etasje })),
  )

  if (rader.length === 0) return null

  return (
    <section>
      <h2>{t("rapport.BYG0011.etasjer.title")}</h2>
      <Table zebra border>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              {t("rapport.BYG0011.etasjer.endring")}
            </Table.HeaderCell>
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
          {rader.map(({ endring, etasje: e }) => (
            <Table.Row key={`${endring.id}-${e.etasjeplan}-${e.etasje}`}>
              <Table.Cell>
                {endring.lopenr === 0
                  ? t("rapport.BYG0011.etasjer.opprinnelig")
                  : `${endring.lopenr}`}
              </Table.Cell>
              <Table.Cell>{e.etasjeplan}</Table.Cell>
              <Table.Cell>{e.etasje}</Table.Cell>
              <Table.Cell>{e.antallBoenheter}</Table.Cell>
              <Table.Cell>{formatArea(e.bruksareal.bolig)}</Table.Cell>
              <Table.Cell>{formatArea(e.bruksareal.annet)}</Table.Cell>
              <Table.Cell>{formatArea(e.bruksareal.totalt)}</Table.Cell>
              <Table.Cell>{formatArea(e.bruttoareal.bolig)}</Table.Cell>
              <Table.Cell>{formatArea(e.bruttoareal.annet)}</Table.Cell>
              <Table.Cell>{formatArea(e.bruttoareal.totalt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}
