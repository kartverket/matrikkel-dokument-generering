import { Heading, Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"

export type ArealRad = {
  etasjeplan: string
  etasje: number
  antallBoenheter?: number
  boligBra?: number
  annetBra?: number
  sumBra?: number
  boligBta?: number
  annetBta?: number
  sumBta?: number
}

export type ArealSum = Omit<ArealRad, "etasjeplan" | "etasje"> & {
  bya?: number
}

export type ArealEndring = {
  lopeNr: number
  etasjeRader: ArealRad[]
  sum: ArealSum
}

type Props = {
  arealEndringer: ArealEndring[]
}

export default function ArealTabell({ arealEndringer }: Props) {
  const { t } = useTranslation()
  const tKey = `rapport.BYG0011.byggEndringer.areal` as const

  return (
    <div className="my-4 space-y-4">
      <span className="flex items-center gap-4">
        <Heading level={3} data-size="sm" className="min-w-max font-medium">
          {t(`${tKey}.tittel`)}
        </Heading>
        <hr className="w-full border border-kv-green-border" />
      </span>

      {arealEndringer.length === 0 ? (
        <p className="text-kv-subtle">{t(`${tKey}.ingenArealendring`)}</p>
      ) : (
        <Table className="w-full">
          <Table.Head>
            <Table.Row className="font-regular text-kv-subtle">
              <Table.HeaderCell>
                {t(`rapport.BYG0011.byggEndringer.lopeNr`)}
              </Table.HeaderCell>
              <Table.HeaderCell>{t(`${tKey}.etasjeplan`)}</Table.HeaderCell>
              <Table.HeaderCell>
                {t(`${tKey}.antallBoenheter`)}
              </Table.HeaderCell>
              <Table.HeaderCell>{t(`${tKey}.boligBra`)}</Table.HeaderCell>
              <Table.HeaderCell>{t(`${tKey}.annetBra`)}</Table.HeaderCell>
              <Table.HeaderCell>{t(`${tKey}.sumBra`)}</Table.HeaderCell>
              <Table.HeaderCell>{t(`${tKey}.boligBta`)}</Table.HeaderCell>
              <Table.HeaderCell>{t(`${tKey}.annetBta`)}</Table.HeaderCell>
              <Table.HeaderCell>{t(`${tKey}.sumBta`)}</Table.HeaderCell>
              <Table.HeaderCell>{t(`${tKey}.bya`)}</Table.HeaderCell>
            </Table.Row>
          </Table.Head>

          {arealEndringer.map(({ lopeNr, etasjeRader, sum }) => (
            <Table.Body
              key={lopeNr}
              className="even:bg-kv-green-subtle break-inside-avoid"
            >
              {etasjeRader.map((r, i) => (
                <Table.Row key={`${lopeNr}-${r.etasjeplan}-${r.etasje}`}>
                  {i === 0 && (
                    <Table.HeaderCell
                      scope="row"
                      rowSpan={etasjeRader.length}
                      className="w-32 align-top"
                    >
                      {`${t(`rapport.BYG0011.byggEndringer.lopeNr`)} ${lopeNr}`}
                    </Table.HeaderCell>
                  )}
                  <Table.Cell>{r.etasjeplan}</Table.Cell>
                  <Table.Cell>{r.antallBoenheter}</Table.Cell>
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
                  {t(`${tKey}.sum`)}
                </Table.HeaderCell>
                <Table.Cell>{etasjeRader.length}</Table.Cell>
                <Table.Cell>{sum.antallBoenheter}</Table.Cell>
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
      )}
    </div>
  )
}
