import { Table } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type {
  Bygningsendring,
  Tiltakshaver,
} from "../../lib/schema/reports/bygg/bygg0011/index"
import { formatAdresse } from "../../lib/utils/formatAdresse"
import { formatDate } from "../../lib/utils/formatDate"
import { joinStrings } from "../../lib/utils/joinStrings"
import { KategoriSeksjon } from "./KategoriSeksjon"

interface Props {
  endringer: Bygningsendring[]
  bruksenhetsnr: string | null
}

interface Rad {
  endring: Bygningsendring
  tiltakshaver: Tiltakshaver
  antallForEndring: number
  erForsteForEndring: boolean
}

function byggRader(
  endringer: Bygningsendring[],
  bruksenhetsnr: string | null,
): Rad[] {
  const rader: Rad[] = []
  const sorterte = endringer.toSorted((a, b) => b.lopenr - a.lopenr)

  for (const endring of sorterte) {
    const relevante = endring.tiltakshavere.filter(
      (t) => t.bruksenhetsnr === bruksenhetsnr,
    )
    relevante.forEach((tiltakshaver, index) => {
      rader.push({
        endring,
        tiltakshaver,
        antallForEndring: relevante.length,
        erForsteForEndring: index === 0,
      })
    })
  }

  return rader
}

export function Tiltakshavere({ endringer, bruksenhetsnr }: Props) {
  const { i18n, t } = useTranslation()
  const tom = t("tom")
  const translationKey = "rapport.BYG0011.tiltakshavere"
  const bruksenhetKey = "rapport.BYG0011.bruksenheter"

  const rader = byggRader(endringer, bruksenhetsnr)

  return (
    <KategoriSeksjon
      title={t(`${translationKey}.title`)}
      emptyText={t(`${bruksenhetKey}.ingenTiltakshavere`)}
      isEmpty={rader.length === 0}
    >
      <Table className="w-full">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className="w-32">
              {t(`${bruksenhetKey}.endring`)}
            </Table.HeaderCell>
            <Table.HeaderCell>{t(`${translationKey}.rolle`)}</Table.HeaderCell>
            <Table.HeaderCell>{t(`${translationKey}.navn`)}</Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.eierIdent`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.adresselinjer`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.kategori`)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t(`${translationKey}.gyldigFra`)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rader.map(
            ({
              endring,
              tiltakshaver,
              antallForEndring,
              erForsteForEndring,
            }) => (
              <Table.Row
                key={`${endring.id}-${tiltakshaver.eierIdent}-${tiltakshaver.rolle}-${tiltakshaver.datofra ?? ""}`}
              >
                {erForsteForEndring && (
                  <Table.HeaderCell
                    scope="rowgroup"
                    rowSpan={antallForEndring}
                    className="align-top text-kv-default"
                  >
                    {t(`${bruksenhetKey}.endringKort`, {
                      lopenr: endring.lopenr,
                    })}
                  </Table.HeaderCell>
                )}
                <Table.Cell>{tiltakshaver.rolle}</Table.Cell>
                <Table.Cell>{tiltakshaver.navn}</Table.Cell>
                <Table.Cell className="tabular-nums">
                  {tiltakshaver.eierIdent}
                </Table.Cell>
                <Table.Cell>
                  {formatAdresse(
                    [
                      tiltakshaver.adresselinje1,
                      tiltakshaver.adresselinje2,
                      tiltakshaver.adresselinje3,
                    ],
                    tiltakshaver.postnummeromradenr,
                    tiltakshaver.postnummeromradenavn,
                    tom,
                  )}
                </Table.Cell>
                <Table.Cell>
                  {joinStrings(
                    [tiltakshaver.kategorikode, tiltakshaver.kontaktpersonKode],
                    " / ",
                    tom,
                  )}
                </Table.Cell>
                <Table.Cell className="tabular-nums">
                  {formatDate(i18n, tiltakshaver.datofra, tom, {
                    dateStyle: "short",
                  })}
                </Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table>
    </KategoriSeksjon>
  )
}
