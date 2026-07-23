import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"

const BE = "rapport.BYG0011.byggEndringer" as const
const AREAL = `${BE}.areal` as const

export type ArealRad = {
  etasjeplan: string
  antallBoenheter?: number
  boligBra?: number
  annetBra?: number
  sumBra?: number
  boligBta?: number
  annetBta?: number
  sumBta?: number
}

export type ArealSum = Omit<ArealRad, "etasjeplan"> & {
  bya?: number
}

export type ArealGruppe = {
  lopeNr: number
  rader: ArealRad[]
  sum: ArealSum
}

type Props = {
  grupper: ArealGruppe[]
}

const num = (v: number | undefined) => (v == null ? "" : String(v))

export default function ArealTabell({ grupper }: Props) {
  const { t } = useTranslation()
  const tr = t as (path: string) => string

  if (grupper.length === 0) return null

  return (
    <div className="my-4 space-y-4">
      <span className="flex items-center gap-4">
        <Heading level={3} data-size="sm" className="min-w-max font-medium">
          {tr(`${AREAL}.tittel`)}
        </Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      <Table className="w-full">
        <Table.Head>
          <Table.Row className="font-regular text-kv-subtle">
            <Table.HeaderCell>{tr(`${BE}.lopeNr`)}</Table.HeaderCell>
            <Table.HeaderCell>{tr(`${AREAL}.etasjeplan`)}</Table.HeaderCell>
            <Table.HeaderCell>
              {tr(`${AREAL}.antallBoenheter`)}
            </Table.HeaderCell>
            <Table.HeaderCell>{tr(`${AREAL}.boligBra`)}</Table.HeaderCell>
            <Table.HeaderCell>{tr(`${AREAL}.annetBra`)}</Table.HeaderCell>
            <Table.HeaderCell>{tr(`${AREAL}.sumBra`)}</Table.HeaderCell>
            <Table.HeaderCell>{tr(`${AREAL}.boligBta`)}</Table.HeaderCell>
            <Table.HeaderCell>{tr(`${AREAL}.annetBta`)}</Table.HeaderCell>
            <Table.HeaderCell>{tr(`${AREAL}.sumBta`)}</Table.HeaderCell>
            <Table.HeaderCell>{tr(`${AREAL}.bya`)}</Table.HeaderCell>
          </Table.Row>
        </Table.Head>

        {grupper.map(({ lopeNr, rader, sum }) => (
          <Table.Body key={lopeNr} className="even:bg-kv-green-subtle">
            {rader.map((r, i) => (
              <Table.Row key={`${lopeNr}-${r.etasjeplan}`}>
                {i === 0 && (
                  <Table.HeaderCell
                    scope="row"
                    rowSpan={rader.length}
                    className="align-top w-32"
                  >
                    {`${tr(`${BE}.lopeNr`)} ${lopeNr}`}
                  </Table.HeaderCell>
                )}
                <Table.Cell>{r.etasjeplan}</Table.Cell>
                <Table.Cell>{num(r.antallBoenheter)}</Table.Cell>
                <Table.Cell>{r.boligBra}</Table.Cell>
                <Table.Cell>{r.annetBra}</Table.Cell>
                <Table.Cell>{r.sumBra}</Table.Cell>
                <Table.Cell>{r.boligBta}</Table.Cell>
                <Table.Cell>{r.annetBta}</Table.Cell>
                <Table.Cell>{r.sumBta}</Table.Cell>
                <Table.Cell />
              </Table.Row>
            ))}

            <Table.Row className="font-medium">
              <Table.HeaderCell scope="row" className="align-top">
                {tr(`${AREAL}.sum`)}
              </Table.HeaderCell>
              <Table.Cell>{num(rader.length)}</Table.Cell>
              <Table.Cell>{num(sum.antallBoenheter)}</Table.Cell>
              <Table.Cell>{sum.boligBra}</Table.Cell>
              <Table.Cell>{sum.annetBra}</Table.Cell>
              <Table.Cell>{sum.sumBra}</Table.Cell>
              <Table.Cell>{sum.boligBta}</Table.Cell>
              <Table.Cell>{sum.annetBta}</Table.Cell>
              <Table.Cell>{sum.sumBta}</Table.Cell>
              <Table.Cell>{sum.bya}</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  )
}
