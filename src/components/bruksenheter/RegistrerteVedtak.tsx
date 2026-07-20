import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Bygningsendring } from "../../lib/schema/reports/bygg/bygg0011/index"
import { formatDate } from "../../lib/utils/formatDate"
import { KategoriSeksjon } from "./KategoriSeksjon"

interface Props {
  endringer: Bygningsendring[]
}

export function RegistrerteVedtak({ endringer }: Props) {
  const { i18n, t } = useTranslation()
  const translationKey = "rapport.BYG0011.registrerteVedtak"
  const bruksenhetKey = "rapport.BYG0011.bruksenheter"
  const tom = t("tom")

  const formatDato = (dato: string | null) =>
    formatDate(i18n, dato, tom, { dateStyle: "short" })

  const sorterte = endringer.toSorted((a, b) => b.lopenr - a.lopenr)

  return (
    <KategoriSeksjon
      title={t(`${translationKey}.title`)}
      emptyText={t(`${bruksenhetKey}.ingenEndringer`)}
      isEmpty={sorterte.length === 0}
    >
      <Table className="w-full">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className="w-32">
              {t(`${bruksenhetKey}.endring`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.rammetillatelse`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.igangsettingstillatelse`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.midlertidigBrukstillatelse`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.ferdigattest`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.tattIBruk`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.utgaattRevet`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sorterte.map((endring) => (
            <Table.Row key={endring.id}>
              <Table.HeaderCell scope="row" className="text-kv-default">
                {t(`${bruksenhetKey}.endringKort`, { lopenr: endring.lopenr })}
              </Table.HeaderCell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring.datoer.rammetillatelse)}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring.datoer.igangsettingstillatelse)}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring.datoer.midlertidigBrukstillatelse)}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring.datoer.ferdigattest)}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring.datoer.tattIBruk)}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring.datoer.utgaattRevet)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </KategoriSeksjon>
  )
}
