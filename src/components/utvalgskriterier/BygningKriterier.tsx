import { Heading, Table, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../../lib/i18n/koder/oversettKode.ts"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"

interface Props {
  bygningKriterier: NonNullable<Utvalgskriterier>["bygning"]
}

export function BygningKriterier({ bygningKriterier }: Props) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const ikkeAngitt = t(`${uk}.ikkeAngitt`)

  return (
    <section>
      <Heading level={3} data-size="sm" className="mb-4 font-medium">
        {t(`${uk}.bygning.tittel`)}
      </Heading>
      <Table zebra border className="w-full table-fixed">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell scope="row" className="w-1/3">
              {t(`${uk}.bygning.bygningsNr`)}
            </Table.HeaderCell>
            <Table.Cell>
              {bygningKriterier?.bygningsNr ?? ikkeAngitt}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.bygning.lopeNr`)}
            </Table.HeaderCell>
            <Table.Cell>{bygningKriterier?.lopeNr ?? ikkeAngitt}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row">
              {t(`${uk}.bygning.bygningstyper`)}
            </Table.HeaderCell>
            <Table.Cell>
              {bygningKriterier?.bygningstyper &&
              bygningKriterier.bygningstyper.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {bygningKriterier.bygningstyper.map((kode) => (
                    <Tag key={kode} data-color="accent" variant="outline">
                      {oversettKode({ t, kodeverk: "bygningstype", kode })}
                    </Tag>
                  ))}
                </span>
              ) : (
                ikkeAngitt
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </section>
  )
}
