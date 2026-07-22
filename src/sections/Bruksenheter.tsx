import { Card } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import { BruksenhetHeader } from "../components/bruksenheter/BruksenhetHeader.tsx"
import { Section } from "../components/Section.tsx"
import type {
  Bruksenhet,
  BygningsEndring,
} from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"

type BruksenhetEndring = Bruksenhet & {
  lopeNr: number
}

interface Props {
  index: number
  byggEndringer: BygningsEndring[]
}

function getBruksenheterEndringer(byggEndringer: BygningsEndring[]) {
  return byggEndringer.flatMap((byggEndring) => {
    if (!byggEndring) return []

    return byggEndring.bruksenheter
      .filter(
        (bruksenhet): bruksenhet is NonNullable<typeof bruksenhet> =>
          bruksenhet !== undefined,
      )
      .map((bruksenhet) => ({
        ...bruksenhet,
        lopeNr: byggEndring.lopeNr,
      }))
  })
}

export default function Bruksenheter({ index, byggEndringer }: Props) {
  const { t } = useTranslation()
  const i18n = "rapport.BYG0011.bruksenheter"
  const tom = t("tom")
  const ingenOppgittBruksenhet = t(`${i18n}.ingenOppgittBruksenhet`)

  const bruksenheter: BruksenhetEndring[] =
    getBruksenheterEndringer(byggEndringer)

  return (
    <Section
      title={t(`${i18n}.title`)}
      index={index}
      description={t(`${i18n}.description`)}
    >
      <div className="flex flex-col gap-5">
        {bruksenheter.map((bruksenhet) => (
          <Card
            key={`${bruksenhet.bruksenhetsNr ?? "ukjent"}-${bruksenhet.lopeNr}`}
            data-bruksenhet={bruksenhet.bruksenhetsNr}
            className="break-inside-avoid border border-kv-border"
          >
            <Card.Block className="p-7">
              <BruksenhetHeader
                bruksenhetNummer={bruksenhet.bruksenhetsNr ?? null}
                bruksenhetTypeChip={bruksenhet.bruksenhetsTypeKode}
                bruksenhetSeksjon={t(`${i18n}.endringTittel`, {
                  lopenr: bruksenhet.lopeNr,
                })}
                ingenOppgittBruksenhet={ingenOppgittBruksenhet}
              />

              <dl className="grid grid-cols-4 gap-x-8 gap-y-5">
                <div className="col-span-2">
                  <dt className="text-kv-subtle text-sm">
                    {t(`${i18n}.adresse`)}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {bruksenhet.adresse ?? tom}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-kv-subtle text-sm">
                    {t(`${i18n}.matrikkelenhet`)}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {bruksenhet.matrikkelEnhetsNr ?? tom}
                  </dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${i18n}.bruksareal`)}
                  </dt>
                  <dd className="mt-1 font-medium tabular-nums">
                    {bruksenhet.bruksAreal
                      ? tom
                      : `${bruksenhet.bruksAreal} m²`}
                  </dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${i18n}.antallRom`)}
                  </dt>
                  <dd className="mt-1 font-medium tabular-nums">
                    {bruksenhet.antallRom ?? tom}
                  </dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${i18n}.kjokkentilgang`)}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {bruksenhet.kjokkenTilgangKode.trim() || tom}
                  </dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${i18n}.antallBad`)}
                  </dt>
                  <dd className="mt-1 font-medium tabular-nums">
                    {bruksenhet.antallBad ?? tom}
                  </dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${i18n}.antallWc`)}
                  </dt>
                  <dd className="mt-1 font-medium tabular-nums">
                    {bruksenhet.antallWC ?? tom}
                  </dd>
                </div>
              </dl>
            </Card.Block>
          </Card>
        ))}
      </div>
    </Section>
  )
}
