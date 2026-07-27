import { Table, Heading } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { erAngitt, harAngittVerdi } from "./utils/erAngitt.ts"

interface Props {
  sokevinduKriterier: NonNullable<Utvalgskriterier>["sokevindu"]
}

export function SokevinduKriterier({ sokevinduKriterier }: Props) {
  const { t, i18n } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const { nord, ost, syd, vest } = sokevinduKriterier || {}
  if (
    !sokevinduKriterier ||
    !harAngittVerdi(sokevinduKriterier) ||
    [nord, ost, syd, vest].every((verdi) => verdi === 0)
  )
    return null

  const numberFormatter = new Intl.NumberFormat(
    i18n.resolvedLanguage ?? i18n.language,
    {
      maximumFractionDigits: 2,
    },
  )

  const fmt = (v: number | undefined) =>
    v === undefined ? "" : numberFormatter.format(v)

  return (
    <section>
      <span className="flex items-center gap-4 mb-2">
        <Heading level={3}>{t(`${uk}.sokevindu.tittel`)}</Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t(`${uk}.sokevindu.nord`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${uk}.sokevindu.ost`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${uk}.sokevindu.syd`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${uk}.sokevindu.vest`)}</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{fmt(nord)}</Table.Cell>
            <Table.Cell>{fmt(ost)}</Table.Cell>
            <Table.Cell>{fmt(syd)}</Table.Cell>
            <Table.Cell>{fmt(vest)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
