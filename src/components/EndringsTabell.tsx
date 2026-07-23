import { Heading, Table } from "@kv-designsystem/react"
import type { i18n as I18n } from "i18next"
import { useTranslation } from "react-i18next"
import { formatDate } from "../lib/utils/formatDate.ts"

type EndringsRad = { lopeNr: number } & Record<string, unknown>

type Props = {
  endringer: EndringsRad[]
  translationPrefix: string
}

const ENDRING = "rapport.BYG0011.byggEndringer" as const

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T|$)/

function formatCell(
  value: unknown,
  i18n: Pick<I18n, "language" | "t">,
  t: (key: string) => string,
): string {
  if (value == null || value === "") return ""
  if (typeof value === "boolean")
    return value ? t(`${ENDRING}.ja`) : t(`${ENDRING}.nei`)
  if (typeof value === "string" && ISO_DATE.test(value))
    return formatDate(i18n, value, "")
  if (typeof value === "number") return String(value)
  if (typeof value === "string") return value
  return JSON.stringify(value)
}

export default function EndringsTabell({
  endringer,
  translationPrefix,
}: Props) {
  const { t, i18n } = useTranslation()
  const tr = t as (path: string) => string

  if (endringer.length === 0) return null

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
          {tr(`${translationPrefix}.tittel`)}
        </Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      <Table className="w-full">
        <Table.Head>
          <Table.Row className="font-regular text-kv-subtle">
            <Table.HeaderCell />
            {kolonner.map((k) => (
              <Table.HeaderCell key={k}>
                {tr(`${translationPrefix}.${k}`)}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {endringer.map((rad, i) => (
            <Table.Row key={String(i)} className="even:bg-kv-green-subtle">
              <Table.HeaderCell scope="row" className="w-32 align-top">
                {`${tr(`${ENDRING}.lopeNr`)} ${rad.lopeNr}`}
              </Table.HeaderCell>
              {kolonner.map((k) => (
                <Table.Cell
                  key={k}
                  className="max-w-96 whitespace-normal align-top text-kv-default"
                >
                  {formatCell(rad[k], i18n, tr)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
