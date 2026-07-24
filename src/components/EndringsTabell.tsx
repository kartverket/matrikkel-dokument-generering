import { Heading, Table } from "@kv-designsystem/react"
import type { i18n as I18n } from "i18next"
import { useTranslation } from "react-i18next"
import { formatDate } from "../lib/utils/formatDate.ts"

type EndringsRad = { lopeNr: number } & Record<string, unknown>

type Props = {
  endringer: EndringsRad[]
  seksjon: string
}

function formatCell(
  value: unknown,
  i18n: Pick<I18n, "language" | "t">,
): string {
  if (value == null || value === "") return ""

  switch (typeof value) {
    case "boolean":
      return value
        ? i18n.t(`rapport.BYG0011.byggEndringer.ja`)
        : i18n.t(`rapport.BYG0011.byggEndringer.nei`)
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

export default function EndringsTabell({ endringer, seksjon }: Props) {
  const { t, i18n } = useTranslation()
  const tKey = `rapport.BYG0011.byggEndringer.${seksjon}` as const

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
          {t(`${tKey}.tittel`, { defaultValue: "" })}
        </Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      {endringer.length === 0 ? (
        <p className="text-kv-subtle">
          {t(`${tKey}.ingenEndring`, { defaultValue: "" })}
        </p>
      ) : (
        <Table className="w-full">
          <Table.Head>
            <Table.Row className="font-regular text-kv-subtle">
              <Table.HeaderCell />
              {kolonner.map((kolonne) => (
                <Table.HeaderCell key={kolonne}>
                  {t(`${tKey}.${kolonne}`, { defaultValue: kolonne })}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {endringer.map((rad, i) => (
              <Table.Row key={String(i)} className="even:bg-kv-green-subtle">
                <Table.HeaderCell
                  scope="row"
                  className="w-32 align-top break-inside-avoid"
                >
                  {`${t(`rapport.BYG0011.byggEndringer.lopeNr`)} ${rad.lopeNr}`}
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
