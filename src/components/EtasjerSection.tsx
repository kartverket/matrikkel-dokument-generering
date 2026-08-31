import { useTranslation } from "react-i18next"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { Bygning } from "../lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import { formatAreal } from "../lib/utils/formatAreal.ts"
import { ArealGruppe } from "./ArealSection.tsx"
import { LabelValue } from "./utils/LabelValue.tsx"
import { SectionTitle } from "./utils/SectionTitle.tsx"

type Props = Pick<Bygning, "etasjer">

export function EtasjerSection({ etasjer }: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.etasjer" as const
  const arealKey = "rapport.BYG0011.areal" as const
  const enhet = t(`${arealKey}.enhet`)

  return (
    <section className="space-y-4">
      <SectionTitle>{t(`${tKey}.title`)}</SectionTitle>

      {etasjer
        .filter((etasje) => etasje != null)
        .map((etasje) => (
          <div
            key={`${etasje.etasjeplanKode?.kodeverdi}-${etasje.etasjenummer}`}
            className="flex gap-8"
          >
            <div className="flex gap-4">
              <LabelValue
                label={t(`${tKey}.etasjeplan`)}
                value={
                  etasje.etasjeplanKode?.kodeverdi != null
                    ? oversettKode({
                        t,
                        kodeverk: "etasjeplan",
                        kode: etasje.etasjeplanKode.kodeverdi,
                      })
                    : undefined
                }
              />
              <LabelValue
                label={t(`${tKey}.etasje`)}
                value={etasje.etasjenummer}
              />
              <LabelValue
                label={t(`${tKey}.antallBoenheter`)}
                value={etasje.etasjedata?.antallBoenheter}
              />
            </div>

            <ArealGruppe
              tittel={t(`${arealKey}.bruksareal`)}
              bolig={formatAreal(etasje.etasjedata?.bruksarealTilBolig, enhet)}
              annet={formatAreal(etasje.etasjedata?.bruksarealTilAnnet, enhet)}
              total={formatAreal(etasje.etasjedata?.bruksarealTotalt, enhet)}
              boligLabel={t(`${arealKey}.bolig`)}
              annetLabel={t(`${arealKey}.annet`)}
              totalLabel={t(`${arealKey}.total`)}
            />
            <ArealGruppe
              tittel={t(`${arealKey}.bruttoareal`)}
              bolig={formatAreal(etasje.etasjedata?.bruttoarealTilBolig, enhet)}
              annet={formatAreal(etasje.etasjedata?.bruttoarealTilAnnet, enhet)}
              total={formatAreal(etasje.etasjedata?.bruttoarealTotalt, enhet)}
              boligLabel={t(`${arealKey}.bolig`)}
              annetLabel={t(`${arealKey}.annet`)}
              totalLabel={t(`${arealKey}.total`)}
            />
          </div>
        ))}
    </section>
  )
}
