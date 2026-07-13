import { Card, Heading, Table, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { Utvalgskriterier as UtvalgskriterierType } from "../lib/schema/byggRapportSchema"

export function Utvalgskriterier({
  kriterier,
}: {
  kriterier: UtvalgskriterierType
}) {
  const { t } = useTranslation()
  const uk = "rapport.BYG0011.utvalgskriterier"
  const ikkeAngitt = t(`${uk}.ikkeAngitt`)
  const dateFormatter = new Intl.DateTimeFormat("nb-NO")
  const numberFormatter = new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: 2,
  })

  return (
    <section className="my-16 flex flex-col gap-10">
      <Heading className="font-normal text-kv-subtle text-lg">
        {t(`${uk}.title`)}
      </Heading>

      <section className="break-inside-avoid">
        <Heading level={3} data-size="sm" className="mb-4 font-medium">
          {t(`${uk}.grupper.omfang`)}
        </Heading>
        <Table zebra border className="w-full table-fixed">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.felt.bestaaendeBygg`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(`${uk}.${kriterier.omfang.bestaaendeBygg ? "ja" : "nei"}`)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.utgaatteBygg`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(`${uk}.${kriterier.omfang.utgaatteBygg ? "ja" : "nei"}`)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.bygninger`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(`${uk}.${kriterier.omfang.bygninger ? "ja" : "nei"}`)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.bygningsendringer`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${kriterier.omfang.bygningsendringer ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.frededeBygninger`)}
              </Table.HeaderCell>
              <Table.Cell>{kriterier.omfang.frededeBygninger}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>

      <section className="break-inside-avoid">
        <Heading level={3} data-size="sm" className="mb-4 font-medium">
          {t(`${uk}.grupper.bygning`)}
        </Heading>
        <Table zebra border className="w-full table-fixed">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.felt.bygningsnr`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.bygning.bygningsnr ?? ikkeAngitt}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.lopenr`)}
              </Table.HeaderCell>
              <Table.Cell>{kriterier.bygning.lopenr ?? ikkeAngitt}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.bygningstyper`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.bygning.bygningstyper.length > 0 ? (
                  <span className="flex flex-wrap gap-2">
                    {kriterier.bygning.bygningstyper.map(({ kode, navn }) => (
                      <Tag key={kode} data-color="accent" variant="outline">
                        {kode} – {navn}
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

      <section className="break-inside-avoid">
        <Heading level={3} data-size="sm" className="mb-4 font-medium">
          {t(`${uk}.grupper.adresse`)}
        </Heading>
        <Table zebra border className="w-full table-fixed">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.felt.adressekode`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.adresse.adressekode ?? ikkeAngitt}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.bruksenhetsnr`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.adresse.bruksenhetsnr ?? ikkeAngitt}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.adressenavn`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.adresse.adressenavn ?? ikkeAngitt}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.nr`)}
              </Table.HeaderCell>
              <Table.Cell>{kriterier.adresse.nr ?? ikkeAngitt}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.bokstav`)}
              </Table.HeaderCell>
              <Table.Cell>{kriterier.adresse.bokstav ?? ikkeAngitt}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.utenBokstav`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(`${uk}.${kriterier.adresse.utenBokstav ? "ja" : "nei"}`)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.tilleggsnavn`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.adresse.tilleggsnavn ?? ikkeAngitt}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>

      <div className="grid break-inside-avoid grid-cols-2 gap-6">
        <Card variant="tinted" className="border border-kv-border">
          <Card.Block className="p-6">
            <Heading level={3} data-size="sm" className="mb-5 font-medium">
              {t(`${uk}.grupper.matrikkelenhet`)}
            </Heading>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <dt className="text-kv-subtle">{t(`${uk}.felt.gnr`)}</dt>
                <dd className="mt-1 font-medium">
                  {kriterier.matrikkelenhet.gnr}
                </dd>
              </div>
              <div>
                <dt className="text-kv-subtle">{t(`${uk}.felt.bnr`)}</dt>
                <dd className="mt-1 font-medium">
                  {kriterier.matrikkelenhet.bnr}
                </dd>
              </div>
              <div>
                <dt className="text-kv-subtle">{t(`${uk}.felt.fnr`)}</dt>
                <dd className="mt-1 font-medium">
                  {kriterier.matrikkelenhet.fnr ?? ikkeAngitt}
                </dd>
              </div>
              <div>
                <dt className="text-kv-subtle">{t(`${uk}.felt.snr`)}</dt>
                <dd className="mt-1 font-medium">
                  {kriterier.matrikkelenhet.snr ?? ikkeAngitt}
                </dd>
              </div>
            </dl>
          </Card.Block>
        </Card>

        <Card variant="tinted" className="border border-kv-border">
          <Card.Block className="p-6">
            <Heading level={3} data-size="sm" className="mb-5 font-medium">
              {t(`${uk}.grupper.hjemmelshaver`)}
            </Heading>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-full">
                <dt className="text-kv-subtle">
                  {t(`${uk}.felt.foedselsEllerOrgnr`)}
                </dt>
                <dd className="mt-1 font-medium">
                  {kriterier.hjemmelshaver.foedselsEllerOrgnr ?? ikkeAngitt}
                </dd>
              </div>
              <div>
                <dt className="text-kv-subtle">{t(`${uk}.felt.etternavn`)}</dt>
                <dd className="mt-1 font-medium">
                  {kriterier.hjemmelshaver.etternavn ?? ikkeAngitt}
                </dd>
              </div>
              <div>
                <dt className="text-kv-subtle">{t(`${uk}.felt.fornavn`)}</dt>
                <dd className="mt-1 font-medium">
                  {kriterier.hjemmelshaver.fornavn ?? ikkeAngitt}
                </dd>
              </div>
            </dl>
          </Card.Block>
        </Card>
      </div>

      <section className="break-inside-avoid">
        <Heading level={3} data-size="sm" className="mb-4 font-medium">
          {t(`${uk}.grupper.bygningsstatus`)}
        </Heading>
        <Table zebra border className="w-full table-fixed">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.felt.naavaerende`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.bygningsstatus.naavaerende.length > 0 ? (
                  <span className="flex flex-wrap gap-2">
                    {kriterier.bygningsstatus.naavaerende.map((status) => (
                      <Tag key={status} data-color="accent" variant="outline">
                        {status}
                      </Tag>
                    ))}
                  </span>
                ) : (
                  ikkeAngitt
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.tidligere`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.bygningsstatus.tidligere.length > 0 ? (
                  <span className="flex flex-wrap gap-2">
                    {kriterier.bygningsstatus.tidligere.map((status) => (
                      <Tag key={status} data-color="accent" variant="outline">
                        {status}
                      </Tag>
                    ))}
                  </span>
                ) : (
                  ikkeAngitt
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.periodeFra`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.bygningsstatus.periodeFra
                  ? dateFormatter.format(
                      new Date(kriterier.bygningsstatus.periodeFra),
                    )
                  : ikkeAngitt}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.periodeTil`)}
              </Table.HeaderCell>
              <Table.Cell>
                {kriterier.bygningsstatus.periodeTil
                  ? dateFormatter.format(
                      new Date(kriterier.bygningsstatus.periodeTil),
                    )
                  : ikkeAngitt}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>

      <section className="break-inside-avoid">
        <Heading level={3} data-size="sm" className="mb-4 font-medium">
          {t(`${uk}.grupper.sokevindu`)}
        </Heading>
        <Table zebra border className="w-full table-fixed">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.felt.nedreVenstre`)} – {t(`${uk}.felt.ost`)}
              </Table.HeaderCell>
              <Table.Cell>
                {numberFormatter.format(kriterier.sokevindu.nedreVenstre.ost)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.nedreVenstre`)} – {t(`${uk}.felt.nord`)}
              </Table.HeaderCell>
              <Table.Cell>
                {numberFormatter.format(kriterier.sokevindu.nedreVenstre.nord)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.ovreHoeyre`)} – {t(`${uk}.felt.ost`)}
              </Table.HeaderCell>
              <Table.Cell>
                {numberFormatter.format(kriterier.sokevindu.ovreHoeyre.ost)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.felt.ovreHoeyre`)} – {t(`${uk}.felt.nord`)}
              </Table.HeaderCell>
              <Table.Cell>
                {numberFormatter.format(kriterier.sokevindu.ovreHoeyre.nord)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>

      <section className="break-inside-avoid">
        <Heading level={3} data-size="sm" className="mb-4 font-medium">
          {t(`${uk}.grupper.subrapporter`)}
        </Heading>
        <Table zebra border className="w-full table-fixed">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell scope="row" className="w-1/3">
                {t(`${uk}.subrapporter.etasjer`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(`${uk}.${kriterier.subrapporter.etasjer ? "ja" : "nei"}`)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.subrapporter.bruksenheter`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${kriterier.subrapporter.bruksenheter ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.subrapporter.tiltakshavere`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${kriterier.subrapporter.tiltakshavere ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.subrapporter.kontaktpersoner`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${kriterier.subrapporter.kontaktpersoner ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.subrapporter.hjemmelshavere`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${kriterier.subrapporter.hjemmelshavere ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="row">
                {t(`${uk}.subrapporter.kulturminner`)}
              </Table.HeaderCell>
              <Table.Cell>
                {t(
                  `${uk}.${kriterier.subrapporter.kulturminner ? "ja" : "nei"}`,
                )}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>
    </section>
  )
}
