import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BygningsEndring } from "../../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { formatDate } from "../../lib/utils/formatDate"
import { KategoriSeksjon } from "./KategoriSeksjon"

interface Props {
  endringer: BygningsEndring[]
}

export function RegistrerteVedtak({ endringer }: Props) {
  const { i18n, t } = useTranslation()
  const translationKey = "rapport.BYG0011.registrerteVedtak"
  const bruksenhetKey = "rapport.BYG0011.bruksenheter"
  const tom = t("tom")

  const formatDato = (dato: string | null | undefined) =>
    formatDate(i18n, dato, tom, { dateStyle: "short" })

  const sorterte = endringer?.toSorted(
    (a, b) => (a?.lopeNr ?? 0) - (b?.lopeNr ?? 0),
  )

  return (
    <KategoriSeksjon
      title={t(`${translationKey}.title`)}
      emptyText={t(`${bruksenhetKey}.ingenEndringer`)}
      isEmpty={sorterte.length === 0}
    >
      <Table className="w-full">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
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
            <Table.Row key={endring?.lopeNr}>
              <Table.HeaderCell scope="row" className="text-kv-default">
                {t(`${bruksenhetKey}.endringKort`, { lopeNr: endring?.lopeNr })}
              </Table.HeaderCell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring?.byggDatoEndring?.rammetillatelse)}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring?.byggDatoEndring?.igangsettingstillatelse)}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(
                  endring?.byggDatoEndring?.midlertidigBrukstillatelse,
                )}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring?.byggDatoEndring?.ferdigattest)}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring?.byggDatoEndring?.tattIBruk)}
              </Table.Cell>
              <Table.Cell className="tabular-nums">
                {formatDato(endring?.byggDatoEndring?.utgaattRevet)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </KategoriSeksjon>
  )
}
