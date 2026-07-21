import { Table } from "@kv-designsystem/react"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import type {
  Bruksenhet,
  Bygningsendring,
  Etasjeplan,
} from "../lib/schema/reports/bygg/bygg0011/index"
import { summerAreal } from "../lib/utils/arealLinje"
import { formatArea } from "../lib/utils/formatArea"
import { KategoriSeksjon } from "./bruksenheter/KategoriSeksjon"

interface Props {
  arealfordeling: Bruksenhet["arealfordeling"]
  endringer: Bygningsendring[]
}

interface Gruppe {
  key: string
  radeLabel: string
  etasjer: Etasjeplan[]
  erGjeldende?: boolean
}

function byggGrupper(
  arealfordeling: Bruksenhet["arealfordeling"],
  endringer: Bygningsendring[],
  endringLabel: (lopenr: number) => string,
  gjeldendeLabel: string,
): Gruppe[] {
  const grupper: Gruppe[] = endringer
    .toSorted((a, b) => a.lopenr - b.lopenr)
    .map((endring) => ({
      key: `endring-${endring.id}`,
      radeLabel: endringLabel(endring.lopenr),
      etasjer: endring.etasjeplan,
    }))

  grupper.push({
    key: "gjeldende",
    radeLabel: gjeldendeLabel,
    etasjer: arealfordeling.etasjeplan,
    erGjeldende: true,
  })

  return grupper
}

export default function Arealfordeling({ arealfordeling, endringer }: Props) {
  const { t } = useTranslation()
  const af = "rapport.BYG0011.arealfordeling"
  const bruksenhetKey = "rapport.BYG0011.bruksenheter"
  const etasjerKey = "rapport.BYG0011.etasjer"

  const grupper = byggGrupper(
    arealfordeling,
    endringer,
    (lopenr) => t(`${bruksenhetKey}.endringKort`, { lopenr }),
    t(`${bruksenhetKey}.gjeldende`),
  )

  const antallRader = grupper.reduce(
    (sum, g) => sum + Math.max(g.etasjer.length, 1),
    0,
  )

  return (
    <KategoriSeksjon
      title={t(`${af}.title`)}
      emptyText={t(`${bruksenhetKey}.ingenEndringer`)}
      isEmpty={antallRader === 0}
    >
      <Table className="w-full">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{t(`${af}.etasje`)}</Table.HeaderCell>
            <Table.HeaderCell className="text-right">
              {t(`${etasjerKey}.antallBoenheter`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right">
              {t(`${etasjerKey}.bruksarealBolig`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right">
              {t(`${etasjerKey}.bruksarealAnnet`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right">
              {t(`${etasjerKey}.bruksarealTotalt`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right">
              {t(`${etasjerKey}.bruttoarealBolig`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right">
              {t(`${etasjerKey}.bruttoarealAnnet`)}
            </Table.HeaderCell>
            <Table.HeaderCell className="text-right">
              {t(`${etasjerKey}.bruttoarealTotalt`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {grupper.map((gruppe) => {
            const rader: (Etasjeplan | null)[] =
              gruppe.etasjer.length > 0 ? gruppe.etasjer : [null]
            return (
              <Fragment key={gruppe.key}>
                {rader.map((etasje, index) => {
                  const cellKlasse = gruppe.erGjeldende
                    ? "text-right tabular-nums font-semibold"
                    : "text-right tabular-nums"
                  return (
                    <Table.Row
                      key={
                        etasje
                          ? `${gruppe.key}-${etasje.etasjeplan}-${etasje.etasje}`
                          : `${gruppe.key}-empty`
                      }
                    >
                      {index === 0 && (
                        <Table.HeaderCell
                          scope="rowgroup"
                          rowSpan={rader.length}
                          className="align-top text-kv-default"
                        >
                          {gruppe.radeLabel}
                        </Table.HeaderCell>
                      )}
                      {etasje === null ? (
                        <Table.Cell colSpan={8} className="text-kv-subtle">
                          –
                        </Table.Cell>
                      ) : (
                        <>
                          <Table.Cell>{etasje.etasjeplan}</Table.Cell>
                          <Table.Cell className={cellKlasse}>
                            {etasje.antallBoenheter}
                          </Table.Cell>
                          <Table.Cell className={cellKlasse}>
                            {formatArea(etasje.bruksareal.bolig)}
                          </Table.Cell>
                          <Table.Cell className={cellKlasse}>
                            {formatArea(etasje.bruksareal.annet)}
                          </Table.Cell>
                          <Table.Cell className={cellKlasse}>
                            {formatArea(summerAreal(etasje.bruksareal))}
                          </Table.Cell>
                          <Table.Cell className={cellKlasse}>
                            {formatArea(etasje.bruttoareal.bolig)}
                          </Table.Cell>
                          <Table.Cell className={cellKlasse}>
                            {formatArea(etasje.bruttoareal.annet)}
                          </Table.Cell>
                          <Table.Cell className={cellKlasse}>
                            {formatArea(summerAreal(etasje.bruttoareal))}
                          </Table.Cell>
                        </>
                      )}
                    </Table.Row>
                  )
                })}
              </Fragment>
            )
          })}
        </Table.Body>
      </Table>
    </KategoriSeksjon>
  )
}
