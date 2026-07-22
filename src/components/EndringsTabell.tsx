import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BygningsEndring } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"

type Endring = NonNullable<BygningsEndring>

const byggEndring = "rapport.BYG0011.byggEndringer" as const

export default function EndringsTabell({
  endringer,
}: {
  endringer: Endring[]
}) {
  const { t, i18n } = useTranslation()
  const tr = t as (path: string) => string

  if (endringer.length === 0) return null

  return (
    <div className="my-4 space-y-4">
      <span className="flex items-center gap-4">
        <Heading level={3} data-size="sm" className="min-w-max font-medium">
          {tr(`${byggEndring}.tittel`)}
        </Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>
      {/*       
      <Table className="w-full">
        <Table.Head>
          <Table.Row className="font-regular text-kv-subtle">
            <Table.HeaderCell />
            {Object.keys(endringer[0]).map((k) => (
              <Table.HeaderCell key={k}>
                {tr(`${byggEndring}.${k}`)}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Head>
        {rader.map(({ lopeNr, celler }) => (
          <Table.Body key={lopeNr} className="even:bg-kv-green-subtle">
            <Table.Row>
              <Table.HeaderCell scope="row" className="align-top">
                {`${tr(`${byggEndring}.lopeNr`)} ${lopeNr}`}
              </Table.HeaderCell>
              {celler.map((c, j) => (
                <Table.Cell
                  className="truncate text-kv-default"
                  key={kolonner[j]}
                >
                  {c}
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Body>
        ))}
      </Table> */}
    </div>
  )
}
