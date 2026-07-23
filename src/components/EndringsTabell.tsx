import { Heading, Table } from "@kv-designsystem/react"
import type { i18n as I18n } from "i18next"
import { useTranslation } from "react-i18next"
import { formatDate } from "../lib/utils/formatDate.ts"

type EndringsRad = { lopeNr: number } & Record<string, unknown>

type Props = {
  endringer: EndringsRad[]
  tKey: string
}

const BE = "rapport.BYG0011.byggEndringer" as const

function formatCell(
  value: unknown,
  i18n: Pick<I18n, "language" | "t">,
): string {
  if (value == null || value === "") return ""

  switch (typeof value) {
    case "boolean":
      return value ? i18n.t(`${BE}.ja`) : i18n.t(`${BE}.nei`)
    case "string":
      return /^\d{4}-\d{2}-\d{2}/.test(value) // Sjekker om strengen ser ut som en dato (YYYY-MM-DD)
        ? formatDate(i18n, value, value)
        : value
    case "number":
      return String(value)
    default:
      return JSON.stringify(value)
  }
}

export default function EndringsTabell({ endringer, tKey }: Props) {
  const { t, i18n } = useTranslation()
  const tr = t as (path: string) => string // Typecaste t til en funksjon som tar en string literal

  const kolonner = Array.from(
    endringer.reduce((set, rad) => {
      for (const key of Object.keys(rad)) {
        if (key !== "lopeNr") set.add(key)
      }
      return set
    }, new Set<string>()),
  )

  return (
    <div className="my-4 space-y-4">
      <span className="flex items-center gap-4">
        <Heading level={3} data-size="sm" className="min-w-max font-medium">
          {tr(`${tKey}.tittel`)}
        </Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      {endringer.length === 0 ? (
        <p className="text-kv-subtle">{tr(`${tKey}.ingenEndring`)}</p>
      ) : (
        <Table className="w-full">
          <Table.Head>
            <Table.Row className="font-regular text-kv-subtle">
              <Table.HeaderCell />
              {kolonner.map((k) => (
                <Table.HeaderCell key={k}>
                  {tr(`${tKey}.${k}`)}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {endringer.map((rad, i) => (
              <Table.Row key={String(i)} className="even:bg-kv-green-subtle">
                <Table.HeaderCell scope="row" className="w-32 align-top">
                  {`${tr(`${BE}.lopeNr`)} ${rad.lopeNr}`}
                </Table.HeaderCell>
                {kolonner.map((k) => (
                  <Table.Cell
                    key={k}
                    className="max-w-96 whitespace-normal align-top text-kv-default"
                  >
                    {formatCell(rad[k], i18n)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  )
}
